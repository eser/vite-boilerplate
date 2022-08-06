import { Helmet } from "react-helmet-async";
import * as styles from "./styles.module.css";

const PageName = "About";

const Page = function About() {
  return (
    <>
      <Helmet>
        <title>{PageName}</title>
      </Helmet>
      <h1 className={styles.red}>About</h1>
    </>
  );
};

export { Page, PageName };
