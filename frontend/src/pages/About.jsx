import React from "react";
import { assets } from "../assets/assets";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-10 text-gray-500">
        <p>
          About <span className="text-gray-700 font-medium">US</span>{" "}
        </p>
      </div>

      <div className="flex flex-col my-10 md:flex-row gap-12">
        {/* lefty side for image */}
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />

        {/* right side for details */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            WoodLand Hospital is committed to delivering exceptional healthcare
            with compassion, precision, and trust. Our mission is to provide
            world-class medical services supported by advanced technology,
            modern infrastructure, and a team of highly skilled doctors and
            specialists. We prioritize patient safety, comfort, and well-being
            above everything.
          </p>

          <p>
            At WoodLand Hospital, we believe that great healthcare goes beyond
            treatment—it begins with understanding. Our compassionate staff,
            experienced doctors, and specialized departments work together to
            offer personalized care tailored to every patient’s needs.
          </p>

          <b className="text-gray-800">Our Vision</b>

          <p>
            At WoodLand Hospital, our vision is to create a healthier future by
            making advanced, compassionate, and accessible healthcare available
            to every individual. We strive to become a trusted center of medical
            excellence where innovation meets empathy.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-7">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-[#b03053] text-white transition-all duration-300 rounded-2xl">
          <b>EFFICIENCY:</b>
          <p>
            We deliver fast, accurate, and streamlined healthcare services to
            ensure you receive timely treatment without delays.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-[#b03053] text-white transition-all duration-300 rounded-2xl">
          <b>CONVENIENCE:</b>
          <p>
            Our seamless appointment booking and accessible care options make
            your healthcare experience simple and hassle-free.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-[#b03053] text-white transition-all duration-300 rounded-2xl">
          <b>PERSONALIZATION:</b>
          <p>
            We provide tailored medical care designed to meet your unique health
            needs and preferences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
