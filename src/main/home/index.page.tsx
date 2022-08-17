import { useTitle } from "../../shared/hooks/use-title.ts";
import { useFetchp } from "fetchp";

const Home = function Home() {
  useTitle("Home");

  const { data, isSuccess } = useFetchp("GET", "https://jsonplaceholder.typicode.com/posts")

  return (
    <>
      <h1>Home</h1>

      {isSuccess && (
        <blockquote>
          {JSON.stringify(data)}
        </blockquote>
      )}
    </>
  );
};

export { Home };
