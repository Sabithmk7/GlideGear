import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../assets/loginshoe.jpeg";
import { UserContext } from "../../App";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp({ setCheckNav }) {
  const { formData, setFormData } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setCheckNav(false);
  }, [setCheckNav]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function validateForm() {
    const { name, email, password, confirmpassword } = formData;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password !== confirmpassword)
      errors.confirmpassword = "Passwords must match";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Signup Successfull");
      try {
        const{confirmpassword,...newData}=formData
        await axios.post("http://localhost:3001/users", newData);
        navigate("/login");
      } catch (error) {
        console.error("Error creating user:", error);
      }
      
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  }

  return (
    <div className="h-screen w-full bg-blue-500 flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 place-content-center rounded-xl shadow-black shadow-lg">
          <div className="hidden md:flex justify-end h-[500px] w-[500px]">
            <img
              src={loginBg}
              alt="Login Background"
              className="p-4 rounded-lg object-cover transition-transform scale-110 duration-300 h-[600px] w-[500px]"
            />
          </div>
          <div className="px-8 py-16 bg-white shadow-lg flex justify-center flex-col gap-4 md:h-[600px] md:w-[500px]">
            <h2 className="text-2xl font-bold text-center text-blue-500">
              SIGNUP
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`border-b-2 p-2 focus:outline-none ${
                  errors.name ? "border-red-500" : "focus:border-slate-400"
                }`}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <input
                type="text"
                name="email"
                placeholder="Email"
                className={`border-b-2 p-2 focus:outline-none ${
                  errors.email ? "border-red-500" : "focus:border-slate-400"
                }`}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`border-b-2 p-2 focus:outline-none ${
                  errors.password ? "border-red-500" : "focus:border-slate-400"
                }`}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                className={`border-b-2 p-2 focus:outline-none ${
                  errors.confirmpassword
                    ? "border-red-500"
                    : "focus:border-slate-400"
                }`}
                onChange={handleChange}
              />
              {errors.confirmpassword && (
                <p className="text-red-500 text-sm">{errors.confirmpassword}</p>
              )}

              <div className="flex mt-10 items-center justify-between px-2">
                <button
                  type="submit"
                  className="hover:bg-blue-600 bg-blue-500 text-white h-10 w-24"
                >
                  SignUp
                </button>
                <Link to="/login" className="text-blue-500">
                  LogIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
