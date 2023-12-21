// import React, { useEffect } from "react";
// import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/pagination";

// const ProductCarousel = (props) => {
//   useEffect(() => {
//     console.log("Carousel", props);
//   }, []);
//   return (
//     <section className='w-full overflow-hidden my-4'>
//       <Swiper
//         // install Swiper modules
//         modules={[Navigation, Pagination, Scrollbar, Autoplay]}
//         spaceBetween={8}
//         slidesPerView={1}
//         // navigation
//         pagination={{ clickable: true }}
//         className='w-screen lg:w-full homeslider px-4 rounded-md lg:h-[70vh] '
//         loop={true}
//         autoplay={true}
//       >
//         {props?.images &&
//           props?.images?.map((image) => (
//             <SwiperSlide
//               className=' w-auto rounded-md '
//               style={{ minHeight: "300px" }}
//             >
//               <img
//                 className='h-full w-[95%] rounded-md'
//                 src={
//                   image?.url ||
//                   "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//                 }
//                 alt={image?.alt || "product image"}
//               />
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </section>
//   );
// };

// export default ProductCarousel;

import React, { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const ProductCarousel = (props) => {
  useEffect(() => {
    console.log("Carousel", props);
  }, []);

  return (
    <section className='w-full overflow-hidden my-4'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='w-screen lg:w-full homeslider px-4 rounded-md lg:h-[70vh] '
        loop={true}
        autoplay={true}
      >
        {props?.images?.length ? (
          props.images.map((image) => (
            <SwiperSlide
              className='w-auto rounded-md'
              style={{ minHeight: "300px" }}
              key={image.id} // Add a unique key for each slide
            >
              <img
                className='h-full w-[95%] rounded-md'
                src={image.url || "alternate-image-url.jpg"}
                alt={image.alt || "product image"}
              />
            </SwiperSlide>
          ))
        ) : (
          // Display alternate image when there are no images
          <SwiperSlide className='w-auto rounded-md' style={{ minHeight: "300px" }}>
            <img
              className='h-full w-[95%] rounded-md'
              src={process.env.PUBLIC_URL + "/no-image.jpg"}
              alt="alternate image"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;

