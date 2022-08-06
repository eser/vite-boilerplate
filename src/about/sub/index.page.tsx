import { Helmet } from "react-helmet-async";

const PageName = "About Sub";

const Page = function AboutSub() {
  return (
    <>
      <Helmet>
        <title>{PageName}</title>
      </Helmet>
      <h1>About/Sub</h1>
    </>
  );
};

export { Page, PageName };
