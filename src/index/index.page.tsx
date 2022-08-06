import { Helmet } from "react-helmet-async";

const PageName = "Home";

const Page = function Index() {
  return (
    <>
      <Helmet>
        <title>{PageName}</title>
      </Helmet>
      <h1>Home</h1>
    </>
  );
};

export { Page, PageName };
