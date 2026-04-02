import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPasswordEmail } from "@/store/slices/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    dispatch(sendForgotPasswordEmail({ email }));
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[350px]">
        <h1 className="text-[#d6482b] text-2xl font-bold">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
            />
          </div>
          <button
            className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4"
            type="submit"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
