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
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import crypto from "crypto";
import { ObjectId } from "mongodb";



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

function calcularVouchers(usuario) {
  const perfilCompleto =
    usuario.nome &&
    usuario.telefone &&
    usuario.dataNascimento;

  const temCredenciais =
    (usuario.credenciais?.length || 0) > 0;

  let vouchers = 1;

  if (perfilCompleto) vouchers += 1;
  if (temCredenciais) vouchers += 1;

  return vouchers;
}

// ======================= CRYPTO CONFIG =======================
const ALGORITHM = "aes-256-cbc";

const SECRET_KEY = crypto
  .createHash("sha256")
  .update(String(process.env.CRYPTO_SECRET))
  .digest();

// 🔐 CRIPTOGRAFAR (COM IV DINÂMICO)
function encrypt(text) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

// 🔓 DESCRIPTOGRAFAR
function decrypt(text) {
  const [ivHex, encrypted] = text.split(":");

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

function maskUser(login) {
  if (!login) return "";

  // Email
  if (login.includes("@")) {
    const [nome, dominio] = login.split("@");

    const nomeMask =
      nome.length <= 3
        ? nome[0] + "*".repeat(nome.length - 1)
        : nome.slice(0, 3) + "*".repeat(nome.length - 3);

    return `${nomeMask}@${dominio}`;
  }

  // Username normal
  if (login.length <= 4) {
    return login[0] + "*".repeat(login.length - 1);
  }

  return login.slice(0, 4) + "*".repeat(login.length - 4);
}

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

    // 🔹 Verificação aprimorada de email já cadastrado
    const usuarioExistente = await prisma.usuario.findFirst({
      where: { email }, // encontra qualquer email igual
    });
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


// ================= LOGIN GOOGLE =================
app.post("/api/login-google", async (req, res) => {
  try {
    const { nome, email, avatar, googleId } = req.body;

    // Valida campos obrigatórios
    if (!nome || !email || !googleId) {
      return res.status(400).json({ error: "Dados insuficientes para login Google." });
    }

    const emailNormalizado = email.toLowerCase().trim();

    // Verifica se usuário já existe
    let usuario = await prisma.usuario.findUnique({
      where: { email: emailNormalizado },
    });

    if (!usuario) {
      // Cria novo usuário Google
      usuario = await prisma.usuario.create({
        data: {
          nome,
          email: emailNormalizado,
          avatar: avatar || null,
          provider: "GOOGLE",
          providerId: googleId,
          tipo: "COMUM",
          emailVerificado: true, // login Google garante email verificado
        },
      });
    } else {
      // Atualiza providerId e avatar se necessário
      usuario = await prisma.usuario.update({
        where: { email: emailNormalizado },
        data: {
          provider: "GOOGLE",
          providerId: googleId,
          avatar: avatar || usuario.avatar,
        },
      });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ message: "Login Google realizado com sucesso", usuario, token });
  } catch (err) {
    console.error("Erro login Google:", err);
    return res.status(500).json({ error: "Erro ao processar login Google." });
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

// =======================
// CRIAR NOTIFICAÇÃO
// =======================
app.post("/api/notificacoes", async (req, res) => {
  try {
    const { usuarioId, mensagem } = req.body;

    if (!usuarioId || !mensagem) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // 🔥 VALIDA OBJECTID
    if (!ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ error: "usuarioId inválido" });
    }

    // 🔥 VERIFICA SE USUÁRIO EXISTE
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const novaNotificacao = await prisma.notificacao.create({
      data: {
        usuarioId,
        mensagem,
        vista: false,
      },
    });

    res.json(novaNotificacao);
  } catch (err) {
    console.error("❌ Erro ao criar notificação:", err);
    res.status(500).json({ error: "Erro ao criar notificação" });
  }
});


// ===============================
// LISTAR NOTIFICAÇÕES
// ===============================
app.get("/api/notificacoes/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const apenasNaoVistas = req.query.apenasNaoVistas === "true";

    // 🔥 VALIDA OBJECTID
    if (!ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ error: "usuarioId inválido" });
    }

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


