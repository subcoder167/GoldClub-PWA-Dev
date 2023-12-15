import React, { useEffect, useState, useRef } from "react";

const OtpInput = (props) => {
  const [val, setVal] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

  const first = useRef();
  const second = useRef();
  const third = useRef();
  const fourth = useRef();
  const fifth = useRef();
  const sixth = useRef();

  useEffect(() => {
    first.current.focus();
  }, []);

  useEffect(() => {
    props && props.updateOtp(val);
  }, [val]);

  return (
    <section className="flex items-center mb-3">
      <input
        type="number"
        className="otpInput w-8 h-8 flex text-center font-bold shadow-sm m-[2px] bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out text-sm"
        ref={first}
        maxLength={1}
        min={0}
        max={9}
        onKeyUp={(e) => {
          setVal({ ...val, 1: e.target.value });
          if (e.target.value.trim().length > 0) second.current.focus();
        }}
      />
      <input
        type="number"
        className="otpInput w-8 h-8 flex text-center font-bold shadow-sm m-[2px] bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out text-sm"
        ref={second}
        maxLength={1}
        min={0}
        max={9}
        onKeyUp={(e) => {
          setVal({ ...val, 2: e.target.value });
          if (e.target.value.trim().length > 0) third.current.focus();
          if (e.key === "Backspace") first.current.focus();
        }}
      />
      <input
        type="number"
        className="otpInput w-8 h-8 flex text-center font-bold shadow-sm m-[2px] bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out text-sm"
        ref={third}
        maxLength={1}
        min={0}
        max={9}
        onKeyUp={(e) => {
          setVal({ ...val, 3: e.target.value });
          if (e.target.value.trim().length > 0) fourth.current.focus();
          if (e.key === "Backspace") second.current.focus();
        }}
      />
      <input
        type="number"
        className="otpInput w-8 h-8 flex text-center font-bold shadow-sm m-[2px] bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out text-sm"
        ref={fourth}
        maxLength={1}
        min={0}
        max={9}
        onKeyUp={(e) => {
          setVal({ ...val, 4: e.target.value });
          if (e.target.value.trim().length > 0) fifth.current.focus();
          if (e.key === "Backspace") third.current.focus();
        }}
      />
      <input
        type="number"
        className="otpInput w-8 h-8 flex text-center font-bold shadow-sm m-[2px] bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out text-sm"
        ref={fifth}
        maxLength={1}
        min={0}
        max={9}
        onKeyUp={(e) => {
          setVal({ ...val, 5: e.target.value });
          if (e.target.value.trim().length > 0) sixth.current.focus();
          if (e.key === "Backspace") fourth.current.focus();
        }}
      />
      <input
        type="number"
        className="otpInput w-8 h-8 flex text-center font-bold shadow-sm m-[2px] bg-white rounded border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yello-200 text-base outline-none text-gray-700  leading-8 transition-colors duration-200 ease-in-out text-sm"
        ref={sixth}
        maxLength={1}
        min={0}
        max={9}
        onKeyUp={(e) => {
          setVal({ ...val, 6: e.target.value });
          if (e.key === "Backspace") fifth.current.focus();
          setTimeout(() => {
            let flag = true;
            for (let i = 0; i < 6; i++) {
              if (val[i]?.length == 0) {
                flag = false;
                break;
              }
            }
            if (flag && e.target.value.trim().length > 0)
              props?.handleComplete();
          }, 100);
        }}
      />
    </section>
  );
};

export default OtpInput;
