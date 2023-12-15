import { useState, memo } from "react";

const ProfileInput = (props) => {
  const [value, setValue] = useState(props?.details);
  const theme = {
    backgroundColor: props?.edit ? "#e5e5e5" : "#fff",
    flex: 1,
    border: props?.edit ? "2px solid transparent" : "2px solid #111",
    borderRadius: "5px",
    padding: "10px",
    transition: ".25s ease",
  };

  const handleChange = (val) => {
    if (props?.max) setValue(val.target.value.substring(0, props.max));
    setValue(val.target.value);
    props?.handleChange(val);
  };
  return (
    <div className='profileInputWrapper flex flex-wrap my-2 items-center'>
      <label
        htmlFor={props?.name}
        className='text-gray-500 uppercase font-bold w-full md:w-2/5 mr-1 py-2'
      >
        {props?.name}
      </label>
      {!props?.disabled && (
        <input
          type={(!props?.edit && props?.type) || "text"}
          value={value}
          style={theme}
          maxLength={props?.max}
          placeholder={props?.placeholder}
          disabled={props?.edit}
          onChange={handleChange}
        />
      )}
      {props?.disabled && <h3>{value}</h3>}
    </div>
  );
};

export default memo(ProfileInput);
