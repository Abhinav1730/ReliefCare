import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [loginState, setLoginState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (loginState === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-3xl font-semibold">
          {loginState === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {loginState === "Sign Up" ? "Sign Up" : "Login"} to Book
          Appointments...!!
        </p>
        {loginState === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-900 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>E Mail</p>
          <input
            className="border border-zinc-900 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-900 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          onClick={() => handleSubmit}
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {loginState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {loginState === "Sign Up" ? (
          <p>
            Already have an Account?{" "}
            <span
              onClick={() => setLoginState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Create a New Account?{" "}
            <span
              onClick={() => setLoginState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
