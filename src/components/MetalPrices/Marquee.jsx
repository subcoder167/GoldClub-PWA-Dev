import React from "react";

const Marquee = (props) => {
  console.log(props,props.children, 'marquee');
  // Check if props.children is 0.0, if so, don't render the marquee
  // if (props.children === '0.0') {
  //   return null;
  // }

  return (
    <marquee style={props.theme}>{props && props.children}</marquee>
  );
};

export default Marquee;