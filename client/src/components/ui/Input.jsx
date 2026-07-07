function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          className={`
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            py-3
            ${icon ? "pl-12" : "pl-4"}
            pr-4
            outline-none
            transition
            focus:border-blue-600
            focus:ring-2
            focus:ring-blue-100
          `}
        />
      </div>
    </div>
  );
}

export default Input;