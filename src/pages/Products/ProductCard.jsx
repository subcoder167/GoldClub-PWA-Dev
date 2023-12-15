import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  GET_ALL_CATEGORIES,
  GET_COLLECTIONS,
  GET_FEATURED_PRODUCTS_LIST,
} from "../../Graphql/Query";
import SectionTitle from "../../components/Headings/SectionTitle";
import ProductCollections from "../../components/Products/ProductCollections";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const ProductCardList = () => {
  const [getFeaturedProducts, featuredProducts] = useLazyQuery(
    GET_FEATURED_PRODUCTS_LIST,
    {
      onCompleted: (data) => {
        console.log("Featured Products", data);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );
  const [getCollections, collections] = useLazyQuery(GET_COLLECTIONS, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  // const []
  useEffect(() => {
    getFeaturedProducts();
    getCollections();

    window.scrollTo(0, 0);
  }, []);
  return (
    <section className='flex flex-col items-center justify-start gap-y-2'>
      <center>
        <h2 className='font-bold text-3xl'>All Products</h2>
      </center>
      {featuredProducts?.loading ? (
        <Loader />
      ) : (
        featuredProducts?.data?.shop?.homepageCollection?.products?.edges
          .length &&
        Array(featuredProducts?.data?.shop?.homepageCollection).map(
          (collection) => (
            <ProductCollections
              category={
                collections?.data?.collections?.edges?.filter(
                  (edge) => edge?.node?.id === collection?.id
                )[0]?.node?.name
              }
              link={collection?.id}
              products={collection?.products?.edges}
            />
          )
        )
      )}
      {!featuredProducts?.data?.shop?.homepageCollection?.products?.edges
        .length && <span>No featured products found</span>}
      {/* <ProductCollections category='Ring' link='Q2F0ZWdvcnk6MQ==' />
      <ProductCollections category='Necklace' link='Q2F0ZWdvcnk6Nw==' /> */}
      <center className='my-4'>
        <Link
          to='/app/products'
          className='py-3 px-16 border-2 border-[#000531] text-[#000531]  text-lg font-bold rounded-md hover:bg-[#000531] hover:text-white'
        >
          See All
        </Link>
      </center>
    </section>
  );
};

export default ProductCardList;
