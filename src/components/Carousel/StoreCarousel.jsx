import React from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import TitleSm from "../Headings/TitleSm";
import ImageCarousel from "./ImageCarousel";
const StoreGallery = () => {
  return (
    <section className="w-full overflow-hidden my-4">
      <div className="px-[35px] py-4">
        <h4 className="text-2xl font-bold">Our Store</h4>
      </div>
      <ImageCarousel />
    </section>
  );
};

export default StoreGallery;
