import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Testimonials = () => {
  return (
    <section className="testimonialSection w-full relative lg:w-3/4 mx-auto">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        // centeredSlides={true}
        navigation={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        className="w-[90vw] testimoinalslider lg:w-full"
      >
        <SwiperSlide className="h-max w-[100%]">
          <section className="testimonial flex flex-col items-center justify-center">
            <FaUserCircle size={32} />
            <article className="testimonialsContent flex flex-col items-center justify-center my-6">
              <p className="w-10/12 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                voluptatem!
              </p>
            </article>
            <cite className="mb-10">-Anon</cite>
          </section>
        </SwiperSlide>
        <SwiperSlide className=" h-max w-[100%]">
          <section className="testimonial flex flex-col items-center justify-center">
            <FaUserCircle size={32} />
            <article className="testimonialsContent flex flex-col items-center justify-center my-6">
              <p className="w-10/12 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                voluptatem!
              </p>
            </article>
            <cite className="mb-10">-Vjw</cite>
          </section>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Testimonials;
