import FormInput from "../../components/form/FormInput";
import FormPassword from "../../components/form/FormPassword";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
        <form className="space-y-5">
          <FormInput label="Email" />
          <FormPassword label="PIN" />
          <button className="w-full py-2 bg-blue-950 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-200">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
