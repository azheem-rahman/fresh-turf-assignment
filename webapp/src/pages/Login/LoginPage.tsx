import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormPassword from "../../components/form/FormPassword";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  pin: string;
};

const LoginPage = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (formData: LoginFormInputs) => {
    console.log(formData);
    const mockUser = {
      name: "Tan Kai Yee",
      role: "Case Store Officer",
    };

    setUser(mockUser);
    navigate("/transaction-history");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email}
          />

          <FormPassword
            label="PIN"
            {...register("pin", { required: "PIN is required" })}
            error={errors.pin}
          />

          <button
            className="w-full py-2 bg-blue-950 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-200"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
