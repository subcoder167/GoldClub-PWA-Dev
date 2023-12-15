import React from "react";
import ErrorMessage from "../Messages/ErrorMessage";

const Error = () => {
  return (
    <div>
      <ErrorMessage error="Something went wrong. Please refresh!" />
    </div>
  );
};

export default Error;
