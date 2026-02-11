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
import cron from "node-cron";


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
      take: 3,
    });

    return res.json(credenciais);
  } catch (err) {
    console.error("❌ Erro ao buscar credenciais:", err);
    return res.status(500).json({ error: "Erro ao buscar credenciais" });
  }
});

// ===============================
// CRIAR CREDENCIAL (CORRIGIDO)
// ===============================
app.post("/api/credenciais", async (req, res) => {
  try {
    const {
      usuarioId,
      orderID,
      user,
      pass,
      platform,
      ba,
      limit,
      sortMode,
      persona,
    } = req.body;

    if (!usuarioId || !orderID || !user || !pass || !platform || !ba) {
      return res.status(400).json({
        error: "Preencha todos os campos obrigatórios",
      });
    }

    const totalAntes = await prisma.credencial.count({
      where: { usuarioId },
    });

    if (totalAntes >= 3) {
      return res.status(400).json({
        error: "Você já atingiu o limite de 3 credenciais",
      });
    }

    const novaCredencial = await prisma.credencial.create({
      data: {
        usuarioId,
        orderID,
        user,
        pass,
        platform,
        ba,
        limit: limit || null,
        sortMode: sortMode || null,
        persona: persona || null,
      },
    });

    // 🔥 RECONTA APÓS CRIAR
    const totalDepois = await prisma.credencial.count({
      where: { usuarioId },
    });

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    const perfilCompleto =
      Boolean(usuario.nome) &&
      Boolean(usuario.dataNascimento) &&
      Boolean(usuario.telefone);

    let novaEtapa = 1;
    if (perfilCompleto) novaEtapa = 2;
    if (totalDepois > 0) novaEtapa = 3;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { perfilEtapa: novaEtapa },
    });

    return res.json({
      success: true,
      credencial: novaCredencial,
      usuario: usuarioAtualizado, // 🔥 USUÁRIO COMPLETO
    });
  } catch (err) {
    console.error("❌ Erro ao criar credencial:", err);
    return res.status(500).json({ error: "Erro ao criar credencial" });
  }
});

// ===============================
// ATUALIZAR CREDENCIAL
// ===============================
app.put("/api/credenciais/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { orderID, user, pass, platform, ba, limit, sortMode, persona } =
      req.body;

    const credencialExistente = await prisma.credencial.findUnique({
      where: { id },
    });

    if (!credencialExistente) {
      return res.status(404).json({
        error: "Credencial não encontrada",
      });
    }

    const credencialAtualizada = await prisma.credencial.update({
      where: { id },
      data: {
        orderID: orderID || credencialExistente.orderID,
        user: user || credencialExistente.user,
        pass: pass || credencialExistente.pass,
        platform: platform || credencialExistente.platform,
        ba: ba || credencialExistente.ba,
        limit: limit ?? credencialExistente.limit,
        sortMode: sortMode ?? credencialExistente.sortMode,
        persona: persona ?? credencialExistente.persona,
      },
    });

    return res.json({
      success: true,
      credencial: credencialAtualizada,
    });
  } catch (err) {
    console.error("❌ Erro ao atualizar credencial:", err);
    return res.status(500).json({ error: "Erro ao atualizar credencial" });
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

    const usuarioId = credencial.usuarioId;

    await prisma.credencial.delete({
      where: { id },
    });

    const credenciaisRestantes = await prisma.credencial.count({
      where: { usuarioId },
    });

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    const perfilCompleto =
      Boolean(usuario.nome) &&
      Boolean(usuario.dataNascimento) &&
      Boolean(usuario.telefone);

    let novaEtapa = 1;
    if (perfilCompleto) novaEtapa = 2;
    if (credenciaisRestantes > 0) novaEtapa = 3;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { perfilEtapa: novaEtapa },
    });

    return res.json({
      success: true,
      usuario: usuarioAtualizado,
      credenciaisRestantes,
    });
  } catch (err) {
    console.error("❌ Erro ao excluir credencial:", err);
    return res.status(500).json({
      error: "Erro interno ao excluir credencial",
    });
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
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
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
        voucherAtivo:
          perfilCompleto && !usuario.voucherAtivo
            ? true
            : usuario.voucherAtivo,
      },
    });

    return res.json(usuarioAtualizado);
  } catch (erro) {
    console.error("❌ Erro ao atualizar perfil:", erro);
    return res.status(500).json({
      erro: "Erro interno ao atualizar perfil",
    });
  }
});


// =========================
// CONFIGURAÇÃO MERCADO PAGO
// =========================
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// =========================
// STATUS PADRONIZADOS
// =========================
const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  IN_PROCESS: "in_process",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  CHARGED_BACK: "charged_back",
  EXPIRED: "expired",
};

// =========================
// ROTA: CRIAR PAGAMENTO
// =========================
app.post("/api/pagamento", async (req, res) => {
  try {
    const { usuarioId, plataforma, quantia, quantMoedas } = req.body;

    if (!usuarioId || !plataforma || !quantia) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const compra = await prisma.compra.create({
      data: {
        usuarioId,
        plataforma,
        quantia: Number(quantia),
        moeda: quantMoedas?.toString() || "FIFA",
        status: STATUS.PENDING,
      },
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: `Moedas FIFA - ${plataforma} (${quantMoedas})`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(quantia),
          },
        ],
        payer: {
          email: usuario.email,
        },
        metadata: {
          compraId: compra.id,
        },
        notification_url: `${HOST_URL}/api/webhook-mercadopago`,
        back_urls: {
          success: `${HOST_URL}/pagamentoaprovado`,
          failure: `${HOST_URL}/pagamentofalhou`,
          pending: `${HOST_URL}/pagamentopendente`,
        },
        auto_return: "approved",
      },
    });

    await prisma.compra.update({
      where: { id: compra.id },
      data: { mpPreferenceId: response.id.toString() },
    });

    res.json({ init_point: response.init_point });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ erro: "Erro ao criar pagamento" });
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

    res.json(compras);
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    res.status(500).json({ erro: "Erro ao buscar compras" });
  }
});

