import React from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import TitleSm from "../Headings/TitleSm";
const Collections = () => {
  return (
    <section className='w-full overflow-hidden my-4'>
      <div className=' px-[35px] py-4'>
        <TitleSm title='Exclusive Collections' />
      </div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          800: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          1000: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        // navigation
        // pagination={{ clickable: true }}
        className='w-[90vw] homeslider px-4 '
        loop={true}
        autoplay={true}
      >
        <SwiperSlide className='h-[180px] w-[180px] aspect-square  lg:w-[100px]'>
          <img
            className='h-full w-full aspect-square'
            src={process.env.PUBLIC_URL + "/collection_2.png"}
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide className='h-[180px] w-[180px] aspect-square  lg:w-[100px]'>
          <img
            className='h-full w-full aspect-square'
            src={process.env.PUBLIC_URL + "/collection_3.png"}
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide className='h-[180px] w-[180px] aspect-square  lg:w-[100px]'>
          <img
            className='h-full w-full aspect-square'
            src={process.env.PUBLIC_URL + "/collection_2.png"}
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide className='h-[180px] w-[180px] aspect-square  lg:w-[100px]'>
          <img
            className='h-full w-full aspect-square'
            src={process.env.PUBLIC_URL + "/collection_3.png"}
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide className='h-[180px] w-[180px] aspect-square  lg:w-[100px]'>
          <img
            className='h-full w-full aspect-square'
            src={process.env.PUBLIC_URL + "/collection_2.png"}
            alt=''
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Collections;
