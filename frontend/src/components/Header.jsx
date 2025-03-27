import React from "react";
import { assets } from "../../public/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/*Left Side of the header */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointments <br /> With Just One Click <br /> With The Most
          Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-lg font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Doctors Group"
          />
          <p>
            Choose from more than 100 trusted doctors{" "}
            <br className="hidden sm:block" /> to make your life stress and
            disease free from your home..!!
          </p>
        </div>
        <a
          className="flex items-center gap-2 bg-stone-300 px-8 py-3 rounded-full text-black text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book Appointment{" "}
          <img
            className="w-5"
            src={assets.arrow_icon}
            alt="booking navigator"
          />
        </a>
      </div>
      {/*Right side of the header */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
