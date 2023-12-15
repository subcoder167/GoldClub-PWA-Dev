import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddressInput from "../../components/Address/AddressInput";
import DisplayPrice from "../../components/Utils/DisplayPrice";
import Loader from "../../components/Loader/Loader";
import { useMutation } from "@apollo/client";
import {
  CREATE_ADDRESS,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT_BILLING_ADDRESS,
} from "../../Graphql/Mutations";
import {
  createCheckoutAction,
  updateCheckoutBillingAddress,
  updateCheckoutShippingAddress,
} from "../../redux/actions/cart";
const AddressInputContent = (props) => {
  return (
    <div className='addressContentWrapper flex items-center gap-x-2 '>
      <strong className='w-1/2'> {props?.label} :</strong>{" "}
      <span className='w-1/2'>{props?.detail}</span>
    </div>
  );
};
const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const checkout = useSelector((state) => state?.cart?.checkout);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [address, setAddress] = useState(() => {
    if (localStorage.getItem(`vjw-${window.location.hostname}user-det`))
      return {
        defaultBillingAddress: JSON.parse(
          localStorage.getItem(`vjw-${window.location.hostname}user-det`)
        )?.defaultBillingAddress,
        defaultShippingAddress: JSON.parse(
          localStorage.getItem(`vjw-${window.location.hostname}user-det`)
        )?.defaultShippingAddress,
      };
    else
      return {
        defaultBillingAddress: null,
        defaultShippingAddress: null,
      };
  });
  const [currentAddress, setCurrentAddress] = useState({
    type: null,
    address: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createCheckout, createdCheckout] = useMutation(CREATE_CHECKOUT, {
    variables: {
      checkoutInput: {
        phoneNumber: JSON.parse(
          localStorage.getItem(`vjw-${window.location.hostname}user-det`)
        )?.phoneNumber,
        lines: cart?.cart?.map((item) => {
          return { quantity: item?.quantity, variantId: item?.id };
        }),
        shippingAddress: {
          city: address?.defaultShippingAddress?.city,
          companyName: address?.defaultShippingAddress?.companyName,
          country: "IN",
          countryArea: address?.defaultShippingAddress?.countryArea,
          firstName: address?.defaultShippingAddress?.firstName,
          lastName: address?.defaultShippingAddress?.lastName,
          phone: address?.defaultShippingAddress?.phoneNumber,
          postalCode: address?.defaultShippingAddress?.postalCode,
          streetAddress1: address?.defaultShippingAddress?.streetAddress1,
          streetAddress2: address?.defaultShippingAddress?.streetAddress1,
        },
      },
    },
    onCompleted: (data) => {
      console.log(data);
      if (data?.checkoutCreate?.errors?.length > 0)
        alert(
          data?.checkoutCreate?.errors[0]?.field +
            " " +
            data?.checkoutCreate?.errors[0]?.message
        );
      else if (data?.checkoutCreate?.checkout) {
        dispatch(createCheckoutAction(data?.checkoutCreate?.checkout));
        let tempCheckout = data?.checkoutCreate?.checkout;
        sessionStorage.setItem(
          `vjw-${window.location.hostname}breakDown`,
          JSON.stringify(data?.checkoutCreate?.checkout?.metadata)
        );
        if (
          data?.checkoutCreate?.checkout?.id &&
          !data.checkoutCreate.checkout.billingAddress
        ) {
          updateCheckoutBillingAddress(address.defaultBillingAddress);
          updateBilling({
            variables: {
              billingAddress: {
                city: address?.defaultBillingAddress?.city,
                companyName: address?.defaultBillingAddress?.companyName,
                country: "IN",
                countryArea: address?.defaultBillingAddress?.countryArea,
                firstName: address?.defaultBillingAddress?.firstName,
                lastName: address?.defaultBillingAddress?.lastName,
                phone: address?.defaultBillingAddress?.phone,
                postalCode: address?.defaultBillingAddress?.postalCode,
                streetAddress1: address?.defaultBillingAddress?.streetAddress1,
                streetAddress2: address?.defaultBillingAddress?.streetAddress2,
              },
              checkoutId: data?.checkoutCreate.checkout.id,
            },
          });
          setProceed(true);
        }
        if (
          data?.checkoutCreate?.checkout?.id &&
          data.checkoutCreate.checkout.billingAddress
        ) {
          setProceed(true);
        }
        if (!tempCheckout.shippingAddress) {
          dispatch(
            updateCheckoutShippingAddress(address?.defaultShippingAddress)
          );
          setProceed(true);
        }
        setProceed &&
          setTimeout(() => {
            navigate(data?.checkoutCreate.checkout.id);
          }, 200);
      }
    },
    onError: (e) => {
      setProceed(false);
      console.log(e);
    },
  });
  const [updateBilling, updatedBillingAddress] = useMutation(
    UPDATE_CHECKOUT_BILLING_ADDRESS,
    {
      onCompleted: (data) => {
        if (data?.checkoutCreate?.errors?.length == 0) {
          dispatch(createCheckoutAction(data?.checkoutCreate?.checkout));
          setTimeout(() => {
            navigate(createdCheckout?.data?.checkoutCreate.checkout.id);
          }, 200);
        }
      },
      onError: (err) => {
        setProceed(false);
        alert(err.message);
      },
    }
  );
  // const [createShippingAddress, createdShippingAddress] = useMutation(
  //   CREATE_ADDRESS,
  //   {
  //     variables: {
  //       input: {
  //         city: address?.defaultShippingAddress?.city,
  //         companyName: address?.defaultShippingAddress?.companyName,
  //         country: "IN",
  //         countryArea: address?.defaultShippingAddress?.countryArea,
  //         firstName: address?.defaultShippingAddress?.firstName,
  //         lastName: address?.defaultShippingAddress?.lastName,
  //         phone: address?.defaultShippingAddress?.phone,
  //         postalCode: address?.defaultShippingAddress?.postalCode,
  //         streetAddress1: address?.defaultShippingAddress?.streetAddress1,
  //         streetAddress2: address?.defaultShippingAddress?.streetAddress2,
  //       },
  //     },
  //     onCompleted: (data) => {
  //       setProceed(true);
  //       console.log(data);
  //     },
  //     onError: (err) => {
  //       setProceed(false);
  //       console.log(err);
  //     },
  //   }
  // );
  const handleAddressSave = (e, type) => {
    console.log(e, type);
    if (type === "defaultBillingAddress") {
      setAddress({
        ...address,
        defaultBillingAddress: e,
      });
    } else if (type === "defaultShippingAddress") {
      setAddress({
        ...address,
        defaultShippingAddress: e,
      });
    }
  };

  const handleCheckout = () => {
    setProceed(false);
    if (address?.defaultShippingAddress) createCheckout();
    else {
      setCurrentAddress({
        type: "defaultShippingAddress",
        address: address?.defaultShippingAddress,
      });
      setAddressModalOpen(true);
    }
  };

  useEffect(() => {
    if (cart?.cart?.length == 0) {
      navigate("/app/cart");
    }
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     setProceed(false);
  //     if (
  //       createdCheckout?.data &&
  //       createdCheckout?.data?.checkoutCreate?.checkout?.billingAddress
  //     ) {
  //       await updateBilling({
  //         variables: {
  //           billingAddress: {
  //             city: address?.defaultBillingAddress?.city,
  //             companyName: address?.defaultBillingAddress?.companyName,
  //             country: "IN",
  //             countryArea: address?.defaultBillingAddress?.countryArea,
  //             firstName: address?.defaultBillingAddress?.firstName,
  //             lastName: address?.defaultBillingAddress?.lastName,
  //             phone: address?.defaultBillingAddress?.phone,
  //             postalCode: address?.defaultBillingAddress?.postalCode,
  //             streetAddress1: address?.defaultBillingAddress?.streetAddress1,
  //             streetAddress2: address?.defaultBillingAddress?.streetAddress2,
  //           },
  //           checkoutId: createdCheckout?.data?.checkoutCreate.checkout.id,
  //         },
  //       });
  //       console.log(
  //         "Current ID is: ",
  //         createdCheckout?.data?.checkoutCreate.checkout.id
  //       );
  //     }
  //     // if (
  //     //   createdCheckout?.data &&
  //     //   createdCheckout?.data?.checkoutCreate?.checkout?.shippingAddress == null
  //     // ) {
  //     //   await createShippingAddress();
  //     // }

  //     proceed &&
  //       setTimeout(() => {
  //         navigate(createdCheckout?.data?.checkoutCreate.checkout.id);
  //       }, 200);
  //   })();
  // }, [createdCheckout?.data?.checkoutCreate?.checkout?.id]);
  return (
    <section className='productDetailsWrapper flex-col  flex items-center justify-center w-full'>
      <div className='flex justify-between items-center border-b pb-8 px-4 w-full'>
        <h1 className='font-semibold text-2xl'>Products</h1>
        <h2 className='font-semibold text-md'>{cart?.cart?.length} Items</h2>
      </div>
      <div className='flex flex-col items-center w-full px-2 py-4 gap-y-4 mb-6 border-2 border-transparent border-b-gray-600/20'>
        {cart?.cart?.map((item) => (
          <>
            <div className='flex flex-col w-11/12 py-2 border-2 border-transparent border-b-gray-600/40 '>
              <div className='flex items-center gap-x-2'>
                <img
                  src={item?.thumbnail?.url}
                  alt=''
                  className='w-20 h-auto'
                />
                <div className='flex flex-col'>
                  <strong className='w-full break-all'>
                    {item?.name?.split("/")[0]}
                    <br />
                    {
                      item?.attributes?.find(
                        (attr) => attr?.attribute?.name == "Size"
                      )?.values[0]?.value
                    }
                  </strong>
                  <div className='flex flex-col items-start justify-start my-2 '>
                    <span>
                      <strong>Quantity:</strong>
                      {item?.quantity}
                    </span>
                    <span>
                      <strong>Total Price:</strong>
                      <DisplayPrice
                        price={parseFloat(
                          item?.quantity * item?.breakDown?.finalPrice
                        )?.toFixed(2)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className='flex justify-between items-center border-b pb-8 px-4 w-full'>
        <h1 className='font-semibold text-2xl'>Address</h1>
      </div>
      <section className='addressWrapper w-11/12 mx-auto'>
        <span className='text-gray-500 uppercase font-bold mr-1 py-2'>
          Default Billing Address
        </span>
        <div className='addressContentWrapper bg-gray-100 p-2 rounded-md my-2'>
          <AddressInputContent
            label='First Name'
            detail={address?.defaultBillingAddress?.firstName}
          />
          <AddressInputContent
            label='Last Name'
            detail={address?.defaultBillingAddress?.lastName}
          />
          <AddressInputContent
            label='Company Name'
            detail={address?.defaultBillingAddress?.companyName}
          />
          <AddressInputContent
            label='Street Address 1'
            detail={address?.defaultBillingAddress?.streetAddress1}
          />
          <AddressInputContent
            label='Street Address 2'
            detail={address?.defaultBillingAddress?.streetAddress2}
          />
          <AddressInputContent
            label='City'
            detail={address?.defaultBillingAddress?.city}
          />
          <AddressInputContent label='Country' detail={"India"} />
          <AddressInputContent
            label='State'
            detail={address?.defaultBillingAddress?.countryArea}
          />
          <AddressInputContent
            label='PostalCode'
            detail={address?.defaultBillingAddress?.postalCode}
          />
          <span
            onClick={() => {
              setCurrentAddress({
                type: "defaultBillingAddress",
                address: address?.defaultBillingAddress,
              });
              setAddressModalOpen(true);
            }}
            className='text-blue-500 font-black text-md'
          >
            Edit{" "}
          </span>
        </div>
      </section>
      <section className='addressWrapper w-11/12 mx-auto'>
        <span className='text-gray-500 uppercase font-bold mr-1 py-2'>
          Default Shipping Address
        </span>
        <div className='addressContentWrapper bg-gray-100 p-2 rounded-md my-2'>
          <AddressInputContent
            label='First Name'
            detail={address?.defaultShippingAddress?.firstName}
          />
          <AddressInputContent
            label='Last Name'
            detail={address?.defaultShippingAddress?.lastName}
          />
          <AddressInputContent
            label='Company Name'
            detail={address?.defaultShippingAddress?.companyName}
          />
          <AddressInputContent
            label='Street Address 1'
            detail={address?.defaultShippingAddress?.streetAddress1}
          />
          <AddressInputContent
            label='Street Address 2'
            detail={address?.defaultShippingAddress?.streetAddress2}
          />
          <AddressInputContent
            label='City'
            detail={address?.defaultShippingAddress?.city}
          />
          <AddressInputContent label='Country' detail={"India"} />
          <AddressInputContent
            label='State'
            detail={address?.defaultShippingAddress?.countryArea}
          />
          <AddressInputContent
            label='PostalCode'
            detail={address?.defaultShippingAddress?.postalCode}
          />

          <span
            onClick={() => {
              setCurrentAddress({
                type: "defaultShippingAddress",
                address: address?.defaultShippingAddress,
              });
              setAddressModalOpen(true);
            }}
            className='text-blue-500 font-black text-md'
          >
            Edit{" "}
          </span>
        </div>
      </section>
      <div className='w-11/12'>
        <button
          className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white text-center uppercase w-full flex items-center justify-center gap-x-2'
          onClick={handleCheckout}
        >
          {createdCheckout?.loading && <Loader variant='white' />}
          Proceed to payment
        </button>
      </div>
      {addressModalOpen && (
        <AddressInput
          closeModal={(e) => {
            setAddressModalOpen(false);
            setCurrentAddress({ type: null, address: null });
          }}
          address={currentAddress?.address}
          saveAddress={(e) => {
            handleAddressSave(e, currentAddress?.type);
            setAddressModalOpen(false);
            setCurrentAddress({ type: null, address: null });
          }}
        />
      )}
    </section>
  );
};

export default Checkout;
