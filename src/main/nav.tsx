import { Link } from "react-router-dom";

const Nav = function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/env/">Env</Link></li>
        <li><Link to="/about/">About</Link></li>
        <li><Link to="/about/sub/">About Sub</Link></li>
      </ul>
    </nav>
  );
};

export { Nav };
