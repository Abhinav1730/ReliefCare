import React from "react";
import { assets } from "../../public/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*----Left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Logo ImG" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Your trusted platform for easy doctor appointments. Convenient,
            reliable, and secure scheduling for healthcare, helping you
            prioritize your health with just a few clicks.
          </p>
        </div>
        {/*----Center section */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/*----Right section */}
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 - "Number"</li>
            <li></li>"company@gmail.com"
          </ul>
        </div>
      </div>
      <div>
        {/*------Copyright----- */}
        <div>
          <hr />
          <p className="py-5 text-sm text-center">
            Copyright 2025@ReliefCare - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
