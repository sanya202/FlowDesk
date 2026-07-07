function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        hover:border-blue-200
        ${onClick ? "cursor-pointer hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;