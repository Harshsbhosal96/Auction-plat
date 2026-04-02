import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/slices/userSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please fill both password fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
        <h1 className="text-[#d6482b] text-2xl font-bold">Reset Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              minLength={6}
              className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              minLength={6}
              className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
            />
          </div>
          <button
            className="bg-[#d6482b] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4"
            type="submit"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