// ===============================
// MARCAR UMA COMO VISTA
// ===============================
app.put("/api/notificacoes/:id/vista", async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 VALIDA OBJECTID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const notif = await prisma.notificacao.update({
      where: { id },
      data: { vista: true },
    });

    res.json(notif);
  } catch (err) {
    console.error("❌ Erro ao marcar notificação:", err);
    res.status(500).json({ error: "Erro ao marcar notificação como vista" });
  }
});


// ===============================
// MARCAR TODAS COMO VISTAS
// ===============================
app.put("/api/notificacoes/usuario/:usuarioId/vistas", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // 🔥 VALIDA OBJECTID
    if (!ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ error: "usuarioId inválido" });
    }

    const resultado = await prisma.notificacao.updateMany({
      where: {
        usuarioId,
        vista: false,
      },
      data: {
        vista: true,
      },
    });

    res.json({
      sucesso: true,
      alteradas: resultado.count,
      mensagem: "Todas as notificações foram marcadas como vistas.",
    });
  } catch (err) {
    console.error("❌ Erro ao marcar notificações:", err);
    res.status(500).json({ error: "Erro ao marcar notificações como vistas" });
  }
});

/// ======================= CREDENCIAIS =======================

// ===============================
// LISTAR CREDENCIAIS DO USUÁRIO
// ===============================
app.get("/api/credenciais/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const credenciais = await prisma.credencial.findMany({
      where: { usuarioId },
      orderBy: { createdAt: "desc" },
    });

    const formatadas = credenciais.map((c) => {
      let userDescriptografado = "";

      try {
        userDescriptografado = decrypt(c.user);
      } catch (err) {
        console.log("❌ erro decrypt:", err);
        userDescriptografado = "erro";
      }

      return {
        id: c.id,
        user: userDescriptografado,
        userMasked: maskUser(userDescriptografado),
        createdAt: c.createdAt,
      };
    });

    return res.json(formatadas);
  } catch (err) {
    console.error("Erro ao buscar credenciais:", err);
    return res.status(500).json({ error: "Erro ao buscar credenciais" });
  }
});

// ===============================
// CRIAR CREDENCIAL
// ===============================
app.post("/api/credenciais", async (req, res) => {
  try {
    const { usuarioId, user, pass } = req.body;

    if (!usuarioId || !user || !pass) {
      return res.status(400).json({
        error: "Informe user e pass",
      });
    }

    const novaCredencial = await prisma.credencial.create({
      data: {
        usuarioId,
        user: encrypt(user),
        pass: encrypt(pass),
      },
    });

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: { credenciais: true },
    });

    let etapa = 1;

    const perfilCompleto =
      usuario.nome &&
      usuario.telefone &&
      usuario.dataNascimento;

    if (perfilCompleto) etapa = 2;
    if (usuario.credenciais.length > 0) etapa = 3;

    const atualizado = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { perfilEtapa: etapa },
    });

    res.json({
      credencial: {
        id: novaCredencial.id,
        user,
        userMasked: maskUser(user),
      },
      usuario: atualizado,
    });

  } catch (err) {
    console.error("Erro ao criar credencial:", err);
    res.status(500).json({ error: "Erro ao criar credencial" });
  }
});

// ===============================
// ATUALIZAR CREDENCIAL
// ===============================
app.put("/api/credenciais/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, pass } = req.body;

    const existente = await prisma.credencial.findUnique({
      where: { id },
    });

    if (!existente) {
      return res.status(404).json({
        error: "Credencial não encontrada",
      });
    }

    const atualizado = await prisma.credencial.update({
      where: { id },
      data: {
        user: user ? encrypt(user) : existente.user,
        pass: pass ? encrypt(pass) : existente.pass,
      },
    });

    const userFinal = user || decrypt(existente.user);

    res.json({
      success: true,
      credencial: {
        id: atualizado.id,
        user: userFinal,
        userMasked: maskUser(userFinal),
      },
    });

  } catch (err) {
    console.error("Erro ao atualizar credencial:", err);
    res.status(500).json({ error: "Erro ao atualizar credencial" });
  }
});

