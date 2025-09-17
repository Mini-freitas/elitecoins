/*import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const emailAdmin = "elitecoins26@gmail.com";
  const senhaAdmin = "Elite26@"; // sua senha do admin
  const nomeAdmin = "Administrador";

  // Verifica se já existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: emailAdmin },
  });

  if (usuarioExistente) {
    console.log("Admin já existe!");
    return;
  }

  // Criptografa a senha
  const senhaHash = await bcrypt.hash(senhaAdmin, 10);

  // Cria admin
  const admin = await prisma.usuario.create({
    data: {
      nome: nomeAdmin,
      email: emailAdmin,
      senha: senhaHash,
      tipo: "ADMIN",
    },
  });

  console.log("Admin criado com sucesso:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/

  // criando preço de moeda

// seed.js
/*import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existe = await prisma.moedaPreco.findFirst(); // nome tem que bater com schema
  if (!existe) {
    await prisma.moedaPreco.create({
      data: {
        play: 0,
        xbox: 0,
        pc: 0,
      },
    });
    console.log("Preço inicial criado com sucesso 🚀");
  } else {
    console.log("Já existe registro, não foi criado outro.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/