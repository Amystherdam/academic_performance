import { Outlet } from "react-router";
import NavBar from "@components/NavBar";

export default function MainContainer() {
  const navBarlinks = [
    {
      label: "Students",
      path: "/students",
    },
    {
      label: "Ranking",
      path: "/students/ranking",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <NavBar paths={navBarlinks} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex flex-1 overflow-hidden" aria-label="main">
          <section
            aria-label="section"
            className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
          >
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}
