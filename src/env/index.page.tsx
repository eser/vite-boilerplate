import { Helmet } from "react-helmet-async";

const PageName = "Env";

const Page = function Env() {
  return (
    <>
      <Helmet>
        <title>{PageName}</title>
      </Helmet>
      <h1>Env</h1>
    </>
  );
};

export { Page, PageName };
