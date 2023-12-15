import React from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const ImageCarousel = (props) => {
  return (
    <section className='w-full overflow-hidden my-4'>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        className='w-screen lg:w-full homeslider px-4'
        loop={true}
        autoplay={true}
      >
        {props?.images &&
          props?.images?.map((image, idx) => (
            <SwiperSlide className='h-[180px] lg:h-[500px] w-auto ' key={idx}>
              <img
                className='h-full w-full lg:h-[500px] object-cover object-top '
                src={image?.image}
                alt=''
              />
            </SwiperSlide>
          ))}
        {!props?.images && (
          <>
            <SwiperSlide className='h-[180px] lg:h-[500px] w-auto '>
              <img
                className='h-full w-full lg:h-[500px] object-cover object-top '
                src={
                  "https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/AppBanner/FSblog/Desktop_1920x694.webp"
                }
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='h-[180px] lg:h-[500px] w-auto '>
              <img
                className='h-full w-full lg:h-[500px] object-cover object-top '
                src={
                  "https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/AppBanner/Firstsalary/02/Desktop_1920x694.webp"
                }
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='h-[180px] lg:h-[500px] w-auto '>
              <img
                className='h-full w-full lg:h-[500px] object-cover object-top '
                src={process.env.PUBLIC_URL + "/collection_1.png"}
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='h-[180px] lg:h-[500px] w-auto '>
              <img
                className='h-full w-full lg:h-[500px] object-cover object-top '
                src={process.env.PUBLIC_URL + "/collection_1.png"}
                alt=''
              />
            </SwiperSlide>
            <SwiperSlide className='h-[180px] lg:h-[500px] w-auto '>
              <img
                className='h-full w-full lg:h-[500px] object-cover object-top '
                src={process.env.PUBLIC_URL + "/collection_1.png"}
                alt=''
              />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </section>
  );
};

export default ImageCarousel;
