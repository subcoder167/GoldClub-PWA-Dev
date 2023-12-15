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
import { useParams } from "react-router-dom";
const CollectionProductList = () => {
  const search = useSelector((state) => state.client.homeSearchOpen);
  const list = useSelector((state) => state.graph);
  const [localList, setLocalList] = useState([]);
  const [localproduct, setLocalproduct] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const openFilterWrapper = () => {
    dispatch(openFilter());
  };
  useEffect(() => {
    setLocalList(
      list.essentials.filter((essential) => essential.node.id == params.id)[0]
    );
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLocalproduct(localList?.node?.products?.edges);
    console.log(JSON.stringify(localproduct));
  }, [localList]);
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
        <h4 className='font-bold text-xl'>{localList?.node?.name}</h4>
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
      <section className='productCardWrapper w-full px-0 justify-evenly gap-y-1 flex items-stretch  flex-wrap md:w-[95%] md:px-[2.5%] md:justify-around md:gap-4 '>
        {localproduct?.map((product) => (
          <ProductCard product={product} />
        ))}
      </section>
    </section>
  );
};

export default CollectionProductList;
