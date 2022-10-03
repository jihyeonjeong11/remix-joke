import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

// 해당 코드의 문제는, server side 코드 변경시마다 db 연결을 새로 해야한다는 것임. 따라서 바꿔줘야함. next에서도 똑같은 문제임.

async function seed() {
  await Promise.all(
    getJokes().map((joke) => {
      return db.joke.create({ data: joke });
    })
  );
}

seed();

function getJokes() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: 'Road worker',
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      name: 'Frisbee',
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      name: 'Trees',
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      name: 'Skeletons',
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      name: 'Hippos',
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      name: 'Dinner',
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      name: 'Elevator',
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}