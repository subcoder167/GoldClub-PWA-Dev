
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../Graphql/Query";
import ErrorMessage from "../Messages/ErrorMessage";
import Loader from "../Loader/Loader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const CategoryDiv = (props) => {
  return (
    <Link
      to={"/app/products?categories=" + props?.id}
      className="flex flex-col items-center justify-center min-w-[60px] w-auto"
      id={props && props?.id}
    >
      <img
        src={
          (props && props?.image?.url) ||
          "https://images.pexels.com/photos/12753886/pexels-photo-12753886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt={props && props?.name}
        className="w-[60px] h-[60px] object-cover aspect-square rounded-full select-none"
      />
      <h6 className="text-sm font-bold mt-1 text-center ">
        {props && props?.name}
      </h6>
    </Link>
  );
};
const Categories = () => {
  const [categories, setCategories] = useState(null);

  const [shop, setShop] = useState(null);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });

  const [getAllProducts, { loading }] = useLazyQuery(GET_ALL_CATEGORIES, {
    variables: {
      after: null,
    },
    onCompleted: (data) => {
      // console?.log(data);
      setCategories(data && data?.categories?.edges);
      setShop(data && data?.shop);
      setSuccess({ success: true, message: "Catgories fetched successfully" });
      console.log(data)
    },
    onError: (err) => {
      setError({ error: true, message: err?.message });
    },
  });

  useEffect(() => {
    getAllProducts();
    
  }, []);

  const filteredCategories = categories?.filter(
    (category) => category?.node?.level !== 1 || category?.node?.products?.totalCount !== 0
  );
  
  return (
    <section className="w-full">
      <div className="categoriesWrapper flex overflow-scroll mt-4 no-scrollbar items-start">
        {loading && <Loader />}
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          // spaceBetween={2}
          // navigation
          // pagination={{ clickable: true }}
          className="w-full homeslider px-4"
          // centeredSlides={true}

          breakpoints={{
            320: {
              slidesPerView: 5,
              spaceBetween: 40,
            },

            800: {
              slidesPerView: 9,
              spaceBetween: 30,
            },

            1000: {
              slidesPerView: 15,
              spaceBetween: 40,
            },
          }}
        >
          {!loading &&
            filteredCategories &&
            filteredCategories?.map((category, idx) => (
              (category?.node?.products?.totalCount !== 0) && (
                <SwiperSlide className="h-auto w-auto " key={idx}>
                  <CategoryDiv
                    id={category && category?.node?.id}
                    name={category && category?.node?.name}
                    image={category && category?.node?.backgroundImage}
                  />
                </SwiperSlide>
              )
            ))}
        </Swiper>
      </div>
      {error && error?.error && <ErrorMessage error={error?.message} />}
    </section>
  );
};

export default Categories;