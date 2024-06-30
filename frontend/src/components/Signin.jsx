import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signin } from "../apiEndpoint";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { signinStart, signInSuccess, signInFailure } from "../redux/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const {loading,error} = useSelector((state) => state.user);

//   console.log(userData);
  const userDetails = {
    email: email,
    password: password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinStart());
    axios
      .post(signin, userDetails)
      .then((res) => {
        dispatch(signInSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(signInFailure(err.message));
        console.log(err);

        toast.error("Invalid Email or Password!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
  };
  return (
    <div className="flex flex-col gap-5 max-w-lg mx-auto my-7">
      <h2 className="text-4xl font-semibold text-center">Sign In</h2>
      <form className="flex flex-col gap-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border rounded-lg p-3"
        />
      </form>
      <button
        onClick={handleSubmit}
        className="bg-slate-700 text-white p-3 rounded-lg"
      >
        Sign In
      </button>
      <div className="text-lg flex space-x-3">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-700">
          Sign up
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signin;
