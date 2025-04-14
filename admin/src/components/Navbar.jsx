import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const {doctorToken , setDoctorToken} = useContext(DoctorContext)
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    adminToken && setAdminToken("");
    adminToken && localStorage.removeItem("adminToken");
    doctorToken && setDoctorToken("")
    doctorToken && localStorage.removeItem("doctorToken")
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 cursor-pointer" src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
