import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import { Link } from "react-router-dom";
const AddressDiv = ({ address }) => {
  return (
    <section className='flex items-center justify-between mb-8 lg:ml-8 w-full lg:w-1/2'>
      <div className='storeLeft flex items-center justify-start'>
        <IoLocationOutline size={32} />
        <div className='addressDetails ml-4'>
          <h4 className='font-bold text-2xl'>{address?.companyName}</h4>
          <p className='text-md mt-1 '>
            {address?.streetAddress1},{address?.streetAddress2}
          </p>
          <p className='text-md mt-1 '>{address?.countryArea}</p>
          <p className='text-md mt-1'>{address?.postalCode}</p>
          <p className='text-xl mt-2 bold'>{address?.phone}</p>
        </div>
      </div>
      <div className='storeRight'>
        <Link
          to={`https://www.google.com/maps?q=${address?.latitude},${
            address?.longitude
          }&z=${19}`}
          target='_blank'
          className='bg-slate-50 rounded-full flex p-2 font-bold shadow-md'
        >
          <MdLocationSearching />
        </Link>
      </div>
    </section>
  );
};
const StoreAddress = () => {
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem(`vjw-${window.location.hostname}address`))
  );
  // const uniqueIdsSet = new Set();
  return (
    <section className='flex flex-col items-start justify-start mt-4 w-full'>
      <h4 className='font-bold text-2xl px-[35px]'>Store Locations</h4>
      <div className='storeAddressWrapper mt-4 w-full'>
      {addresses?.map((address, idx) => (
        ((!address.isDefaultShippingAddress) && (!address.isDefaultBillingAddress)) &&
          <AddressDiv address={address} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default StoreAddress;
