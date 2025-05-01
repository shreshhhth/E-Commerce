import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to LOOTED!, your one-stop destination for fashion that
            speaks your style. Founded with a passion for individuality and
            expression, we're more than just an online clothing store — we're a
            movement. Our mission is to empower you to look and feel your best
            with fashion that's bold, versatile, and effortlessly wearable. At
            LOOTED, we curate high-quality, trend-forward pieces for every mood,
            moment, and season.
          </p>
          <p>
            From everyday essentials to standout statement pieces, we bring you
            styles that blend comfort, creativity, and confidence — without
            compromising on quality or price.
          </p>
          <b className="text-gray-800">OUR MISSION</b>
          <p>
            Whether you're dressing up for an occasion or keeping it casual,
            we've got you covered. Because when you wear LOOTED, you're not just
            wearing clothes — you're making a statement. Thanks for being part
            of our journey. Let's redefine fashion, together.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ">
        <Title text1={'WHY'}  text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600"> We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600" >With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div> 
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600" >Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
