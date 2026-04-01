import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword, isValidPhone } from "@/utils/validation";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [razorpayAccountNumber, setrazorpayAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Basic validation for required fields
    if (!userName || !address || !role) {
      alert("Please fill in all required fields");
      return;
    }

    // Auctioneer specific validation
    if (role === "Auctioneer") {
      if (!bankAccountName || !bankAccountNumber || !bankName) {
        alert("Please provide your complete bank details");
        return;
      }
      if (!razorpayAccountNumber) {
        alert("Please provide your Razorpay account number");
        return;
      }
      if (!paypalEmail || !isValidEmail(paypalEmail)) {
        alert("Please provide a valid PayPal email address");
        return;
      }
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
      formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("bankName", bankName),
      formData.append("razorpayAccountNumber", razorpayAccountNumber),
      formData.append("paypalEmail", paypalEmail));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Register
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleRegister}
          >
            <p className="font-semibold text-xl md:text-2xl">
              Personal Details
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  minLength="3"
                  maxLength="40"
                  className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
                />
                <small className="text-stone-400 text-sm">3-40 characters</small>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Email Address</label>
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
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
                />
                <small className="text-stone-400 text-sm">10 digits only (e.g., 9876543210)</small>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  required
                  minLength="10"
                  className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
                />
                <small className="text-stone-400 text-sm">Complete address for delivery</small>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
                >
                  <option value="">Select your role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
                <small className="text-stone-400 text-sm">Choose Auctioneer to sell items, Bidder to buy</small>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength="6"
                  className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200"
                />
                <small className="text-stone-400 text-sm">Minimum 6 characters required</small>
              </div>
            </div>
            <div className="flex flex-col sm:flex-1 gap-2">
              <label className="text-[16px] text-stone-600">
                Profile Image
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : "/imageHolder.jpg"
                  }
                  alt="profileImagePreview"
                  className="w-14 h-14 rounded-full"
                />
                <input type="file" onChange={imageHandler} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-xl md:2xl flex flex-col">
                Payment Method Details{" "}
                <span className="text-[12px] text-stone-500">
                  Fill Payment Details Only If you are registering as an
                  Auctioneer
                </span>
              </label>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-stone-500">
                  Bank Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  >
                    <option value="">Select Your Bank</option>
                    <option value="HDFC">HDFC</option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="SBI">SBI</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    placeholder="IFSC"
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                  <input
                    type="text"
                    value={bankAccountName}
                    placeholder="Bank Account username"
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                </div>
              </div>
              <div>
                <label className="text-[16px] text-stone-600 font-semibold">
                  Razorpay And Paypal Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <input
                    type="number"
                    value={razorpayAccountNumber}
                    placeholder="Razorpay Account Number"
                    onChange={(e) => setrazorpayAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                  <input
                    type="email"
                    value={paypalEmail}
                    placeholder="Paypal Email Address"
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="text-[16px] py-2 px-3 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none focus:border-b-[#d6482b] transition-colors duration-200 sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                </div>
              </div>
            </div>

            <button
              className="bg-[#d6482b] w-[420px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto lg:w-[640px] my-4"
              type="submit"
              disabled={loading}
            >
              {loading && "Registering..."}
              {!loading && "Register"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;

