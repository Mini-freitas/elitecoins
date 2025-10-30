import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();
const HOST_URL = process.env.HOST_URL || "https://elitecoinsfc.com.br";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// ======================= EMAIL CONFIG =======================
async function enviarEmailConfirmacao(email, token) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // ✅ Define o domínio base a partir do .env
  const baseUrl = process.env.BASE_URL || "https://www.elitecoinsfc.com.br";
  const link = `${baseUrl}/api/confirmar-email/${token}`;

  await transporter.sendMail({
    from: `"Elite Coins" <${process.env.EMAIL_USER}>`,
    replyTo: process.env.EMAIL_USER,
    to: email,
    subject: "Confirme seu e-mail - Elite Coins",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px;">
      <h2 style="color:#00b050;">Confirme seu e-mail</h2>
      <p>Olá! Clique no botão abaixo para confirmar seu endereço de e-mail e ativar sua conta.</p>
      <a href="${link}" style="
        display:inline-block;
        padding:12px 25px;
        background-color:#00b050;
        color:white;
        border-radius:8px;
        text-decoration:none;
        font-weight:bold;
      ">Confirmar E-mail</a>
      <p style="margin-top:20px;font-size:14px;color:#555;">
        Se você não criou uma conta, ignore esta mensagem.
      </p>
    </div>
    `,
  });
}

// ======================= MIDDLEWARE DE AUTENTICAÇÃO =======================
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// ======================= ROTAS =======================

// Rota protegida (apenas admin)
app.get("/api/admin", verificarToken, (req, res) => {
  if (req.usuario.tipo !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado" });
  }
  res.json({ message: "Bem-vindo à área admin!" });
});

// Registrar usuário com verificação de e-mail
app.post("/api/registrar", async (req, res) => {
  try {
    let { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    email = String(email).toLowerCase().trim();
    senha = senha.trim();

    const senhaForteRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!senhaForteRegex.test(senha)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial",
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const tokenVerificacao = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        tipo,
        emailVerificado: false,
        tokenVerificacao,
      },
    });

    await enviarEmailConfirmacao(email, tokenVerificacao);

    await prisma.notificacao.create({
      data: {
        usuarioId: novoUsuario.id,
        mensagem:
          "Bem-vindo(a) à Elite Coins! 🎉 Verifique seu e-mail para confirmar sua conta.",
        vista: false,
      },
    });

    // Remove usuário não confirmado após 30 minutos
    setTimeout(async () => {
      const user = await prisma.usuario.findUnique({ where: { email } });
      if (user && !user.emailVerificado) {
        await prisma.usuario.delete({ where: { email } });
        console.log(`Usuário ${email} removido por falta de verificação`);
      }
    }, 30 * 60 * 1000);

    res.json({
      message:
        "Usuário cadastrado com sucesso. Verifique seu e-mail para confirmar a conta.",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// Confirmação de e-mail (via link)
app.get("/api/confirmar-email/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(400).send("Usuário não encontrado ou já removido.");
    }

    await prisma.usuario.update({
      where: { email },
      data: { emailVerificado: true, tokenVerificacao: null },
    });

    await prisma.notificacao.create({
      data: {
        usuarioId: usuario.id,
        mensagem: "✅ Seu e-mail foi confirmado com sucesso! Bem-vindo(a) à Elite Coins.",
        vista: false,
      },
    });

    return res.redirect("https://www.elitecoinsfc.com.br?emailConfirmado=true");
  } catch (error) {
    console.error("Erro na confirmação de email:", error);
    return res.status(400).send("Link inválido ou expirado.");
  }
});

// Confirmação direta via API
app.put("/api/confirmar-email-direto/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (usuario.emailVerificado) {
      return res.json({ sucesso: true, mensagem: "E-mail já confirmado anteriormente." });
    }

    await prisma.usuario.update({
      where: { id },
      data: { emailVerificado: true, tokenVerificacao: null },
    });

    await prisma.notificacao.create({
      data: {
        usuarioId: usuario.id,
        mensagem: "✅ Seu e-mail foi confirmado com sucesso diretamente pelo sistema!",
        vista: false,
      },
    });

    res.json({
      sucesso: true,
      mensagem: "E-mail confirmado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao confirmar e-mail direto:", error);
    res.status(500).json({ error: "Erro ao confirmar e-mail direto." });
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

// ======================= BANNERS E IMAGENS =======================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Config multer
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
    const filePath = `${HOST_URL}/images/${req.file.filename}`;

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

// Listar banners
app.get("/api/banners", async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { criadoEm: "desc" },
      select: { id: true, caminho: true, url: true, criadoEm: true },
    });

    res.json(
      banners.map((b) => ({
        id: b.id,
        caminho: b.caminho,
        url: b.url || null,
        criadoEm: b.criadoEm,
      }))
    );
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

// ======================= PREÇOS DAS MOEDAS =======================

app.get("/api/moedas", async (req, res) => {
  try {
    const preco = await prisma.moedaPreco.findFirst();
    res.json(preco);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar preços" });
  }
});

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

app.post("/api/cupons", async (req, res) => {
  try {
    const { parceiro, codigo, desconto } = req.body;
    if (!parceiro || !codigo || !desconto)
      return res.status(400).json({ error: "Preencha todos os campos!" });

    const novoCupom = await prisma.cupom.create({
      data: { parceiro, codigo, desconto: parseFloat(desconto) },
    });

    res.json({ success: true, cupom: novoCupom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao salvar cupom" });
  }
});

app.get("/api/cupons", async (req, res) => {
  try {
    const cupons = await prisma.cupom.findMany({ orderBy: { createdAt: "desc" } });
    res.json(cupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno" });
  }
});

app.delete("/api/cupons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cupom = await prisma.cupom.delete({ where: { id } });
    res.json({ success: true, message: "Cupom excluído com sucesso", cupom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir cupom" });
  }
});


// ======================= NOTIFICAÇÕES =======================

// Criar notificação
app.post("/api/notificacoes", async (req, res) => {
  try {
    const { usuarioId, mensagem } = req.body;

    if (!usuarioId || !mensagem) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const novaNotificacao = await prisma.notificacao.create({
      data: { usuarioId, mensagem, vista: false },
    });

    res.json(novaNotificacao);
  } catch (err) {
    console.error("❌ Erro ao criar notificação:", err);
    res.status(500).json({ error: "Erro ao criar notificação" });
  }
});

// Listar notificações não vistas (ou todas se desejar)
app.get("/api/notificacoes/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const apenasNaoVistas = req.query.apenasNaoVistas === "true";

    const notificacoes = await prisma.notificacao.findMany({
      where: {
        usuarioId,
        ...(apenasNaoVistas ? { vista: false } : {}),
      },
      orderBy: { criadoEm: "desc" },
    });

    res.json(notificacoes);
  } catch (err) {
    console.error("❌ Erro ao buscar notificações:", err);
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
});

// Marcar notificação individual como vista
app.put("/api/notificacoes/:id/vista", async (req, res) => {
  try {
    const { id } = req.params;

    const notif = await prisma.notificacao.update({
      where: { id },
      data: { vista: true },
    });

    res.json(notif);
  } catch (err) {
    console.error("❌ Erro ao marcar notificação como vista:", err);
    res.status(500).json({ error: "Erro ao marcar notificação como vista" });
  }
});

// ✅ Marcar TODAS as notificações do usuário como vistas
app.put("/api/notificacoes/usuario/:usuarioId/vistas", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const resultado = await prisma.notificacao.updateMany({
      where: { usuarioId, vista: false },
      data: { vista: true },
    });

    res.json({
      sucesso: true,
      alteradas: resultado.count,
      mensagem: "Todas as notificações foram marcadas como vistas.",
    });
  } catch (err) {
    console.error("❌ Erro ao marcar todas as notificações como vistas:", err);
    res.status(500).json({ error: "Erro ao marcar notificações como vistas" });
  }
});


// ======================= INICIAR SERVIDOR =======================

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
