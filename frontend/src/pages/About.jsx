import React from "react";
import { assets } from "../../public/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
        <div className="flex flex-col my-10 md:flex-row gap-12">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.about_image}
            alt=""
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/3 text-sm text-gray-600">
            <p>
              Welcome to ReliefCare! We are dedicated to simplifying healthcare
              by making it easier for you to book doctor appointments quickly
              and conveniently. Our platform connects you with trusted
              healthcare professionals across various specialties, allowing you
              to schedule appointments that fit your needs and lifestyle. With
              ReliefCare, you can access quality care from the comfort of your
              home, avoiding long wait times and ensuring you get the attention
              you deserve. Our mission is to provide hassle-free, reliable, and
              accessible healthcare solutions to help you maintain your
              well-being and peace of mind.
            </p>
            <p>
              At ReliefCare, we are committed to continually enhancing our
              platform to meet the evolving needs of our users. In the future,
              we aim to expand our network of healthcare professionals,
              incorporating more specialties and expanding our reach to
              underserved areas. We are also focused on integrating advanced
              technology, such as telemedicine and AI-driven health insights, to
              provide even more personalized and efficient healthcare services.
              Our goal is to make healthcare accessible, affordable, and
              seamless for everyone, ensuring that all individuals can access
              the care they need, whenever they need it.
            </p>
            <b className="text-gray-800">Our Vision</b>
            <p>
              Our vision at ReliefCare is to revolutionize the healthcare
              experience by making it accessible, efficient, and
              patient-centered. We envision a world where everyone can
              effortlessly connect with trusted healthcare providers, ensuring
              timely care and better health outcomes. Through continuous
              innovation, we aim to break down barriers to healthcare access,
              empowering individuals to take control of their well-being with
              ease and confidence. We strive to be the leading platform that
              bridges the gap between patients and healthcare professionals,
              fostering a healthier, more connected world.
            </p>
          </div>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold"> CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div>
          <b>Easy and Convenient Booking</b>
          <p>We simplify the process of finding and booking doctor appointments, offering a user-friendly platform that lets you schedule consultations anytime, anywhere, with just a few clicks.</p>
        </div>
        <div>
          <b>Trusted Healthcare Professionals</b>
          <p>ReliefCare connects you with certified and experienced doctors across various specialties, ensuring you receive quality care from trusted professionals.</p>
        </div>
        <div>
          <b>Seamless Access to Care</b>
          <p>Our platform provides a hassle-free, efficient way to access healthcare services, whether in-person or via telemedicine, allowing you to prioritize your health without unnecessary delays.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
