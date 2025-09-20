import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(
  cors({
    origin: ["https://elitecoinsfc.com.br"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());


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

// Rota protegida (apenas admin)
app.get("/api/admin", verificarToken, (req, res) => {
  if (req.usuario.tipo !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado" });
  }
  res.json({ message: "Bem-vindo à área admin!" });
});

// Registrar usuário
app.post("/api/registrar", async (req, res) => {
  try {
    let { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    email = String(email).toLowerCase().trim();

    const senhaForteRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!senhaForteRegex.test(senha)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial",
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

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

// Garante que a pasta exista
const uploadDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload banner
app.post("/api/upload-banner", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

    const { url } = req.body;
    const filePath = `https://elitecoinsfc.com.br/images/${req.file.filename}`;

    const novoBanner = await prisma.banner.create({
      data: { caminho: filePath, url: url && url.trim() !== "" ? url : null },
    });

    res.json({ success: true, banner: novoBanner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar banner" });
  }
});

// Servir imagens estáticas
app.use("/images", express.static(uploadDir));

// Excluir banner
app.delete("/api/banners/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await prisma.banner.findUnique({ where: { id } });
    if (!banner) return res.status(404).json({ error: "Banner não encontrado" });

    const filePath = path.join(__dirname, "images", path.basename(banner.caminho));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.banner.delete({ where: { id } });
    res.json({ message: "Banner excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir banner" });
  }
});


// ======================= PREÇOS DAS MOEDAS =======================

// Buscar preços
app.get("/api/moedas", async (req, res) => {
  try {
    const preco = await prisma.moedaPreco.findFirst();
    res.json(preco);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar preços" });
  }
});

// Atualizar preços
app.put("/api/moedas", async (req, res) => {
  try {
    const { play, xbox, pc } = req.body;
    let preco = await prisma.moedaPreco.findFirst();

    if (!preco) {
      preco = await prisma.moedaPreco.create({ data: { play, xbox, pc } });
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

// ======================= CUPONS =======================

// Criar cupom
app.post("/api/cupons", async (req, res) => {
  try {
    const { parceiro, codigo, desconto } = req.body;
    if (!parceiro || !codigo || !desconto) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const novoCupom = await prisma.cupom.create({
      data: { parceiro, codigo, desconto: parseFloat(desconto) },
    });

    res.json({ success: true, cupom: novoCupom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao salvar cupom" });
  }
});

// Listar cupons
app.get("/api/cupons", async (req, res) => {
  try {
    const cupons = await prisma.cupom.findMany({ orderBy: { createdAt: "desc" } });
    res.json(cupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno" });
  }
});

// Excluir cupom
app.delete("/api/cupons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cupom = await prisma.cupom.delete({ where: { id: id } });
    res.json({ success: true, message: "Cupom excluído com sucesso", cupom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Erro ao excluir cupom" });
  }
});

// ======================= INICIAR SERVIDOR =======================
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
