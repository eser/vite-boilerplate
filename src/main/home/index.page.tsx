import { NoTest } from "../../shared/components/no-test.tsx";
import { useTitle } from "../../shared/hooks/use-title.ts";

const Home = function Home() {
  useTitle("Home");

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export { Home };
