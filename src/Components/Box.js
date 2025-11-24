export default function  Box({ children, isOpen, setIsOpen }) {
  return (
    <div className="box" style={{overflow:"hidden"}}>
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}