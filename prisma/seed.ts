import { PrismaClient } from '../lib/generated/prisma';

const prisma = new PrismaClient();

const mbrs = [
  {
    email: 'stellaryrock@gmail.com',
    nickname: '진석',
    image: 'https://avatars.githubusercontent.com/u/145004495?v=4',
    Book: {
      create: [
        {
          title: 'Personal Book',
          Mark: {
            create: {
              link: 'https://naver.com',
              title: 'Naver',
              descript: 'seeding...',
            },
          },
        },
      ],
    },
  },
  {
    email: 'alohakii@naver.com',
    nickname: '진석',
    image:
      'https://lh3.googleusercontent.com/a/ACg8ocJOmRYiD-M798J7SOxVJNOpp8VqF9P7cju6QXMLUSPU4NY5cw=s96-c',
  },
  {
    email: 'aaa@naver.com',
    nickname: 'aaa',
    passwd: '$2b$10$tkXPm6LAeKLz2nYGqGMi..sdpk6W9Y0Fsf9I8FgyVF0l7IWPoEZma',
  },
];

async function main() {
  for (const mbr of mbrs) {
    const rs = await prisma.member.upsert({
      where: { email: mbr.email },
      update: {},
      create: { ...mbr },
    });
    console.log('🚀 ~ rs:', rs);
  }
}

main()
  .catch(async (e) => {
    console.error('PrismaError>>', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.error('Prisma Closed!');
  });