// ===============================
// EXCLUIR CREDENCIAL (JÁ CORRETO)
// ===============================
app.delete("/api/credenciais/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const credencial = await prisma.credencial.findUnique({
      where: { id },
    });

    if (!credencial) {
      return res.status(404).json({
        error: "Credencial não encontrada",
      });
    }

    await prisma.credencial.delete({
      where: { id },
    });

    const usuario = await prisma.usuario.findUnique({
      where: { id: credencial.usuarioId },
      include: { credenciais: true },
    });

    let etapa = 1;

    const perfilCompleto =
      usuario.nome &&
      usuario.telefone &&
      usuario.dataNascimento;

    if (perfilCompleto) etapa = 2;
    if (usuario.credenciais.length > 0) etapa = 3;

    const atualizado = await prisma.usuario.update({
      where: { id: credencial.usuarioId },
      data: { perfilEtapa: etapa },
    });

    res.json({
      success: true,
      usuario: atualizado,
    });

  } catch (err) {
    console.error("Erro ao excluir:", err);
    res.status(500).json({ error: "Erro ao excluir" });
  }
});
// ======================= PERFIL DO USUÁRIO =======================

/**
 * PUT /api/usuarios/:id
 * Atualiza dados do perfil
 * Avança etapa automaticamente
 * Libera voucher ao completar perfil
 */
app.put("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, telefone } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { credenciais: true },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const perfilCompleto =
      Boolean(nome) &&
      Boolean(dataNascimento) &&
      Boolean(telefone);

    let novaEtapa = 1;

    if (perfilCompleto) novaEtapa = 2;
    if (usuario.credenciais.length > 0) novaEtapa = 3;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        telefone,
        dataNascimento: dataNascimento
          ? new Date(dataNascimento)
          : usuario.dataNascimento,
        perfilEtapa: novaEtapa,
      },
    });

    return res.json(usuarioAtualizado);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao atualizar perfil" });
  }
});

// =========================
// ROTA: LISTAR COMPRAS
// =========================
app.get("/api/compras/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const compras = await prisma.compra.findMany({
      where: { usuarioId },
      orderBy: { createdAt: "desc" },
    });

    return res.json(compras);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar compras" });
  }
});

// =========================
// CONFIG MERCADO PAGO
// =========================
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// =========================
// STATUS PADRONIZADO (ÚNICO)
// =========================
const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

// =========================
// CRIAR PAGAMENTO
// =========================
app.post("/api/pagamento", async (req, res) => {
  try {
    let { usuarioId, plataforma, quantia, quantMoedas } = req.body;

    console.log("📥 DADOS RECEBIDOS:");
    console.log("usuarioId:", usuarioId);
    console.log("plataforma:", plataforma);
    console.log("quantia:", quantia);
    console.log("quantMoedas:", quantMoedas);

    // =========================
    // VALIDAÇÃO BÁSICA
    // =========================
    if (!usuarioId || !plataforma || !quantia) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    // =========================
    // PADRONIZAÇÃO DA PLATAFORMA
    // =========================
    const plataformasValidas = ["play", "xbox", "pc"];

    plataforma = String(plataforma).toLowerCase().trim();

    if (!plataformasValidas.includes(plataforma)) {
      console.error("❌ Plataforma inválida recebida:", plataforma);
      return res.status(400).json({ erro: "Plataforma inválida" });
    }


    const mapaPlataforma = {
      play: "PS",
      xbox: "XB",
      pc: "PC",
    };
    
    const plataformaFinal = mapaPlataforma[plataforma];

    // =========================
    // CORREÇÃO DO VALOR (CRÍTICO)
    // =========================
    const valorCorrigido = Number(parseFloat(quantia).toFixed(2));

    // =========================
    // BUSCAR USUÁRIO
    // =========================
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // =========================
    // CRIAR COMPRA
    // =========================
    const compra = await prisma.compra.create({
      data: {
        usuarioId,
        plataforma: plataformaFinal, // 🔥 AGORA PADRONIZADO
        quantia: valorCorrigido,
        moeda: quantMoedas?.toString() || "FIFA",
        statusPagamento: STATUS.PENDING,
        statusApiFifa: "aguardando",
      },
    });

    // =========================
    // CRIAR PREFERÊNCIA MP
    // =========================
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: compra.id,
            title: `Moedas FIFA - ${plataformaFinal}`,
            description: `Compra de ${quantMoedas} moedas FIFA`,
            category_id: "digital_goods",
            quantity: 1,
            currency_id: "BRL",
            unit_price: valorCorrigido,
          },
        ],

        payer: {
          email: usuario.email,
        },

        external_reference: compra.id,

        metadata: {
          compraId: compra.id,
          usuarioId: usuario.id,
        },

        notification_url: `${process.env.HOST_URL}/api/webhook-mercadopago`,

     back_urls: {
      success: `${process.env.HOST_URL}/?status=approved`,
      failure: `${process.env.HOST_URL}/?status=failed`,
      pending: `${process.env.HOST_URL}/?status=pending`,
    },

        auto_return: "approved",
      },
    });

    // =========================
    // SALVAR ID DO MP
    // =========================
    await prisma.compra.update({
      where: { id: compra.id },
      data: { mpPreferenceId: response.id },
    });

    return res.json({ init_point: response.init_point });

  } catch (err) {
    console.error("❌ ERRO AO CRIAR PAGAMENTO:", err);
    return res.status(500).json({ erro: "Erro ao criar pagamento" });
  }
});

// =========================
// WEBHOOK MERCADO PAGO (COM VALIDAÇÃO REAL)
// =========================
app.post("/api/webhook-mercadopago", async (req, res) => {
  try {
    console.log("\n==============================");
    console.log("📩 WEBHOOK RECEBIDO");

    // =========================
    // VALIDAR ASSINATURA (SEGURANÇA)
    // =========================
    const xSignature = req.headers["x-signature"];
    const xRequestId = req.headers["x-request-id"];

    if (!xSignature) {
      console.log("❌ Sem assinatura - ignorado");
      return res.sendStatus(200);
    }

    // Extrair ts e v1
    const parts = xSignature.split(",");
    let ts = null;
    let hash = null;

    for (let part of parts) {
      const [key, value] = part.split("=");
      if (key === "ts") ts = value;
      if (key === "v1") hash = value;
    }

    const dataId = req.body?.data?.id || "";

    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    const crypto = await import("crypto");

    const assinaturaGerada = crypto
      .createHmac("sha256", process.env.MP_WEBHOOK_TOKEN)
      .update(manifest)
      .digest("hex");

    if (assinaturaGerada !== hash) {
      console.log("❌ ASSINATURA INVÁLIDA");
      return res.sendStatus(200);
    }

    console.log("✅ ASSINATURA VÁLIDA");

    // =========================
    // PEGAR PAYMENT ID
    // =========================
    let paymentId = null;

    if (req.body?.data?.id) {
      paymentId = req.body.data.id;
    }

    if (!paymentId && req.body?.resource) {
      const match = req.body.resource.match(/(\\d+)$/);
      if (match) paymentId = match[1];
    }

    if (!paymentId) {
      console.log("⚠️ Sem paymentId");
      return res.sendStatus(200);
    }

    console.log("💳 PAYMENT ID:", paymentId);

    // =========================
    // BUSCAR PAGAMENTO
    // =========================
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const payment = await paymentRes.json();

    console.log("💰 STATUS:", payment.status);

    const compraId = payment.external_reference;

    if (!compraId) {
      console.log("❌ Compra não encontrada");
      return res.sendStatus(200);
    }

    // =========================
    // ATUALIZAR BANCO
    // =========================
    await prisma.compra.update({
      where: { id: compraId },
      data: {
        statusPagamento: payment.status,
        mpPaymentId: String(payment.id),
        pagoEm: payment.status === "approved" ? new Date() : null,
        statusApiFifa:
          payment.status === "approved"
            ? "processando"
            : "aguardando",
      },
    });

    console.log("📦 Compra atualizada:", compraId);

    // =========================
    // FINALIZAR COMPRA
    // =========================
    if (payment.status === "approved") {
      console.log("🎯 PAGAMENTO APROVADO");
      await concluirCompra(compraId);
    }

    return res.sendStatus(200);

  } catch (err) {
    console.error("❌ ERRO WEBHOOK:", err);
    return res.sendStatus(200);
  }
});

