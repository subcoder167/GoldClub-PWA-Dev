import React, { useEffect, useState } from "react";

const TextInput = (props) => {
  const [val, setVal] = useState(() => {
    if (props && props.val) return props.val;
    else return "";
  });

  const handleChange = (e) => {
    setVal(e.target.value);
  };
  useEffect(() => {
    // console.log(val);
    props && props.updateVal(val);
  }, [val]);
  return (
    <div className="relative my-4">
      <label
        htmlFor={props && props.label}
        className="leading-7 text-md font-bold px-3"
      >
        {props && props.label}
      </label>
      <input
        type={(props && props.type) || "text"}
        id={props && props.label}
        name={props && props.label}
        max={props && props.max}
        pattern={props && props.pattern}
        placeholder={props && props.placeholder}
        className="w-full h-9 bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-sm"
        onKeyUp={handleChange}
        required={(props && props.required) || false}
      />
    </div>
  );
};

export default TextInput;
