import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../components/ErrorToast";


import logo from "../../assets/LOGO.png";
import rightImg from "../../assets/LOGO-login right.png";
import Button from "../../components/Button";

const LoginPage = () => {
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();
const { token, user, loading, error } = useSelector((state) => state.auth);
const [toastMessage, setToastMessage] = useState("");


useEffect(() => {
if (token && user?.role) {
if (user.role === "ADMIN") navigate("/dashboard");
else if (user.role === "TEACHER") navigate("/teacher");
else if (user.role === "STUDENT") navigate("/student");
}
}, [token, user, navigate]);

const handleSubmit = (e) => {
e.preventDefault();
  if (!userName.trim() || !password.trim()) {
    setToastMessage('Please provide both username and password');
    return;
  }

  dispatch(loginUser({ userName, password }))
    .unwrap()
    .then((res) => console.log("Login Success:", res))
    .catch((err) => {
      console.error('Login Error:', err);
   
    });
};

return ( <div className="min-h-screen flex bg-gray-50">


  
  <div className="hidden lg:flex flex-col w-5/12 bg-green-800 justify-center p-12 rounded-r-3xl">
    <div className="text-white">
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Greenfield Logo"
          className="mt-4"
          style={{ maxWidth: "200px", height: "auto" }}
        />
        <div className="flex flex-col">
          <p className="text-3xl sm:text-5xl font-bold tracking-widest">
            GREENFIELD
          </p>
          <p className="text-lg sm:text-2xl font-light mt-2">
            StudentConnect
          </p>
        </div>
      </div>
    </div>
  </div>

  
  <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
    <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-xl border border-gray-200">

      <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
        LOGIN
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 uppercase">
            USERNAME
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 uppercase">
            PASSWORD
          </label>
          <input
            type="password"
            required
            className="mt-1 block w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {toastMessage && <ErrorToast message={toastMessage} onClose={() => setToastMessage("")} />}
        <ErrorToast 
          message={error === "Internal Server Error" ? "Invalid username or password" : error} 
        />

        <Button
          type="submit"
          className="w-full mt-8 bg-green-600/80 hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "SIGNING IN..." : "SIGNIN"}
        </Button>
      </form>
    </div>
  </div>

  
  <div className="absolute bottom-0 right-0 hidden lg:block">
    <img src={rightImg} className="w-80" alt="Decorative" />
  </div>
</div>


);
};

export default LoginPage;
