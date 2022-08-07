import { Link, Route, Routes } from "react-router-dom";
import { AppShell, Header, Navbar } from "@mantine/core";

import { Home } from "./home/index.page.tsx";
import { Env } from "./env/index.page.tsx";
import { About } from "./about/index.page.tsx";
import { AboutSub } from "./about/sub/index.page.tsx";

const Nav = function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/env/">Env</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/about/sub/">About Sub</Link>
        </li>
      </ul>
    </nav>
  );
};

const Main = function Main() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Nav />
        </Navbar>
      }
      header={<Header height={60} p="xs">vite-boilerplate</Header>}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        },
      })}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/env/" element={<Env />} />
        <Route path="/about/" element={<About />} />
        <Route path="/about/sub/" element={<AboutSub />} />
      </Routes>
    </AppShell>
  );
};

export { Main };