// =========================
// FINALIZAR COMPRA
// =========================
async function concluirCompra(compraId) {
  const compra = await prisma.compra.findUnique({
    where: { id: compraId },
  });

  if (!compra) return;

  if (compra.statusPagamento !== "approved") return;

  if (compra.fifaOrderId) return;

  const credencial = await prisma.credencial.findFirst({
    where: { usuarioId: compra.usuarioId },
  });

  if (!credencial) {
    await prisma.compra.update({
      where: { id: compra.id },
      data: { statusApiFifa: "erro" },
    });
    return;
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: compra.usuarioId },
  });

  try {
    // 🔥 CORREÇÃO AQUI (ERA O ERRO)
    const user = decrypt(credencial.user);
    const pass = decrypt(credencial.pass);

    const response = await fetch("https://futtransfer.top/orderAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: usuario.nome,

        user,
        pass,

        ba: "1",
        ba2: "1",
        ba3: "1",
        ba4: "1",
        ba5: "1",

        platform: compra.plataforma,
        amount: Number(compra.moeda),

        apiUser: process.env.FIFA_API_USER,
        apiKey: process.env.FIFA_API_KEY_MD5,

        updateCustomer: "1",
      }),
    });

    const data = await response.json();

    if (!data.orderID) {
      throw new Error("Sem orderID");
    }

    await prisma.compra.update({
      where: { id: compra.id },
      data: {
        fifaOrderId: data.orderID,
        statusApiFifa: "processando",
      },
    });

  } catch (err) {
    console.error("❌ ERRO NA FIFA:", err);

    await prisma.compra.update({
      where: { id: compra.id },
      data: { statusApiFifa: "erro" },
    });
  }
}

// =========================
// CANCELAR COMPRA
// =========================
app.post("/api/compras/:id/cancelar", async (req, res) => {
  try {
    const { id } = req.params;

    const compra = await prisma.compra.findUnique({ where: { id } });

    if (!compra) return res.status(404).json({ erro: "Compra não encontrada" });

    if (compra.statusPagamento !== STATUS.PENDING) {
      return res.status(400).json({ erro: "Compra não pode ser cancelada" });
    }

    await prisma.compra.update({
      where: { id },
      data: {
        statusPagamento: STATUS.CANCELLED,
        expiradoEm: new Date(),
      },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao cancelar compra" });
  }
});

// =========================
// ROTA: VALIDAR SESSÃO
// =========================
app.get("/api/me", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        credenciais: true, // 🔥 IMPORTANTE
      },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Sessão inválida" });
    }

    const vouchersDisponiveis = calcularVouchers(usuario);

    return res.json({
      ...usuario,
      vouchersDisponiveis,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro" });
  }
});
// =========================
// RETOMAR PAGAMENTO
// =========================
app.get("/api/pagamento/:compraId", async (req, res) => {
  console.log("🔥 ROTA RETOMAR PAGAMENTO CHAMADA");

  try {
    const { compraId } = req.params;

    console.log("ID RECEBIDO:", compraId);

    const compra = await prisma.compra.findUnique({
      where: { id: compraId },
    });

    console.log("COMPRA:", compra);

    if (!compra) {
      return res.status(404).json({ erro: "Compra não encontrada" });
    }

    if (!compra.mpPreferenceId) {
      return res.status(400).json({ erro: "Pagamento não iniciado" });
    }

    const init_point = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${compra.mpPreferenceId}`;

    return res.json({ init_point });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao buscar pagamento" });
  }
});


// ======================= INICIAR SERVIDOR =======================

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
