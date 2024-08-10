import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import loginBg from "../../assets/loginshoe.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUsers, users } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = users.find(
        (value) => value.email === email && value.password === password
      );
      if (user) {
        localStorage.setItem("id", user.id);
        setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? user : u))); // Ensure context is updated
        toast.success("Login successful!");
        navigate("/");
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  return (
    <div className="h-screen w-full bg-blue-500 flex justify-center items-center absolute top-0 z-10">
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
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 focus:border-slate-400 p-2 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 focus:border-slate-400 p-2 focus:outline-none"
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex mt-10 items-center justify-between px-2">
              <button
                onClick={handleLogin}
                className="hover:bg-blue-600 bg-blue-500 text-white h-10 w-24"
              >
                Login
              </button>
              <Link to="/signup" className="text-blue-500">
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
