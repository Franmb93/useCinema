export default function LogoNavbar({ src, children }) {
  return (
    <div className="navbar__logo">
      <img src={src} alt="logo"></img>
      <h3>{children}</h3>
    </div>
  );
}
