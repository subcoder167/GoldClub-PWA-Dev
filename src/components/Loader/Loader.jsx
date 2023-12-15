import React from "react";
import { loaderType } from "../../constants/loaderConstants";
const LoaderWhite = () => {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full mx-1"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
const LoaderGeneric = () => {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full mx-1"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
const Loader = ({ variant }) => {
  switch (variant) {
    case loaderType.white:
      return <LoaderWhite />;
    default:
      return <LoaderGeneric />;
  }
};

export default Loader;
