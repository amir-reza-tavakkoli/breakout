import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.food.create({
    data: {
      name: "Fast food",
      description: "Really bad",
      avatarUrl: "",
      status: {
        connectOrCreate: {
          where: {
            overall: "Detrimental",
          },
          create: {
            overall: "Detrimental",
            advice: "Eat less of it",
          },
        },
      },
      successor: {
        create: {
          predecessor: {
            create: {
              name: "Pizza",
              isCategory: false,
              avatarUrl: "",
              description: "Contains cheese",
              status: {
                connect: {
                  overall: "Detrimental",
                },
              },
            },
          },
        },
      },
    },
  });
  await prisma.food.create({
    data: {
      name: "Fruit",
      description: "Generally, good",
      avatarUrl: "",
      status: {
        connectOrCreate: {
          where: {
            overall: "Beneficial",
          },
          create: {
            overall: "Beneficial",
            advice: "Take it more frequently",
          },
        },
      },
      successor: {
        create: {
          predecessor: {
            create: {
              name: "Apple",
              isCategory: false,
              avatarUrl: "",
              description: "Full of vitamins",
              status: {
                connect: {
                  overall: "Beneficial",
                },
              },
            },
          },
        },
      },
    },
  });

  // await prisma.food.create({
  //   data: {
  //     name: "Pizza",
  //     avatarUrl: "",
  //     description: "Contains cheese",
  //     status: {
  //       connect: {
  //         overall: "Detrimental",
  //       },
  //     },
  //     // categories: {
  //     //   create: {
  //     //     category: {
  //     //       connect: { name: "Fast food" },
  //     //     },
  //     //     isMain: true,
  //     //   },
  //     // },
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
