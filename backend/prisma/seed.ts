import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const SYSTEM_CATEGORIES: Array<{ name: string; icon: string; color: string; kind: 'EXPENSE' | 'INCOME' }> = [
  // Receitas
  { name: 'Salário', icon: 'banknote', color: '#16A34A', kind: 'INCOME' },
  { name: 'Freelance', icon: 'laptop', color: '#0EA5E9', kind: 'INCOME' },
  { name: 'Investimentos', icon: 'trending-up', color: '#8B5CF6', kind: 'INCOME' },
  { name: 'Outras receitas', icon: 'plus-circle', color: '#64748B', kind: 'INCOME' },

  // Despesas fixas
  { name: 'Moradia', icon: 'home', color: '#F59E0B', kind: 'EXPENSE' },
  { name: 'Alimentação', icon: 'shopping-cart', color: '#EF4444', kind: 'EXPENSE' },
  { name: 'Transporte', icon: 'bus', color: '#3B82F6', kind: 'EXPENSE' },
  { name: 'Saúde', icon: 'heart-pulse', color: '#EC4899', kind: 'EXPENSE' },
  { name: 'Educação', icon: 'graduation-cap', color: '#10B981', kind: 'EXPENSE' },

  // Despesas variáveis
  { name: 'Lazer', icon: 'party-popper', color: '#A855F7', kind: 'EXPENSE' },
  { name: 'Assinaturas', icon: 'repeat', color: '#06B6D4', kind: 'EXPENSE' },
  { name: 'Compras', icon: 'shirt', color: '#F97316', kind: 'EXPENSE' },
  { name: 'Viagens', icon: 'plane', color: '#6366F1', kind: 'EXPENSE' },
  { name: 'Outros', icon: 'more-horizontal', color: '#94A3B8', kind: 'EXPENSE' },
];

async function main() {
  for (const category of SYSTEM_CATEGORIES) {
    await prisma.category.upsert({
      where: { id: `default-${category.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}` },
      update: {},
      create: {
        id: `default-${category.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`,
        name: category.name,
        icon: category.icon,
        color: category.color,
        kind: category.kind,
        isDefault: true,
      },
    });
  }
  console.log(`Seed concluído: ${SYSTEM_CATEGORIES.length} categorias padrão criadas.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });