import React, { useState } from "react";

import { useEffect } from "react";
import Empty from "../components/FallBacks/Empty";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS, GET_USER_CHECKOUT_DETAILS } from "../Graphql/Query";
import SectionTitle from "../components/Headings/SectionTitle";
import DisplayPrice from "../components/Utils/DisplayPrice";
import Loader from "../components/Loader/Loader";
import { AiOutlineReload } from "react-icons/ai";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [getOrderDetails, orderDetails] = useLazyQuery(GET_ALL_ORDERS, {
    onCompleted: (data) => {
      console.log(data?.me?.orders?.edges[0]);
      if (data?.me?.orders) {
        setOrders(data?.me?.orders?.edges);
      }
    },
    onError: (e) => {
      console.log(e);
      setErrMsg(e.message);
    },
  });
  useEffect(() => {
    getOrderDetails();
    setErrMsg(null);
  }, []);
  return (
    <section>
      <div className='flex justify-between items-center border-b pb-8 px-6 w-full'>
        <h1 className='font-semibold text-2xl p-3'>My Orders</h1>
        <button
          className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
          onClick={getOrderDetails}
        >
          <AiOutlineReload />
        </button>
      </div>
      {orders && orders?.length == 0 && <Empty variant='orders' />}
      {orderDetails?.loading && <Loader />}
      {orders?.length > 0 && (
        <div className='w-full flex flex-wrap items-start justify-start my-3 p-3 px-6 gap-4'>
          {orders?.map((order) => (
            <>
              <section className='w-11/12 lg:w-[30%] flex flex-col items-start justify-start shadow-lg rounded-md bg-white border-[1px] border-black py-3 px-4'>
                <div className='w-full flex flex-wrap items-start justify-between border-b '>
                  <div className='inline-block  w-1/2'>
                    <p className='font-bold '>Timestamp.</p>
                    <span className='my-2 inline-block'>
                      {order?.node?.created?.split("T")[0]}
                    </span>
                  </div>
                  <div className='inline-block w-1/2'>
                    <p className='font-bold'>Status</p>
                    <span
                      className={
                        " my-2 inline-block border-2 rounded-md p-2 font-bold " +
                        (order?.node?.status == "UNFULFILLED"
                          ? "bg-red-100 text-red-600 "
                          : " bg-gray-100 text-gray-600")
                      }
                    >
                      {order?.node?.status}
                    </span>
                  </div>
                </div>
                <div className='w-full flex flex-wrap items-center justify-between border-b '>
                  <div className='inline-block  w-full'>
                    <p className='font-bold '>Billed To.</p>
                    <div className='flex flex-col my-2'>
                      <p className=' inline-block'>
                        {order?.node?.billingAddress?.firstName +
                          " " +
                          order?.node?.billingAddress?.lastName}
                      </p>
                      <p className='inline-block'>
                        {order?.node?.billingAddress?.companyName}
                      </p>
                      <p className='inline-block'>
                        {order?.node?.billingAddress?.phone}
                      </p>
                      <p className='inline-block'>
                        {order?.node?.billingAddress?.streetAddress1},
                      </p>
                      <p className='inline-block'>
                        {order?.node?.billingAddress?.streetAddress2},{" "}
                        {order?.node?.billingAddress?.city}
                      </p>
                      <p className='inline-block'>
                        {order?.node?.billingAddress?.countryArea}-{" "}
                        {order?.node?.billingAddress?.postalCode}
                      </p>
                    </div>
                  </div>
                  {/* <div className='inline-block w-1/2'>
                  <p className='font-bold'>Status</p>
                  <span
                    className={
                      " my-2 inline-block border-2 rounded-md p-2 font-bold " +
                      (order?.node?.status == "UNFULFILLED"
                        ? "bg-red-100 text-red-600 "
                        : " bg-gray-100 text-gray-600")
                    }
                  >
                    {order?.node?.status}
                  </span>
                </div> */}
                </div>
                <div className='w-full flex flex-wrap items-center justify-between border-b '>
                  <div className='inline-block  w-full'>
                    <p className='font-bold '>Products.</p>
                    <div className='flex flex-col my-2 gap-y-4'>
                      {order?.node?.lines?.map((line) => (
                        <section>
                          <div className='flex'>
                            <strong className=' inline-block w-2/4'>
                              Name:
                            </strong>
                            <p className=' inline-block w-2/4'>
                              {line.productName}
                            </p>
                          </div>
                          <div className='flex'>
                            <strong className=' inline-block w-2/4'>
                              Quantity:
                            </strong>
                            <p className=' inline-block w-2/4'>
                              {line.quantity}
                            </p>
                          </div>
                          <div className='flex'>
                            <strong className=' inline-block w-2/4'>
                              Size:
                            </strong>
                            <p className=' inline-block w-2/4'>
                              {line.variantName?.split("/")[0]}
                            </p>
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                  {/* <div className='inline-block w-1/2'>
                  <p className='font-bold'>Status</p>
                  <span
                    className={
                      " my-2 inline-block border-2 rounded-md p-2 font-bold " +
                      (order?.node?.status == "UNFULFILLED"
                        ? "bg-red-100 text-red-600 "
                        : " bg-gray-100 text-gray-600")
                    }
                  >
                    {order?.node?.status}
                  </span>
                </div> */}
                </div>

                {/* <div className='w-full flex flex-wrap items-center justify-between border-b '>
                <div className='inline-block w-1/2'>
                  <p className='font-bold '>Total </p>
                  <span className='my-2 inline-block font-bold'>
                    <DisplayPrice price={order?.total?.net?.amount} />
                  </span>
                </div>
                <div className='inline-block w-1/2'>
                  <p className='font-bold'>Status</p>
                  <span
                    className={
                      " my-2 inline-block border-2 rounded-md p-2 font-bold " +
                      (order?.paymentStatus == "NOT_CHARGED"
                        ? "bg-red-100 text-red-600 "
                        : " bg-gray-100 text-gray-600")
                    }
                  >
                    {order?.paymentStatusDisplay}
                  </span>
                </div>
              </div> */}
              </section>
            </>
          ))}
        </div>
      )}
      <span className='text-red-500 font-bold'>{errMsg}</span>
    </section>
  );
};

export default Orders;
