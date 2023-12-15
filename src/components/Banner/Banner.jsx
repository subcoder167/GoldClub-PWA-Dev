import React from "react";

const Banner = (props) => {
  return (
    <section className="w-full bg-[#FFF5DA] flex items-center justify-between shadow-md px-4 py-2 my-4 md:w-3/4 md:p-8">
      <div className="bannerDetails">
        <h2 className="cursiveFont text-2xl lg:text-4xl">
          {props && props.title}
        </h2>
        <p className="text-xs cursiveFont lg:text-lg">
          {props && props.description}
        </p>
      </div>
      <a
        href={props && props.link}
        className="bannerLink bg-[#000531] text-white py-2 px-5 rounded-md text-sm lg:text-lg"
      >
        Buy Now
      </a>
    </section>
  );
};

export default Banner;
