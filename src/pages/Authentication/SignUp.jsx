import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/loginshoe.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { userAPI } from "../../Api";
import { UserContext } from "../../App";

function SignUp() {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      admin: false,
      blocked: false,
      cart: [],
      orders: []
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Too short").required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      if (isSubmitting) return; 
      setIsSubmitting(true);
      const { confirmpassword, ...newData } = values;

      try {
        const isUser = users.find((u) => u.email === values.email);
        if (isUser) {
          toast.error("Email already in use");
        } else {
          const response = await axios.post(userAPI, newData);
          const createdUser = response.data; 
          setUsers((prevUsers) => [...prevUsers, createdUser]);
          toast.success("Signup Successful");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Error creating user");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen w-full bg-blue-500 flex justify-center items-center absolute top-0 z-50">
      <form onSubmit={formik.handleSubmit}>
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
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              ) : null}

              <input
                type="text"
                name="email"
                placeholder="Email"
                className={`border-b-2 p-2 focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}

              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`border-b-2 p-2 focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}

              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                className={`border-b-2 p-2 focus:outline-none ${
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                    ? "border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassword}
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmpassword}
                </p>
              ) : null}

              <div className="flex mt-10 items-center justify-between px-2">
                <button
                  type="submit"
                  className="hover:bg-blue-600 bg-blue-500 text-white h-10 w-24"
                  disabled={isSubmitting}
                >
                  SignUp
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-500"
                >
                  LogIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
