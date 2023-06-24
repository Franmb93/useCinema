export default function ErrorCustom({ error }) {
  return (
    <div className="error message">
      <h1>⛔️{error}</h1>
    </div>
  );
}
