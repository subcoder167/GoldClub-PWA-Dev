import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DisplayPrice from "../Utils/DisplayPrice";
import MessageModal from "../Modals/MessageModal";
import { openMessage } from "../../redux/actions/client";
const ProductCard = ({ product }) => {
  const [favorite, setFavorite] = useState(product?.node?.isFavorite || false);
  const messageOpen = useSelector((state) => state?.client?.messageOpen);
  const [logged, setLogged] = useState(
    localStorage.getItem(`vjw-${window.location.hostname}user`)
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className='flex flex-col items-stretch justify-start w-[45%] md:w-[30%] lg:w-1/6 min-h-10 shadow-md rounded-md sm:p-2 lg:p-2 border-2 lg:scale-95 mb-2 lg:shadow-none'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='w-full p-2'
        >
          <div className='productCardTop w-full flex  items-center justify-between'>
            {product?.node?.tags ? (
              <h4
                className={
                  "productTag  py-1 px-2 text-white bg-[#E5B02A] rounded-md text-xs " +
                  product?.node?.tags?.toLowerCase()
                }
              >
                {product?.node?.tags?.toUpperCase()}
              </h4>
            ) : (
              <div></div>
            )}
            <motion.div
              className='favourite justify-self-end'
              whileTap={{
                scale: 1.3,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={(e) => {
                logged && setFavorite(!favorite);
                !logged && dispatch(openMessage());
              }}
            >
              {favorite ? (
                <AiFillHeart color='red' size={21} />
              ) : (
                <AiOutlineHeart size={21} />
              )}
            </motion.div>
          </div>
          <Link
            to={"/app/products/" + product?.node?.id}
            className='productImage flex items-center justify-center '
          >
            {/* {product?.node?.thumbnail?.url &&  */}
              <img
                src={
                  product?.node?.thumbnail?.url 
                  ||  process.env.PUBLIC_URL + "/no-image.jpg"
                }
                alt={product?.node?.name}
              />
            {/* } */}
            
            
          </Link>
          <Link
            to={"/app/products/" + product?.node?.id}
            className='productDetails flex flex-col w-full md:items-center md:justify-center items-start justify-start mt-4 px-2'
          >
            <h4 className='font-bold text-md w-full h-8 whitespace-nowrap overflow-hidden text-ellipsis'>
              {product?.node?.name}
            </h4>
            {/* <h6 className="text-gray-600 line-through">
              <DisplayPrice
              price={
                product?.node?.oldPrice !== product?.node?.newPrice &&
                product?.node?.oldPrice
              }
            />
            </h6> */}
            <h3 className='text-md font-bold'>
              {/* <DisplayPrice
                price={
                  product?.node?.pricing?.priceRange?.start?.net?.amount || 0
                }
              /> */}
              Click to see price.
            </h3>
          </Link>
        </motion.div>
      </div>
      {messageOpen && (
        <MessageModal message='You must be logged in to add favourites' />
      )}
    </>
  );
};

export default ProductCard;
