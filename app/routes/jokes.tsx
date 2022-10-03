import { Outlet } from "@remix-run/react";

export default function JokesRoute() {
  return (
    <div>
      <h1>J🤪KES</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

// url/jokes에서 또 다른 페이지가 분기하니까, 여기서 Outlet을 사용함.