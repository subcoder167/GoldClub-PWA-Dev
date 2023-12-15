import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitterSquare,
} from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
const Footer = () => {
  const socialsData = JSON.parse(localStorage.getItem(`vjw-${window.location.hostname}socials`));
  const facebookLink = socialsData && socialsData.facebook;
  const instagramLink = socialsData && socialsData.instagram;
  const youtubeLink = socialsData && socialsData.youtube;
  return (
    <section className='footer w-full flex flex-col items-start justify-start bg-[#111] px-[35px] py-8'>
      <div className='footerLogo'>
        <img
          src={
            localStorage.getItem(`vjw-${window.location.hostname}logo`) ||
            process.env.PUBLIC_URL + "/logo_nav.png"
          }
          alt=''
          className='w-[80px]'
        />
      </div>
      <ul className='footerList list-none mt-4'>
        {/* <li className='text-[#4E4E4E] text-xl font-bold my-4'>
          <Link to="https://goldclub.co/#contact" target='_blank'>Contact Us</Link>
        </li> */}
        <li className='text-[#4E4E4E] text-xl font-bold my-4'>
          <Link to="https://goldclub.co/terms.html" target='_blank'>Terms & Conditions</Link>
        </li>
        <li className='text-[#4E4E4E] text-xl font-bold my-4'>
          <Link to="https://goldclub.co/privacy_policy.html" target='_blank'>Privacy Policies </Link>
        </li>
        <li className='text-[#4E4E4E] text-xl font-bold my-4'>
          <Link to="https://goldclub.co/shipping_policy.html" target='_blank'>Shipping Policies </Link>
        </li>
        <li className='text-[#4E4E4E] text-xl font-bold my-4'>
          <Link to="https://goldclub.co/return_policy.html" target='_blank'>Return Policies </Link>
        </li>
      </ul>
      <section className='footerLinks w-full flex items-center justify-center gap-4 my-8'>
        
        <Link
          to={facebookLink}
          target='_blank'>
          {" "}
          <FaFacebookF color='#4E4E4E' size={42} />
        </Link>
        <Link
          to={instagramLink}
          target='_blank'
        >
          <FaInstagram color='#4E4E4E' size={42} />
        </Link>
        <Link
          to={youtubeLink}
          target='_blank'
        >
          <FaYoutube color='#4E4E4E' size={42} />
        </Link>
      </section>
      <div className='text-[#9e9e9e] text-sm font-bold w-full mb-2 mt-4 flex items-center justify-center gap-x-1'>
        <AiFillThunderbolt /> Powered by GoldClub
      </div>
    </section>
  );
};

export default Footer;
