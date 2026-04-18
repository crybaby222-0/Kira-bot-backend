/**
 * Seed: cria um usuário admin padrão.
 * Rode: npm run seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@kirabot.com";
  const password = "admin1234"; // TROQUE em produção!

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin criado: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
