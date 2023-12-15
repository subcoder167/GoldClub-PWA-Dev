import { useState, memo, useEffect } from "react";

const ProfileSelect = (props) => {
  const [value, setValue] = useState(props?.details);
  const theme = {
    backgroundColor: props?.edit ? "#e5e5e5" : "#fff",
    flex: 1,
    border: props?.edit ? "2px solid transparent" : "2px solid #111",
    borderRadius: "5px",
    padding: "10px",
    transition: ".25s ease",
    width: "100%",
  };

  const handleChange = (val) => {
    setValue(val?.target?.value);
    props?.handleChange(val);
  };

  return (
    <div className='profileInputWrapper flex flex-wrap my-2 items-center w-full'>
      <label
        htmlFor={props?.name}
        className='text-gray-500 uppercase font-bold w-full md:w-2/5 mr-1 py-2'
      >
        {props?.name}
      </label>

      {!props?.disabled && (
        <select
          style={theme}
          placeholder={props?.placeholder}
          value={value?.code}
          disabled={props?.edit}
          onChange={(e) => handleChange(e)}
        >
          {props?.options?.map((option) => (
            <option value={option?.code} key={option?.code}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {props?.disabled && <h3>{value}</h3>}
    </div>
  );
};

export default memo(ProfileSelect);
