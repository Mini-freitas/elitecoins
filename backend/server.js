import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import qs from "qs";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


dotenv.config();
console.log("🔑 API_KEY:", process.env.API_KEY ? "OK" : "NÃO ENCONTRADA");


const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors({
  origin: ["https://elitecoinsfc.com.br"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// 🔑 credenciais da API externa
const apiUser = process.env.EMAIL;
const apiKey = process.env.API_KEY;
const apiKeyMd5 = crypto.createHash("md5").update(apiKey).digest("hex");

// 📌 Middleware para verificar token JWT
function verificarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.usuario = decoded;
    next();
  });
}

// ======================= AUTENTICAÇÃO =======================

// Criar usuário (apenas teste, depois você pode remover)
app.post("/api/registrar", async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, tipo },
    });

    res.json({ message: "Usuário criado com sucesso", usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login realizado com sucesso", token, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

// Rota protegida (apenas admin)
app.get("/api/admin", verificarToken, (req, res) => {
  if (req.usuario.tipo !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado" });
  }
  res.json({ message: "Bem-vindo à área admin!" });
});

// ======================= SUAS ROTAS EXISTENTES =======================

// Criar pedido
app.post("/api/order", async (req, res) => {
  try {
    const {
      customerName,
      user,
      pass,
      ba,
      ba2,
      ba3,
      ba4,
      ba5,
      platform,
      amount,
    } = req.body;

    const body = {
      customerName,
      user,
      pass,
      ba,
      ba2,
      ba3,
      ba4,
      ba5,
      platform,
      amount,
      apiUser: apiUser,
      apiKey: apiKeyMd5,
      lockOnboarding: "0",
      persona: "-1",
      updateCustomer: "1",
      stopOrderAfterOnboarding: 0,
    };

    const response = await axios.post("https://futtransfer.top/orderAPI", body, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data); // devolve { orderID: "..." }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Consultar status do pedido
app.post("/api/order/status", async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "orderID é obrigatório" });
    }

    const body = {
      orderID,
      apiUser,
      apiKey: apiKeyMd5,
    };

    const response = await axios.post(
      "https://futtransfer.top/orderStatusAPI",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});


// Registrar usuário
app.post("/api/registrar", async (req, res) => {
  try {
    let { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Normaliza email
    email = String(email).toLowerCase().trim();

    // Validação de senha forte
    const senhaForteRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!senhaForteRegex.test(senha)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial",
      });
    }

    // Verifica se já existe usuário
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria usuário
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, tipo },
    });

    res.json({ message: "Usuário cadastrado com sucesso", usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    let { email, senha } = req.body;

    // Normaliza email
    email = String(email).toLowerCase().trim();

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(400).json({ error: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(400).json({ error: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Login realizado com sucesso", token, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

// ======================= SALVAR IMAGEM =======================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garante que a pasta existe
const uploadDir = path.join(__dirname, "images/propaganda");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Rota de upload
app.post("/api/upload-banner", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const { url } = req.body; // pega a URL do form
    const filePath = `https://elitecoinsfc.com.br/images/propaganda/${req.file.filename}`;

    const novoBanner = await prisma.banner.create({
      data: {
        caminho: filePath,
        url: url && url.trim() !== "" ? url : null, // salva se tiver valor
      },
    });

    res.json({ success: true, banner: novoBanner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar banner" });
  }
});

// Servir imagens estáticas
app.use(
  "/images/propaganda",
  express.static(path.join(__dirname, "images/propaganda"))
);

// ======================= MOSTRAR IMAGEM =======================

// Rota para listar todos os banners
app.get("/api/banners", async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { id: "desc" }, // mais recentes primeiro
    });
    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar banners" });
  }
});

// ======================= APAGAR IMAGEM BANNER =======================

app.delete("/api/banners/:id", async (req, res) => {
  const { id } = req.params; // já é string, compatível com ObjectId

  try {
    const banner = await prisma.banner.findUnique({ where: { id } });

    if (!banner) return res.status(404).json({ error: "Banner não encontrado" });

    // Remove arquivo físico (assumindo que o caminho seja relativo a /public)
    const filePath = path.join(__dirname, "..", "public", banner.caminho);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove do banco
    await prisma.banner.delete({ where: { id } });

    res.json({ message: "Banner excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir banner" });
  }
});
// ======================= ATUALIZA PREÇO MOEDAS =======================

// Buscar preços
app.get("/moedas", async (req, res) => {
  try {
    const preco = await prisma.moedaPreco.findFirst();
    res.json(preco);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar preços" });
  }
});

// Atualizar preços
app.put("/moedas", async (req, res) => {
  try {
    const { play, xbox, pc } = req.body;

    let preco = await prisma.moedaPreco.findFirst();

    if (!preco) {
      preco = await prisma.moedaPreco.create({
        data: { play, xbox, pc },
      });
    } else {
      preco = await prisma.moedaPreco.update({
        where: { id: preco.id },
        data: { play, xbox, pc },
      });
    }

    res.json(preco);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar preços" });
  }
});

// ======================= API MERCADO PAGO =======================
// SDK do Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializa o client do Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

// Rota de pagamento
app.post("/pagamento", async (req, res) => {
  const { usuario, carta, valorTotal, quantMoedas } = req.body;
  
  // validações
  if (!usuario || !valorTotal || !quantMoedas) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    const preference = {
      items: [{ title: carta, quantity: 1, unit_price: valorTotal }],
      payer: { email: `${usuario}@teste.com` }, // ou email real
      payment_methods: { default_payment_method_id: "pix" },
      back_urls: {
        success: "https://www.seusite.com.br/success",
        failure: "https://www.seusite.com.br/failure",
        pending: "https://www.seusite.com.br/pending",
      },
      auto_return: "approved",
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();
    return res.json({ init_point: data.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});


// ======================= CUPONS =======================
app.post("/api/cupons", async (req, res) => {
  try {
    const { parceiro, codigo, desconto } = req.body;

    if (!parceiro || !codigo || !desconto) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const novoCupom = await prisma.cupom.create({
      data: {
        parceiro,
        codigo,
        desconto: parseFloat(desconto), // garante número
      },
    });

    res.json({ success: true, cupom: novoCupom });
  } catch (error) {
    console.error("Erro ao cadastrar cupom:", error);
    res.status(500).json({ error: "Erro interno ao salvar cupom" });
  }
});

// Rota para listar cupons
app.get("/api/cupons", async (req, res) => {
  try {
    const cupons = await prisma.cupom.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(cupons);
  } catch (error) {
    console.error("Erro ao buscar cupons:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

// ======================= EXCLUIR CUPOM =======================
app.delete("/api/cupons/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cupom = await prisma.cupom.delete({
      where: { id: id }, // Prisma já aceita string como ObjectId
    });

    res.json({ success: true, message: "Cupom excluído com sucesso", cupom });
  } catch (err) {
    console.error("Erro ao excluir cupom:", err);
    res.status(500).json({ success: false, error: "Erro ao excluir cupom" });
  }
});


// ======================= INICIAR SERVIDOR =======================
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
