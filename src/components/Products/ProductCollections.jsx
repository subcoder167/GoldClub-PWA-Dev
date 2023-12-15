import React, { useState } from "react";
import ProductCardList from "../../pages/Products/ProductCard";
import ProductCard from "./ProductCard";

import { Link } from "react-router-dom";
const ProductCollections = (props) => {
  // const [products, setproducts] = useState();
  return (
    <section className='flex flex-col items-center my-4 w-full '>
      <section className='productCollectionTop flex items-center justify-between w-full px-6 mb-4'>
        <h4 className='font-bold text-xl'>
          {props?.category}{" "}
          <span className='text-md'>({props?.products?.length})</span>
        </h4>
        <Link
          to={"/app/products?collections=" + props?.link}
          className='font-normal text-md'
        >
          See More
        </Link>
      </section>
      <section className='productCardWrapper w-full mx-auto px-0 justify-evenly gap-y-1 flex items-stretch  flex-wrap md:w-[95%] md:px-[2.5%] md:justify-start  '>
        {props?.products?.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </section>
    </section>
  );
};

export default ProductCollections;
