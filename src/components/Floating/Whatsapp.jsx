import React from "react";
import { useSelector } from "react-redux";

const Whatsapp = () => {
  const number = useSelector((state) => state?.graph?.store?.storePhoneNumber);
  return (
    <a
      href={"https://wa.me/" + number}
      className='fixed bottom-3 right-3 h-[50px] w-[50px] z-[999999999] drop-shadow-lg'
    >
      <img
        className='h-full w-full'
        src={process.env.PUBLIC_URL + "/whatsapp.png"}
        alt='whatsapp logo'
      />
    </a>
  );
};

export default Whatsapp;
