import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa";

import Search from "../components/Search/Search";
import Categories from "../components/Carousel/Categories";
import ProductCard from "../components/Products/ProductCard"
import Marquee from "../components/MetalPrices/Marquee";
import Banner from "../components/Banner/Banner";
import ImageCarousel from "../components/Carousel/ImageCarousel";
import Collections from "../components/Carousel/Collections";
import Essentials from "../components/Carousel/Essentials";
import Faq from "../components/Faq/Faq";
import Testimonials from "../components/Carousel/Testimonials";
import { Link } from "react-router-dom";
import StoreAddress from "../components/Address/StoreAddress";
import StoreCarousel from "../components/Carousel/StoreCarousel";

import DisplayPrice from "../components/Utils/DisplayPrice";
import CurrencyPrefix from "../components/Utils/CurrencyPrefix";
import { useLazyQuery } from "@apollo/client";
import {
  GET_BANNERS,
  GET_FEATURED_PRODUCTS,
  GET_PRODUCT_LIST,
  GET_PUBLIC_DETAILS,
  GET_SHOP,
  GET_STORE_DETAILS,
  GET_ALL_PRODUCTS_FILTERED
} from "../Graphql/Query";
import Loader from "../components/Loader/Loader";
import { metalRates } from "../constants/filter";
import { generateMCXRates } from "../functions";
import {
  fetchCountries,
  fetchStoreDetails,
  fetchUserDetails,
} from "../redux/actions/graph";
import { useSearchParams } from "react-router-dom";
import ProductList from "./Products/ProductList";

