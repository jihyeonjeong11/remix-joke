import { Outlet, Link, useLoaderData } from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { Joke } from '@prisma/client'; // prisma 스키마에서 저장된게 여기서 쓸수있으.
import { json } from '@remix-run/node';
import stylesUrl from '~/styles/jokes.css';
import { db } from '~/utils/db.server';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

type LoaderData = {
  jokeListItems: Array<Joke>;
};

type overfecthData = {
  jokeListItems: Array<{ id: string; name: string }>;
};

// export const loader: LoaderFunction = async () => {
//   const data: LoaderData = {
//     jokeListItems: await db.joke.findMany(),
//   };
//   return json(data);
// };

// 위는 테이블 내용 전체
// 아래는 여러 세팅
// 아래 로더에는 그래프ql이나 rest 엔드포인트나 로직을 그대로 넣어줄 수 있음.

export const loader: LoaderFunction = async () => {
  // id와 name만 받아오기
  const data: overfecthData = {
    // 시퀄라이즈 문법 그대로 사용 가능하므로,
    jokeListItems: await db.joke.findMany({
      // 5개만 받기
      take: 5,
      select: { id: true, name: true },
      orderBy: { createdAt: 'desc' },
    }),
  };
  return json(data);
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();
  // 위 loader는 server-side에서 돌아간다는 것!
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokeListItems.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

// url/jokes에서 또 다른 페이지가 분기하니까, 여기서 Outlet을 사용함.
