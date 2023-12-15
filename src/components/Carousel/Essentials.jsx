import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import TitleSm from "../Headings/TitleSm";
import { useLazyQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../../Graphql/Query";
import { useDispatch } from "react-redux";
import { setEssentials } from "../../redux/actions/graph";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Messages/ErrorMessage";
const Essentials = () => {
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [essentials, setEssential] = useState([]);
  const dispatch = useDispatch();
  const [getCollections, { loading }] = useLazyQuery(GET_COLLECTIONS, {
    onCompleted: (data) => {
      console.log("COLLECTIONS IS", data);
      setEssential(data?.collections?.edges);
    },
    onError: (err) => {
      setError({ error: true, message: err.message });
    },
  });

  useEffect(() => {
    getCollections();
  }, []);
  useEffect(() => {
    dispatch(setEssentials(essentials));
  }, [essentials]);
  return (
    <section className='w-full overflow-hidden my-4'>
      <div className='px-[35px] py-4'>
        <TitleSm title='Collections' />
      </div>
      {loading && <Loader />}
      {!loading && error?.error && <ErrorMessage error={error?.message} />}
      <Swiper
        // install Swiper modules
        modules={[Autoplay]}
        // spaceBetween={2}
        // navigation
        // pagination={{ clickable: true }}
        className='w-[90vw] homeslider px-4'
        loop={true}
        loopedSlides={true}
        // centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
      >
        {!loading &&
          essentials?.map((essential, idx) => (
            <SwiperSlide className='h-auto w-fit' key={idx}>
              <Link
                to={"/app/products?collections=" + essential?.node?.id}
                className='flex flex-col items-center justify-center'
              >
                <img
                  className='h-3/4 w-3/4 aspect-square rounded-full'
                  src={
                    essential?.node?.backgroundImage.url ||
                    process.env.PUBLIC_URL + "/collection_2.png"
                  }
                  alt=''
                />
                <h2 className='font-bold'>{essential?.node?.name}&nbsp;</h2>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Essentials;
