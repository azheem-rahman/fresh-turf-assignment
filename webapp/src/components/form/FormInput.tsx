import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const FormInput = ({ label, error, ...props }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
