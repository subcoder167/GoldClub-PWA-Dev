import React, { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import Categories from "../../components/Carousel/Categories";
import SectionTitle from "../../components/Headings/SectionTitle";
import { TbFilter } from "react-icons/tb";
import ProductCardList from "./ProductCard";
import ProductCard from "../../components/Products/ProductCard";
import { openFilter } from "../../redux/actions/client";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { products } from "../../constants/filter";
import { useLazyQuery } from "@apollo/client";
import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FILTERED,
} from "../../Graphql/Query";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
const ProductList = () => {
  const search = useSelector((state) => state.client.homeSearchOpen);
  const attributeList = useSelector((state) => state?.graph?.attributes);
  const [searchParams, setSearchParams] = useSearchParams();
  const [after, setAfter] = useState(null);
  const [localList, setLocalList] = useState([]);
  const [localproduct, setLocalproduct] = useState([]);
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
  const dispatch = useDispatch();
  const openFilterWrapper = () => {
    dispatch(openFilter());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProducts();
  }, []);
  useEffect(() => {
    getAllProducts();
  }, [searchParams]);
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

  return (
    <section className='w-full flex flex-col  justify-center '>
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
      </section>

      <div className='categories px-[20px]'>
        <SectionTitle title='Categories' />
        <Categories />
      </div>
      <section className='productCollectionTop flex items-center justify-between w-full my-4 px-[20px]'>
        <h4 className='font-bold text-xl'>Products</h4>
        <motion.div
          className='font-normal text-md'
          onClick={openFilterWrapper}
          whileTap={{
            scale: 0.83,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <TbFilter size={30} />
        </motion.div>
      </section>
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
    </section>
  );
};

export default ProductList;
