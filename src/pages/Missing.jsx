import React from "react";
import { Link } from "react-router-dom";

function Missing() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <img
        src={process.env.PUBLIC_URL + "/404.svg"}
        className="w-10/12 lg:w-1/2 h-auto my-4"
        alt="404 icon"
      />

      <h2 className="text-4xl font-bold">Oops!</h2>
      <h4
        className="text-xl font-semibold text-center px-2 my-4
      "
      >
        The page you requested, doesn't exist!
      </h4>
      <Link
        to="/app/home"
        className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:yellow-600 rounded text-lg"
      >
        Start shopping
      </Link>
    </section>
  );
}

export default Missing;
