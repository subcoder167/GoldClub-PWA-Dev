import React, { useState, memo, useEffect } from "react";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import ProfileInput from "../components/Input/ProfileInput";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../Graphql/Mutations";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/Messages/ErrorMessage";
import SuccessMessage from "../components/Messages/SuccessMessage";
import { useDispatch, useSelector } from "react-redux";
import { GET_PUBLIC_DETAILS, GET_SHOP } from "../Graphql/Query";
import { fetchCountries } from "../redux/actions/graph";
import { Link } from "react-router-dom";
import AddressInput from "../components/Address/AddressInput";
const AddressInputContent = (props) => {
  return (
    <div className='addressContentWrapper flex items-center gap-x-2 '>
      <strong className='w-1/2'> {props?.label} :</strong>{" "}
      <span className='w-1/2'>{props?.detail}</span>
    </div>
  );
};
const Profile = () => {
  const [profile, setProfile] = useState(() => {
    if (localStorage.getItem(`vjw-${window.location.hostname}user-det`))
      return JSON.parse(
        localStorage.getItem(`vjw-${window.location.hostname}user-det`)
      );
  });
  const [edit, setEdit] = useState(true);
  const [profileDetails, setProfileDetails] = useState(null);
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [error, setError] = useState({ error: false, message: "" });
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    type: null,
    address: null,
  });
  const countries = useSelector((state) => state?.graph?.countries);
  const dispatch = useDispatch();
  const [getShop, shop] = useLazyQuery(GET_SHOP, {
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      dispatch(fetchCountries(data?.shop?.countries));
    },
    onError: (e) => {
      error(e);
    },
  });
  const handleSubmit = () => {
    !edit && handleProfileUpload();
    edit && setEdit(!edit);
    console.log(profileDetails);
  };
  // const [getProfile, profileDet] = useLazyQuery(GET_PUBLIC_DETAILS, {
  //   onCompleted: (data) => {
  //     console.log("me is :", data);
  //     // let tempObj = JSON.parse(localStorage.getItem(`vjw-${window.location.hostname}user-det`));
  //     // localStorage.setItem(`vjw-${window.location.hostname}user-det`, JSON.stringify(tempObj));
  //     // setProfileDetails(data?.me);
  //   },
  //   onError: (e) => {
  //     alert(e.message);
  //   },
  // });
  const handleProfileUpload = () => {
    setError({ error: false, message: "" });

    if (!profileDetails?.firstName) {
      setError({ error: true, message: "first name not available" });
      return;
    }
    if (!profileDetails?.lastName) {
      setError({ error: true, message: "last not available" });
      return;
    }

    if (!profile?.phoneNumber) {
      setError({ error: true, message: "phone number not available" });
      return;
    }

    if (!profileDetails?.birthDate) {
      setError({ error: true, message: "birth date not available" });
      return;
    }
    if (!profileDetails?.anniversaryDate) {
      setError({ error: true, message: "anniversary not available" });
      return;
    }

    if (
      !profileDetails?.defaultBillingAddress?.streetAddress1 ||
      !profileDetails?.defaultBillingAddress?.streetAddress2 ||
      !profileDetails?.defaultBillingAddress?.city ||
      !profileDetails?.defaultBillingAddress?.cityArea ||
      !profileDetails?.defaultBillingAddress?.postalCode ||
      !profileDetails?.defaultBillingAddress?.countryArea
    ) {
      setError({ error: true, message: "incomplete address provided" });
      return;
    }
    setEdit(!edit);
    updateProfile();
  };
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    variables: {
      id: profileDetails?.id,
      firstName: profileDetails?.firstName,
      lastName: profileDetails?.lastName,
      isActive: true,
      phoneNumber: profile?.phoneNumber,
      email: profileDetails?.email || `goldclub${profileDetails?.id}@gmail.com`,
      companyName: profileDetails?.companyName || " ",
      brandName: profileDetails?.brandName || "ABCD",
      streetAddress1:
        profileDetails?.defaultBillingAddress?.streetAddress1 || " ",
      streetAddress2:
        profileDetails?.defaultBillingAddress?.streetAddress2 || " ",
      birthDate: profileDetails?.birthDate || " ",
      anniversaryDate: profileDetails?.anniversaryDate || " ",
      city: profileDetails?.defaultBillingAddress?.city || " ",
      cityArea: profileDetails?.defaultBillingAddress?.cityArea || " ",
      postalCode: profileDetails?.defaultBillingAddress?.postalCode || " ",
      country: profileDetails?.defaultBillingAddress?.country?.code || "IN",
      countryArea: profileDetails?.defaultBillingAddress?.countryArea || " ",
    },
    onCompleted: (data) => {
      console.log(data);
      if (data?.customerUpdate?.accountErrors.length > 0)
        setError({
          error: true,
          message: data?.customerUpdate?.accountErrors[0]?.message,
        });
      if (data?.customerUpdate?.user) {
        localStorage.setItem(
          `vjw-${window.location.hostname}user-det`,
          JSON.stringify(data?.customerUpdate?.user)
        );
        setSuccess({ success: true, message: "Profile updated successfully" });
        setError({ error: false, message: "" });
      }
    },
    onError: (error) => {
      console.log(error);
      setError({ error: true, message: "Profile could not be updated" });
      setProfileDetails(profile);
    },
  });

  const handleAddressSave = (e, type) => {
    if (type === "defaultBillingAddress") {
      if (
        !profileDetails?.defaultShippingAddress?.streetAddress1 &&
        !profileDetails?.defaultShippingAddress?.streetAddress2 &&
        !profileDetails?.defaultShippingAddress?.city &&
        !profileDetails?.defaultShippingAddress?.cityArea &&
        !profileDetails?.defaultShippingAddress?.postalCode &&
        !profileDetails?.defaultShippingAddress?.countryArea
      ) {
        setProfileDetails({
          ...profileDetails,
          defaultShippingAddress: e,
          defaultBillingAddress: e,
        });
      } else
        setProfileDetails({
          ...profileDetails,
          defaultBillingAddress: e,
        });
    } else if (type === "defaultShippingAddress") {
      setProfileDetails({
        ...profileDetails,
        defaultShippingAddress: e,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccess({ success: false, message: "" });
      setError({ error: false, message: "" });
    }, 5000);
  }, [success]);

  useEffect(() => {
    setProfileDetails(profile);
    // if (countries?.length == 0) {
    //   getShop();
    // }
  }, []);
  useEffect(() => {
    console.log(profileDetails);
  }, [profileDetails]);
  return (
    <section className='profileWrapper flex flex-col items-center justify-center py-4 w-full'>
      <div className='profileTop flex items-center justify-between w-[90%] lg:w-3/4 mb-4'>
        <h1 className='text-xl font-black uppercase my-3'> Profile</h1>
        <button
          className='inline-flex text-white bg-[#007bff] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-md text-lg items-center justify-center'
          onClick={handleSubmit}
        >
          {loading && <Loader variant={"white"} />}
          {!loading && edit && (
            <>
              <AiOutlineEdit />
              &nbsp; Edit
            </>
          )}
          {!loading && !edit && (
            <>
              <AiOutlineSave />
              &nbsp; Save
            </>
          )}
        </button>
      </div>
      {!profileDetails ? (
        <Loader />
      ) : (
        <>
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
          <div className='profileImageWrapper  w-[90%] lg:w-3/4 flex items-center justify-center rounded-t-3xl relative '>
            <div className='profileImage h-24 w-2h-24 rounded-full bg-gray-200 grid place-items-center border-black '>
              <img
                src={
                  "https://avatars.dicebear.com/api/open-peeps/aplha" +
                  profile?.firstName +
                  "4_1.svg"
                }
                alt={profile?.firstName}
                className='h-24 w-2h-24 rounded-full'
              />
            </div>
          </div>
          {profileDetails && (
            <form
              className='profileInputWrapper  w-[90%] lg:w-3/4'
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {error?.error && <ErrorMessage error={error.message} />}
              {success?.success && <SuccessMessage success={success.message} />}
              <ProfileInput
                name='First Name'
                edit={edit}
                details={profileDetails?.firstName}
                placeholder='First Name'
                handleChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    firstName: e.target.value,
                  })
                }
              />
              <ProfileInput
                name='Last Name'
                edit={edit}
                details={profileDetails?.lastName}
                placeholder='Last Name'
                handleChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    lastName: e.target.value,
                  })
                }
              />
              {/* <ProfileInput
                name='Email'
                edit={edit}
                details={profileDetails?.email}
                placeholder='Enter your Email'
                handleChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    email: e.target.value,
                  })
                }
              /> */}
              <ProfileInput
                name='Company Name'
                edit={edit}
                details={profileDetails?.defaultBillingAddress?.companyName}
                placeholder='Enter Company Name'
                handleChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    brandName: e.target.value,
                    defaultBillingAddress: {
                      ...profileDetails?.defaultBillingAddress,
                      companyName: e.target.value,
                    },
                  })
                }
              />
              <ProfileInput
                name='Phone Number'
                edit={edit}
                details={profile?.phoneNumber}
                placeholder='Phone Number'
                disabled
              />
              <section className='addressWrapper w-full'>
                <span className='text-gray-500 uppercase font-bold mr-1 py-2'>
                  Default Billing Address
                </span>
                <div className='addressContentWrapper bg-gray-100 p-2 rounded-md my-2'>
                  <AddressInputContent
                    label='First Name'
                    detail={profileDetails?.defaultBillingAddress?.firstName}
                  />
                  <AddressInputContent
                    label='Last Name'
                    detail={profileDetails?.defaultBillingAddress?.lastName}
                  />
                  <AddressInputContent
                    label='Company Name'
                    detail={profileDetails?.defaultBillingAddress?.companyName}
                  />
                  <AddressInputContent
                    label='Street Address 1'
                    detail={
                      profileDetails?.defaultBillingAddress?.streetAddress1
                    }
                  />
                  <AddressInputContent
                    label='Street Address 2'
                    detail={
                      profileDetails?.defaultBillingAddress?.streetAddress2
                    }
                  />
                  <AddressInputContent
                    label='City'
                    detail={profileDetails?.defaultBillingAddress?.city}
                  />
                  <AddressInputContent label='Country' detail='INDIA' />
                  <AddressInputContent
                    label='State'
                    detail={profileDetails?.defaultBillingAddress?.countryArea}
                  />
                  {!edit && (
                    <span
                      onClick={() => {
                        setCurrentAddress({
                          type: "defaultBillingAddress",
                          address: profileDetails?.defaultBillingAddress,
                        });
                        setAddressModalOpen(true);
                      }}
                      className='text-blue-500 font-black text-md'
                    >
                      Edit{" "}
                    </span>
                  )}
                </div>
              </section>
              <section className='addressWrapper w-full'>
                <span className='text-gray-500 uppercase font-bold mr-1 py-2'>
                  Default Shipping Address
                </span>
                <div className='addressContentWrapper bg-gray-100 p-2 rounded-md my-2'>
                  <AddressInputContent
                    label='First Name'
                    detail={profileDetails?.defaultShippingAddress?.firstName}
                  />
                  <AddressInputContent
                    label='Last Name'
                    detail={profileDetails?.defaultShippingAddress?.lastName}
                  />
                  <AddressInputContent
                    label='Company Name'
                    detail={profileDetails?.defaultShippingAddress?.companyName}
                  />
                  <AddressInputContent
                    label='Street Address 1'
                    detail={
                      profileDetails?.defaultShippingAddress?.streetAddress1
                    }
                  />
                  <AddressInputContent
                    label='Street Address 2'
                    detail={
                      profileDetails?.defaultShippingAddress?.streetAddress2
                    }
                  />
                  <AddressInputContent
                    label='City'
                    detail={profileDetails?.defaultShippingAddress?.city}
                  />
                  <AddressInputContent label='Country' detail='INDIA' />
                  <AddressInputContent
                    label='State'
                    detail={profileDetails?.defaultShippingAddress?.countryArea}
                  />
                  {!edit && (
                    <span
                      onClick={() => {
                        setCurrentAddress({
                          type: "defaultShippingAddress",
                          address: profileDetails?.defaultShippingAddress,
                        });
                        setAddressModalOpen(true);
                      }}
                      className='text-blue-500 font-black text-md'
                    >
                      Edit{" "}
                    </span>
                  )}
                </div>
              </section>
              {/* <ProfileInput
              name='streetAddress1'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.streetAddress1}
              placeholder='Enter Street Address 1'
              handleChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    streetAddress1: e.target.value,
                  },
                })
              }
            />
            <ProfileInput
              name='streetAddress2'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.streetAddress2}
              placeholder='Enter Street Address 2'
              handleChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    streetAddress2: e.target.value,
                  },
                })
              }
            />
            <ProfileInput
              name='city'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.city}
              placeholder='Enter City'
              handleChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    city: e.target.value,
                  },
                })
              }
            />
            <ProfileInput
              name='city Area'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.cityArea}
              placeholder='Enter City Area'
              handleChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    cityArea: e.target.value,
                  },
                })
              }
            />
            <ProfileInput
              name='postal Code'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.postalCode}
              placeholder='Enter postalCode'
              handleChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    postalCode: e.target.value,
                  },
                })
              }
            />

            <ProfileSelect
              name='country'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.country?.code}
              placeholder='Enter country'
              handleChange={(e) => {
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    country: countries?.filter(
                      (country) => country.code === e.target.value
                    )[0],
                  },
                });
              }}
              // options={countries.map(country=>{ return {}})}
              options={countries.map((country) => {
                return { code: country?.code, label: country?.country };
              })}
            />
            <ProfileInput
              name='country Area'
              edit={edit}
              details={profileDetails?.defaultBillingAddress?.countryArea}
              placeholder='Enter Country Area'
              handleChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  defaultBillingAddress: {
                    ...profileDetails?.defaultBillingAddress,
                    countryArea: e.target.value,
                  },
                })
              }
            /> */}
              <ProfileInput
                name='birth Date'
                edit={edit}
                type='date'
                details={profileDetails?.birthDate?.split("T")[0]}
                placeholder='Enter Date of Birth'
                handleChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    birthDate: e.target.value + "T00:00:00Z",
                  })
                }
              />
              <ProfileInput
                name='anniversary Date'
                edit={edit}
                type='date'
                details={profileDetails?.anniversaryDate?.split("T")[0]}
                placeholder='Enter Birth Date'
                handleChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    anniversaryDate: e.target.value + "T00:00:00Z",
                  })
                }
              />
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