// =========================
// FUNÇÃO DE CONCLUSÃO
// =========================
async function concluirCompra(compraId) {
  const compra = await prisma.compra.findUnique({
    where: { id: compraId },
  });

  if (!compra) return;
  if (compra.status !== STATUS.APPROVED) return;
  if (compra.concluidoEm) return; // evita duplicação

  await prisma.credencial.create({
    data: {
      orderID: compra.id,
      user: "usuario_exemplo",
      pass: "senha_exemplo",
      platform: compra.plataforma,
      ba: "0",
      usuarioId: compra.usuarioId,
    },
  });

  await prisma.compra.update({
    where: { id: compra.id },
    data: {
      concluidoEm: new Date(),
    },
  });

  await prisma.notificacao.create({
    data: {
      usuarioId: compra.usuarioId,
      mensagem: "Sua compra foi concluída com sucesso!",
    },
  });

  console.log("Compra concluída:", compra.id);
}

// =========================
// WEBHOOK MERCADO PAGO (trecho ajustado)
// =========================
app.post("/api/webhook-mercadopago", async (req, res) => {
  try {
    console.log("Webhook recebido:", req.body);

    let paymentId = null;
    let compraId = null;

    // =========================
    // Caso 1: webhook de payment (payment.created ou payment.updated)
    // =========================
    if (req.body?.data?.id) {
      paymentId = req.body.data.id;
    }

    // =========================
    // Caso 2: webhook antigo com id direto
    // =========================
    if (!paymentId && req.body?.id) {
      paymentId = req.body.id;
    }

    // =========================
    // Caso 3: merchant_order
    // =========================
    if (!paymentId && req.body?.topic === "merchant_order") {
      const orderId = req.body?.resource?.split("/").pop();

      if (orderId) {
        const merchantOrder = await fetch(
          `https://api.mercadopago.com/merchant_orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
          }
        ).then(r => r.json());

        // Pega o primeiro pagamento aprovado (ou pendente)
        const payment = merchantOrder?.payments?.[0];
        if (payment?.id) {
          paymentId = payment.id;
        }

        // Tenta pegar o metadata direto do merchant_order
        if (merchantOrder?.metadata?.compraId) {
          compraId = merchantOrder.metadata.compraId;
        }
      }
    }

    // =========================
    // Caso normal de payment
    // =========================
    if (!compraId && paymentId) {
      const pagamento = new Payment(client);
      const paymentData = await pagamento.get({ id: paymentId });
      compraId = paymentData.metadata?.compraId;
    }

    if (!paymentId) {
      console.log("Webhook sem paymentId");
      return res.sendStatus(200);
    }

    if (!compraId) {
      console.log("Sem compraId no metadata");
      return res.sendStatus(200);
    }

    console.log("paymentId identificado:", paymentId, "compraId:", compraId);

    // =========================
    // Atualizando status da compra
    // =========================
    const pagamentoFinal = new Payment(client);
    const paymentData = await pagamentoFinal.get({ id: paymentId });
    const statusMp = paymentData.status;

    const statusPermitidos = [
      STATUS.PENDING,
      STATUS.APPROVED,
      STATUS.REJECTED,
      STATUS.CANCELLED,
      STATUS.IN_PROCESS,
      STATUS.EXPIRED,
    ];

    const statusFinal = statusPermitidos.includes(statusMp)
      ? statusMp
      : STATUS.PENDING;

    await prisma.compra.update({
      where: { id: compraId },
      data: {
        status: statusFinal,
        mpPaymentId: paymentId.toString(),
        mpStatus: statusMp,
        pagoEm: statusMp === STATUS.APPROVED ? new Date() : null,
        updatedAt: new Date(),
      },
    });

    console.log("Compra atualizada:", compraId, statusFinal);

    if (statusFinal === STATUS.APPROVED) {
      await concluirCompra(compraId);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro webhook MP:", err);
    res.sendStatus(200);
  }
});

// =========================
// CRON: EXPIRAR COMPRAS
// =========================
cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();

    const result = await prisma.compra.updateMany({
      where: {
        status: STATUS.PENDING,
        createdAt: {
          lt: new Date(now.getTime() - 30 * 60 * 1000),
        },
      },
      data: {
        status: STATUS.EXPIRED,
        expiradoEm: now,
      },
    });

    if (result.count > 0) {
      console.log(`Cron: ${result.count} compras expiradas.`);
    }
  } catch (error) {
    console.error("Erro no cron:", error);
  }
});

// =========================
// CANCELAR COMPRA
// =========================
app.post("/api/compras/:id/cancelar", async (req, res) => {
  try {
    const { id } = req.params;

    const compra = await prisma.compra.findUnique({
      where: { id },
    });

    if (!compra) {
      return res.status(404).json({ erro: "Compra não encontrada" });
    }

    if (compra.status !== STATUS.PENDING) {
      return res.status(400).json({
        erro: "Compra não pode ser cancelada",
      });
    }

    await prisma.compra.update({
      where: { id },
      data: {
        status: STATUS.CANCELLED,
        expiradoEm: new Date(),
      },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao cancelar compra" });
  }
});


// ======================= INICIAR SERVIDOR =======================

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
