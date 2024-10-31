import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import loginBg from "../../assets/loginshoe.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Slices/AuthSlice";

function LoginPage() {
  const { users } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Dispatch loginUser and wait for the response
        const response = await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();
        
        // Show a success toast
        toast.success("User logged in successfully");
        console.log(response)
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("role",response.data.role);
        localStorage.setItem("token",response.data.token)

        // Check the role from the response data and navigate accordingly
        if (response.data.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate('/');
        }
      } catch (error) {
        // Handle errors based on the response
        if (error.statusCode === 409) {
          toast.warn(error.message);
        } else {
          toast.error(error.message || "Error logging in");
        }
      }
    }
    
  });

  return (
    <div className="h-screen w-full bg-blue-500 flex justify-center items-center absolute top-0 z-50">
      <div className="grid md:grid-cols-2 place-content-center rounded-xl shadow-black shadow-lg">
        <div className="hidden md:flex justify-end h-[500px] w-[500px]">
          <img
            src={loginBg}
            alt=""
            className="p-4 rounded-lg object-cover transition-transform scale-110 duration-300 h-[600px] w-[500px]"
          />
        </div>
        <div className="px-8 py-16 bg-white shadow-lg flex justify-center flex-col gap-4 md:h-[600px] md:w-[500px]">
          <h2 className="text-2xl font-bold text-center text-blue-500">
            LOGIN
          </h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-b-2 focus:border-slate-400 p-2 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : null}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-b-2 focus:border-slate-400 p-2 focus:outline-none"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : null}
            <div className="flex mt-10 items-center justify-between px-2">
              <button
                type="submit"
                className="hover:bg-blue-600 bg-blue-500 text-white h-10 w-24"
              >
                Login
              </button>
              <Link to="/signup" className="text-blue-500">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
