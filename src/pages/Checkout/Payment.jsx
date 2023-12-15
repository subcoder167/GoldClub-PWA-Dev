import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DisplayPrice from "../../components/Utils/DisplayPrice";
import { useMutation } from "@apollo/client";
import {
  COMPLETE_CHECKOUT,
  CREATE_CHECKOUT_PAYMENT,
} from "../../Graphql/Mutations";
import Loader from "../../components/Loader/Loader";
import Confirmation from "./Confirmation";
import { DeleteCheckout, emptyCart } from "../../redux/actions/cart";

const Payment = () => {
  const params = useParams();
  const checkout = useSelector((state) => state?.cart?.checkout);
  const [selectedGateway, setSelectedGateway] = useState(
    checkout?.availablePaymentGateways[0]?.id
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [createCheckoutPayment, createdCheckoutPayment] = useMutation(
    CREATE_CHECKOUT_PAYMENT,
    {
      variables: {
        checkoutId: checkout?.id,
        paymentInput: {
          amount: checkout?.totalPrice?.net?.amount,
          billingAddress: {
            city: checkout?.billingAddress?.city,
            companyName: checkout?.billingAddress?.companyName,
            country: checkout?.billingAddress?.country?.code || "IN",
            countryArea: checkout?.billingAddress?.countryArea,
            firstName: checkout?.billingAddress?.firstName,
            lastName: checkout?.billingAddress?.lastName,
            phone: checkout?.billingAddress?.phone,
            postalCode: checkout?.billingAddress?.postalCode,
            streetAddress1: checkout?.billingAddress?.streetAddress1,
            streetAddress2: checkout?.billingAddress?.streetAddress2,
          },
          gateway: selectedGateway,
          returnUrl: "http://localhost:3000/checkout/payment-confirm",
          token: "not-charged",
        },
      },
      onCompleted: (data) => {
        data?.checkoutPaymentCreate?.errors &&
          console.log(data?.checkoutPaymentCreate?.errors);
        if (
          data?.checkoutPaymentCreate?.errors?.length == 0 &&
          data?.checkoutPaymentCreate?.checkout &&
          data?.checkoutPaymentCreate?.payment
        )
          completeCheckout();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const [completeCheckout, completedCheckout] = useMutation(COMPLETE_CHECKOUT, {
    variables: {
      checkoutId: checkout?.id,
      paymentData: JSON.stringify({
        amount:
          createdCheckoutPayment?.data?.checkoutPaymentCreate?.payment
            ?.totalPrice?.net?.amount,
        billingAddress: {
          city: checkout?.billingAddress?.city,
          companyName: checkout?.billingAddress?.companyName,
          country: checkout?.billingAddress?.country?.code || "IN",
          countryArea: checkout?.billingAddress?.countryArea,
          firstName: checkout?.billingAddress?.firstName,
          lastName: checkout?.billingAddress?.lastName,
          phone: checkout?.billingAddress?.phone,
          postalCode: checkout?.billingAddress?.postalCode,
          streetAddress1: checkout?.billingAddress?.streetAddress1,
          streetAddress2: checkout?.billingAddress?.streetAddress2,
        },
        gateway:
          createdCheckoutPayment?.data?.checkoutPaymentCreate?.payment?.gateway,
        returnUrl: "http://localhost:3000/checkout/payment-confirm",
        token: "not-charged",
      }),

      redirectUrl: "http://localhost:3000/checkout/payment-confirm",
    },
    onCompleted: (data) => {
      sessionStorage.removeItem(`vjw-${window.location.hostname}breakDown`);
      if (
        data?.checkoutComplete?.errors?.length == 0 &&
        data?.checkoutComplete?.order
      ) {
        setConfirmationOpen(true);
        let tempOrders = JSON.parse(
          localStorage.getItem(`vjw-${window.location.origin}-orders`)
        );
        if (tempOrders) {
          tempOrders = [...tempOrders, data?.checkoutComplete?.order];
        } else {
          tempOrders = [data?.checkoutComplete?.order];
        }
        localStorage.setItem(
          `vjw-${window.location.origin}-orders`,
          JSON.stringify(tempOrders)
        );

        dispatch(emptyCart());
        dispatch(DeleteCheckout());
        setTimeout(() => {
          navigate("/app/my-orders");
        }, 1000);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleCheckout = () => {
    // if (checkout?.billingAddress)
    createCheckoutPayment();
  };

  const breakDownData = JSON.parse(sessionStorage.getItem(`vjw-${window.location.hostname}breakDown`));

  useEffect(() => {
    if (!checkout) navigate("/app/cart");
  }, []);
  return (
    <section className='productDetailsWrapper flex-col  flex items-center justify-center w-full'>
      {/* <div className='flex justify-between items-center border-b pb-8 px-4 w-full'>
        <h1 className='font-semibold text-2xl'>Available Shipping Methods</h1>
      </div>
      <section className='flex flex-col items-center w-full px-2 py-4 gap-y-4 mb-6 border-2 border-transparent border-b-gray-600/20'>
        {checkout?.availableShippingMethods?.length == 0 && (
          <h2 className='text-md font-bold'>No Methods available</h2>
        )}
        {checkout?.availableShippingMethods?.length > 0 &&
          checkout?.availableShippingMethods?.map((method) => (
            <div>{method?.id}</div>
          ))}
      </section> */}
      <div className='flex justify-between items-center border-b pb-8 px-4 w-full'>
        <h1 className='font-semibold text-2xl'>Amount to Pay</h1>
      </div>
      {breakDownData && breakDownData.map((breakDown) => (
    <div className='flex flex-col items-center w-full px-2 py-4 gap-y-4 mb-6 border-2 border-transparent border-b-gray-600/20 '>
      <div className='w-full flex flex-col shadow-md mt-4'>
        {Object.entries(
          JSON.parse(
            breakDown?.value
              .replace(/'/g, '"')
              .replace(/(\w+)\s*:/g, '"$1":')
          )
        ).map((temp) => (
          <div className='flex items-center justify-between border-b-2 py-3 px-4'>
            <span className='font-bold'>{temp[0]}</span>
            <span className='font-bold'>
              <DisplayPrice price={parseFloat(temp[1]).toFixed(2)} />
            </span>
          </div>
        ))}
      </div>
    </div>
  ))}

      {/* <div className='flex justify-between items-center border-b pb-8 px-4 w-full'>
        <h1 className='font-semibold text-2xl'>Select a Payment Gateway</h1>
      </div> */}
      {/* <section className='flex flex-col items-center w-full px-2 py-4 gap-y-4 mb-6 border-2 border-transparent border-b-gray-600/20'>
        {checkout?.availablePaymentGateways?.length !== 0 && (
          <h2 className='text-md font-bold'>No Methods available</h2>
        )}
        <div className='paymentGatewatDiv flex flex-col w-full items-start justify-start p-3'>
          {checkout?.availablePaymentGateways?.length > 0 &&
            checkout?.availablePaymentGateways?.map((method, idx) => (
              <>
                <div className='radio-button'>
                  <input
                    type='radio'
                    className='radio-button__input'
                    id={method?.id}
                    value={method?.id}
                    name='paymentGateway'
                    checked={method?.id === selectedGateway}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedGateway(e.target.value);
                    }}
                  />
                  <label className='radio-button__label' for={method?.id}>
                    <span className='radio-button__custom'></span>
                    {method?.name}
                  </label>
                </div>
              </>
            ))}
        </div>
      </section> */}
      <div className='w-11/12'>
        <button
          className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white text-center uppercase w-full flex items-center justify-center gap-x-2'
          onClick={handleCheckout}
        >
          {(createdCheckoutPayment?.loading || completedCheckout?.loading) && (
            <Loader variant='white' />
          )}
          {/* {completedCheckout?.data?.checkoutComplete} */}
          Place Order
        </button>
      </div>
      {confirmationOpen && (
        <Confirmation handleEvent={() => setConfirmationOpen(false)} />
      )}
    </section>
  );
};

export default Payment;
