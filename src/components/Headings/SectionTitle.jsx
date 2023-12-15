import React from "react";

const SectionTitle = (props) => {
  return <h3 className="font-bold mt-3 ">{props && props.title}</h3>;
};

export default SectionTitle;
