import React from "react";

const TitleSm = (props) => {
  return <h2 className="font-light text-2xl ">{props && props.title}</h2>;
};

export default TitleSm;
