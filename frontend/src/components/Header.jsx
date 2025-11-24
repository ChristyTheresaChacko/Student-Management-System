import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useSelector((state) => state.auth);

const handleLogout = () => {
dispatch(logout());
navigate("/login");
};

return ( <header className="bg-white shadow flex justify-between items-center p-4">


  {/* Left side: Hello {ROLE} */} <div className="text-green-900 font-semibold text-2xl"> Hello {user?.role?.toUpperCase() || "USER"} </div>

  {/* Right side: Logout button */}
  <Button onClick={handleLogout}>Logout</Button>
</header>


);
};

export default Header;
