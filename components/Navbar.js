import Link from "next/link";

const Navbar = ({ children }) => {
  return (
    <>
      <nav style={{ padding: "0 2rem " }}>
        <span>
          <Link href="/">
            <a>Home</a>
          </Link>
        </span>
        <span>--</span>
        <span>
          <Link href="/blogs">
            <a>blogs</a>
          </Link>
        </span>

        <span>--</span>

        <span>--</span>
        <span>
          <Link href="/lfg">
            <a>lfg</a>
          </Link>
        </span>
        <span>--</span>
        <span>--</span>
        <span>
          <Link href="/login">
            <a>login</a>
          </Link>
        </span>
        <span>--</span>
        <span>--</span>
        <span>
          <Link href="/register">
            <a>register</a>
          </Link>
        </span>
        <span>--</span>
        <span>--</span>
      </nav>
    </>
  );
};

export default Navbar;
