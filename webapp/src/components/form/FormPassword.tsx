import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const FormPassword = ({ label, error, ...props }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm"
        >
          {show ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
};

export default FormPassword;
