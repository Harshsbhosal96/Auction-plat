import { login } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "@/utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Please enter a valid password (minimum 6 characters)");
      return;
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Login
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
              />
              <small className="text-stone-400 text-sm">Example: user@example.com</small>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength="6"
                className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
              />
              <small className="text-stone-400 text-sm">Minimum 6 characters</small>
            </div>
            <button
              className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4"
              type="submit"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
          <div className="text-sm text-center mt-2">
            <a href="/forgot-password" className="text-[#d6482b] hover:text-[#b8381e]">
              Forgot password?
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;