const Prices = () => {
  // let data = [
  //   { name: "Gold", price: "5,400/gm" },
  //   { name: "Silver", price: "2,700/gm" },
  //   { name: "Diamond", price: "999/kt" },
  // ];
  
  const dispatch = useDispatch();
  const [getStoreDetails, storeDeet] = useLazyQuery(GET_STORE_DETAILS, {
    variables: {
      // domain: {
      // domain: "ssjewellery.goldclub.co",
      domain:
        // process.env.NODE_ENV == "development"
        //   ? "ssjewellery.goldclub.co"
          // :
           window.location.hostname,
      // },
    },

    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      dispatch(fetchStoreDetails(data?.storeDetails));
      if (data?.storeDetails) {
        localStorage.setItem(
          `vjw-${window.location.hostname}rates`,
          JSON.stringify(data?.storeDetails?.metalRates)
        );
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    getStoreDetails();
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <section className='flex items-center  text-white'>
      {storeDeet?.loading && <Loader variant={"white"} />}
      {!storeDeet?.loading &&
        storeDeet?.data?.storeDetails?.metalRates &&
        Object.entries(generateMCXRates(storeDeet?.data?.storeDetails?.metalRates)).map(
          (item) =>
            item[0]?.includes("Rate") &&
            !item[0]?.includes("diamond") &&
            item[1] !== 0 && (
              <div className='mx-2' key={item[0]}>
                <span>{capitalizeFirstLetter(item[0]?.split("Rate")[0])}: </span>
                <span>
                  <CurrencyPrefix />
                  {item[1].toFixed(2)}/- {/* Round off to 2 decimal places */}
                </span>
              </div>
            )
        )
      }

      {!storeDeet?.loading && storeDeet?.error && (
        <>Something Went Wrong! Please Reload</>
      )}
    </section>
  );
};
const Home = () => {
  const search = useSelector((state) => state.client.homeSearchOpen);
  const [banner, setBanner] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const dispatch = useDispatch();
  // const search = useSelector((state) => state.client.homeSearchOpen);
  const attributeList = useSelector((state) => state?.graph?.attributes);
  const [localproduct, setLocalproduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [localList, setLocalList] = useState([]);
  const [getAllProducts, allProducts] = useLazyQuery(
    GET_ALL_PRODUCTS_FILTERED,
    {
      variables: {
        // filter: {
        //   isPublished: true,
        //   collections: "",
        //   categories: "",
        //   hasCategory: "",
        //   attributes: [""],

        //   productType: "",

        //   price: "",
        //   minimalPrice: "",
        //   productTypes: "",
        //   ids: "",
        // },
        filter: {
          search: searchParams.get("search") || null,
          categories: searchParams.get("categories") || null,
          collections: searchParams.get("collections") || null,
          productType: searchParams.get("productType") || null,
          attributes: searchParams.get("gender")
            ? [
                {
                  slug: "gender",
                  values: [searchParams.get("gender")],
                },
              ]
            : null,
        },
        sort: { direction: "DESC", field: "PUBLICATION_DATE" },
      },
      onCompleted: (data) => {
        setLocalList(data?.products?.edges);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  useEffect(() => {
    let entireList = attributeList?.map((attr) => attr?.values)?.flat();

    if (entireList?.length > 0) {
      getAllProducts({
        variables: {
          filter: {
            search: searchParams.get("search") || null,
            categories: searchParams.get("categories") || null,
            collections: searchParams.get("collections") || null,
            productType: searchParams.get("productType") || null,
            attributes: attributeList,
          },
          sort: { direction: "DESC", field: "PUBLICATION_DATE" },
        },
      });
    } else getAllProducts();
  }, [attributeList]);
  const [currentUser, setCurrentUser] = useState(() => {
    if (localStorage.getItem(`vjw-${window.location.hostname}user-det`))
      return JSON.parse(
        localStorage.getItem(`vjw-${window.location.hostname}user-det`)
      )?.firstName;
    return "Guest";
  });

  const [getBanners, { banner_loading }] = useLazyQuery(GET_BANNERS, {
    variables: {
      domain:
        // process.env.NODE_ENV == "development"
        //   ? "ssjewellery.goldclub.co"
        //   :
           window.location.hostname,
    },
    onCompleted: (data) => {
      setBanner(data?.publishedBannerDetails);
    },
    onError: (err) => {
      setError({ error: true, message: err.message });
    },
  });
  const [getShop, shop] = useLazyQuery(GET_SHOP, {
    onCompleted: (data) => {
      dispatch(fetchCountries(data?.shop?.countries));
    },
    onError: (e) => {
      error(e);
    },
  });
  const [getProfile, profileDet] = useLazyQuery(GET_PUBLIC_DETAILS, {
    onCompleted: (data) => {
      let tempObj = JSON.parse(
        localStorage.getItem(`vjw-${window.location.hostname}user-det`)
      );
      localStorage.setItem(
        `vjw-${window.location.hostname}user-det`,
        JSON.stringify(tempObj)
      );
    },
    onError: (e) => {
      if (!localStorage.getItem(`vjw-${window.location.hostname}user-det`));
    },
  });
  const [getProductList, productList] = useLazyQuery(GET_PRODUCT_LIST, {
    onCompleted: (data) => {
      console.log("ProductList", data);
    },
  });

  useEffect(() => {
    setError({ error: false, message: "" });
    getBanners();
    // getShop();
    getProfile();
    getProductList();
  }, []);
  return (
    <>
      <section className='w-full bg-black py-3 relative metalPricesDiv flex items-center justify-center '>
        <Marquee>
          <Prices />
        </Marquee>
      </section>
      <section className='w-full px-[10px] my-4 '>
        {search && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <Search />
          </motion.div>
        )}
        <section className='welcomeBanner font-bold w-full flex items-center justify-between my-2 lg:px-[20px]'>
          <span>Welcome, {currentUser}!</span>
          <Link to='/app/profile' className='p-3'>
            <FaAngleRight />
          </Link>
        </section>
      </section>

      <section className='w-full px-[10px] my-8 lg:px-[20px]'>
        <Categories />
      </section>
      {/* <section className='w-full px-[10px] my-8 flex items-center justify-center'>
        <>
          <Banner
            title='Gold Savings Plan'
            description='Get 10% Discount Everytime'
            link=''
          />
        </>
      </section> */}
      {banner_loading && <Loader />}
      {!banner_loading && banner && <ImageCarousel images={banner} />}

      {/* MODERN CARDS */}

      {/* <section className='w-full px-[10px] my-8 lg:px-[100px]'>
        <section className='flex items-center justify-center flex-wrap gap-3 md:gap-2'>
          {Array(4)
            .fill(0)
            .map((item, idx) => (
              <section
                className='w-[45%] h-20 relative rounded-lg overflow-hidden flex items-center px-3 md:w-1/5 md:h-[100px] lg:h-[150px]'
                key={idx}
              >
                <img
                  alt=''
                  src={process.env.PUBLIC_URL + "/image 2.png"}
                  className='h-fit w-full object-contain absolute top-0 left-0'
                />
              </section>
            ))}
        </section>
      </section>*/}

      {/* <Collections />  */}

      <Essentials />
      {/* <section className='w-full px-[10px] my-8 lg:px-[100px]'>
      </section> */}
      <section className='productCardWrapper w-full px-3 justify-start gap-4 flex items-stretch  flex-wrap md:w-[95%] md:px-[2.5%]  md:gap-4  '>
        {allProducts?.loading && <Loader />}
        {!allProducts?.loading && localList?.length == 0 && (
          <h2 className='text-md text-red-600 font-bold '>
            No Products found!
          </h2>
        )}
        {!allProducts?.loading &&
          localList?.map((product) => (
            <ProductCard product={product} key={product?.node?.id} />
          ))}
        {/* {!allProducts?.loading && (
          <button className='py-3 px-16 border-2 border-[#000531] text-[#000531]  text-lg font-bold rounded-md hover:bg-[#000531] hover:text-white'>
            {allProducts?.loading && <Loader />} Load More
          </button>
        )} */}
      </section>
      <section className='w-full px-[10px] my-8 lg:px-[100px]'>
        <Faq />
      </section>
      {/* <section className='w-full px-[10px] my-8 lg:px-[100px]'>
        <Testimonials />
      </section> */}
      {/* <section className='w-full  my-8 lg:px-[100px]'>
        <StoreCarousel />
      </section> */}
      <section className='w-full px-[10px] my-8 lg:px-[100px]'>
        <StoreAddress />
      </section>
    </>
  );
};

export default Home;
