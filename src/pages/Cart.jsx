import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  decrementQuantity,
  deleteFromCart,
} from "../redux/actions/cart";

import DisplayPrice from "../components/Utils/DisplayPrice";
import Empty from "../components/FallBacks/Empty";
import { useLazyQuery } from "@apollo/client";
import { CHECKOUT_PRODUCT_VARIANTS } from "../Graphql/Query";
import Loader from "../components/Loader/Loader";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(
    product?.pricing?.priceRange?.stop?.net?.amount ||
      product?.pricing?.price?.net?.amount ||
      0
  );
  return (
    <section className='flex flex-col shadow-sm mb-2 pb-4'>
      <div className='flex items-stretch justify-between hover:bg-gray-100  w-full py-5 px-4'>
        <div className='flex w-2/5'>
          <div className='w-1/2'>
            <img
              className='h-auto w-full aspect-square object-fit'
              src={product?.thumbnail?.url || product?.images[0]?.url}
              alt=''
            />
          </div>
          <div className='flex flex-col justify-between ml-4 flex-grow'>
            <span className='font-bold text-md'>{product?.name}</span>
          </div>
        </div>

        <span className='text-center w-1/5 font-semibold text-sm'>
          <DisplayPrice price={price} />
        </span>
        <span className='text-center w-1/5 font-semibold text-sm'>
          <DisplayPrice
            price={parseFloat(
              parseFloat(product?.quantity) * parseFloat(price)
            )}
          />
        </span>
      </div>
      <div className='flex w-full items-center justify-between px-4'>
        <div className='flex  items-center gap-2 justify-start w-1/5'>
          <button
            className='text-md px-2 py-1 bg-black text-white rounded-sm'
            onClick={() => dispatch(addToCart(product))}
          >
            +
          </button>

          <h3 className='font-bold text-md'>{product?.quantity}</h3>

          <button
            className='text-md px-2 py-1 bg-black text-white rounded-sm'
            onClick={() => dispatch(decrementQuantity(product))}
          >
            -
          </button>
        </div>
        <span
          className='text-red-700 text-md  mt-3 font-bold flex items-center gap-1'
          onClick={() => dispatch(deleteFromCart(product))}
        >
          <FaTrash /> Remove
        </span>
      </div>
    </section>
  );
};
const Cart = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [taxedPrice, settaxedPrice] = useState(0);
  const cart = useSelector((state) => state.cart);
  const discountAmt = useSelector((state) => state?.cart?.discount);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [createCheckout, createdCheckout] = useLazyQuery(
    CHECKOUT_PRODUCT_VARIANTS,
    {
      variables: {
        ids: cart?.cart?.map((cart) => cart?.id),
      },
      onCompleted: (data) => {
        console.log(data);
        navigate("/app/checkout");
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < cart?.cart?.length; i++) {
      settotalPrice(0);
      price +=
        parseInt(cart?.cart[i]?.quantity) *
        parseFloat(
          cart?.cart[i]?.pricing?.priceRange?.start?.net?.amount ||
            cart?.cart[i]?.pricing?.price?.net?.amount
        );

      settotalPrice(price.toFixed(2));
      settaxedPrice((price + price * 0.18).toFixed(2));
    }
  }, [cart?.cart]);
  const handleCheckout = () => {
    createCheckout();
  };
  return (
    <>
      {cart?.cart?.length == 0 ? (
        <Empty variant='cart' />
      ) : (
        <>
          <div className='container mx-auto mt-10 w-full'>
            <div className='w-full lg:w-[98%] flex flex-wrap shadow-md my-10 '>
              <div className=' bg-white  py-10 w-full lg:w-3/4'>
                <div className='flex justify-between items-center border-b pb-8 px-4'>
                  <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
                  <h2 className='font-semibold text-md'>
                    {cart?.cart?.length} Items
                  </h2>
                </div>
                <div className='flex mt-10 mb-5 px-4 justify-between'>
                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                    Product Details
                  </h3>

                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
                    Price
                  </h3>
                  <h3 className='font-semibold text-gray-600 text-xs uppercase w-1/5 text-center'>
                    Total
                  </h3>
                </div>
                {cart?.cart?.map((product) => (
                  <CartItem product={product} />
                ))}
                <Link
                  to='/app/products'
                  className='flex font-semibold text-indigo-600 text-sm mt-10 px-4'
                >
                  <svg
                    className='fill-current mr-2 text-indigo-600 w-4'
                    viewBox='0 0 448 512'
                  >
                    <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              <div id='summary' className=' px-8 py-10 w-full lg:w-1/4'>
                <h1 className='font-semibold text-2xl border-b pb-8'>
                  Order Summary
                </h1>
                <div className='flex justify-between mt-10 mb-5'>
                  <span className='font-semibold text-sm uppercase'>
                    Items {cart?.cart?.length}
                  </span>
                  <span className='font-semibold text-sm'>
                    <DisplayPrice price={totalPrice} />
                  </span>
                </div>
                {/* <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - $10.00</option>
                  </select>
                </div> */}

                <div className='flex justify-between mt-10 mb-5'>
                  <span className='font-semibold text-sm uppercase'>GST</span>
                  <span className='font-light text-sm'>18%</span>
                </div>

                <div className='py-10'>
                  <label
                    for='promo'
                    className='font-semibold inline-block mb-3 text-sm uppercase'
                  >
                    Promo Code
                  </label>
                  <input
                    type='text'
                    id='promo'
                    placeholder='Enter your code'
                    className='p-2 text-sm w-full'
                  />
                </div>
                <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>
                  Apply
                </button>
                <div className='border-t mt-8'>
                  <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                    <span>Total cost</span>
                    <span>
                      <DisplayPrice price={taxedPrice} />
                    </span>
                  </div>
                  <button
                    className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full flex items-center justify-center gap-x-2'
                    onClick={handleCheckout}
                  >
                    {createdCheckout?.loading && <Loader variant='white' />}
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
