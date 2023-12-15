import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileSelect from "../Input/ProfileSelect";
import ProfileInput from "../Input/ProfileInput";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_SHOP } from "../../Graphql/Query";
import { fetchCountries } from "../../redux/actions/graph";
import { AiOutlineSave } from "react-icons/ai";

const AddressInput = (props) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state?.graph?.countries);
  const [address, setAddress] = useState(props?.address || null);

  // const [getShop, shop] = useLazyQuery(GET_SHOP, {
  //   onCompleted: (data) => {
  //     dispatch(fetchCountries(data?.shop?.countries));
  //   },
  //   onError: (e) => {
  //     alert(e);
  //   },
  // });

  // useEffect(() => {
  //   if (!countries || countries?.length == 0) getShop();
  //   if (params?.address) {
  //     setAddress(JSON.parse(params?.address));
  //   }
  // }, []);
  useEffect(() => {
    setAddress({ ...address, country: "IN" });
  }, []);
  return (
    <section className='profileWrapper flex flex-col items-center justify-start py-4 w-full fixed backdrop-blur-md bg-gray-100/60 h-screen z-[9999999999] top-0 '>
      <div className='profileTop flex flex-col items-center h-[80vh] justify-between w-[90%] overflow-scroll  mb-4'>
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className='w-full mx-auto'
        >
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-xl font-black uppercase my-3'> Address</h1>
            <button
              className='inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-md text-lg items-center justify-center'
              onClick={props?.closeModal}
            >
              Close
            </button>
          </div>
          <div className='flex flex-col'>
            <ProfileInput
              name='First Name'
              edit={false}
              details={address?.firstName}
              placeholder='Enter First Name'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  firstName: e.target.value,
                })
              }
            />
            <ProfileInput
              name='Last Name'
              edit={false}
              details={address?.lastName}
              placeholder='Enter Last Name'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  lastName: e.target.value,
                })
              }
            />
            <ProfileInput
              name='Company Name'
              edit={false}
              details={address?.companyName}
              placeholder='Enter Company Name'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  companyName: e.target.value,
                })
              }
            />
            <ProfileInput
              name='street Address 1'
              edit={false}
              details={address?.streetAddress1}
              placeholder='Enter Street Address 1'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  streetAddress1: e.target.value,
                })
              }
            />
            <ProfileInput
              name='street Address 2'
              edit={false}
              details={address?.streetAddress2}
              placeholder='Enter Street Address 2'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  streetAddress2: e.target.value,
                })
              }
            />
            <ProfileInput
              name='city'
              edit={false}
              details={address?.city}
              placeholder='Enter City'
              handleChange={(e) =>
                setAddress({
                  ...address,

                  city: e.target.value,
                })
              }
            />
            <ProfileInput
              name='Landmark'
              edit={false}
              details={address?.cityArea}
              placeholder='Enter Landmark'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  cityArea: e.target.value,
                })
              }
            />
            <ProfileInput
              name='postal Code'
              edit={false}
              details={address?.postalCode}
              placeholder='Enter postal code'
              max={6}
              handleChange={(e) =>
                setAddress({
                  ...address,
                  postalCode: e.target.value,
                })
              }
            />

            <ProfileSelect
              name='country'
              edit={false}
              details={address?.country}
              placeholder='Enter country'
              handleChange={(e) => {
                setAddress({
                  ...address,
                  country: e.target.value,
                });
              }}
              // options={countries.map(country=>{ return {}})}
              options={[
                { code: "None", label: "None" },
                { code: "IN", label: "India" },
              ]}
            />
            <ProfileInput
              name='state'
              edit={false}
              details={address?.countryArea}
              placeholder='Enter State'
              handleChange={(e) =>
                setAddress({
                  ...address,
                  countryArea: e.target.value,
                })
              }
            />
          </div>
        </motion.div>
      </div>

      <button
        className='inline-flex text-white bg-[#007bff] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-md text-lg items-center justify-center'
        onClick={() => props?.saveAddress(address)}
      >
        <AiOutlineSave />
        &nbsp; Save
      </button>
    </section>
  );
};

export default AddressInput;
