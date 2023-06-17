import LogoNavbar from "./components/LogoNavbar";

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <LogoNavbar />
      {children}
    </nav>
  );
}
