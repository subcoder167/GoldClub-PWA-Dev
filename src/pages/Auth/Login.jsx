import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/FormControls/TextInput";
import { setNumber } from "../../redux/actions/login";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import SuccessMessage from "../../components/Messages/SuccessMessage";
import { SEND_OTP } from "../../Graphql/Mutations";
import Loader from "../../components/Loader/Loader";
import { loaderType } from "../../constants/loaderConstants";
import { GET_STORE_DETAILS } from "../../Graphql/Query";
import { fetchStoreDetails } from "../../redux/actions/graph";
import { generateDynamicManifest } from "../../functions";

const Login = () => {
  const [authDetails, setauthDetails] = useState({
    whatsappNumber: null,
  });
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });
  const [sendOtp, { loading }] = useMutation(SEND_OTP, {
    variables: {
      mobile: authDetails && authDetails.whatsappNumber?.trim(),
    },
    onCompleted: (data) => {
      if (data?.otp?.status) {
        setError({ error: false, message: "" });
        setSuccess({ success: true, message: data.otp.message });
      } else {
        setSuccess({ success: false, message: "" });
        setError({ error: true, message: data.otp.message });
      }

      if (data && data.otp.status)
        setTimeout(() => {
          if (sessionStorage.getItem("beforeLogin"))
            navigate(
              "/otp?redirectTo=" + sessionStorage.getItem("beforeLogin")
            );
          else navigate("/otp");
        }, 200);
    },
    onError: (err) => {
      setError({ error: true, message: err.message });
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setSuccess({ success: false, message: "" });

    if (authDetails.whatsappNumber.trim().length !== 13)
      setError({ error: true, message: "Phone Number must be 10 digits" });
    else {
      dispatch(setNumber(authDetails?.whatsappNumber?.trim()));
      sendOtp();
    }
  };
  const [getStoreDetails, storeDetails] = useLazyQuery(GET_STORE_DETAILS, {
    variables: {
      domain:
        // process.env.NODE_ENV == "development"
        //   ? "ssjewellery.goldclub.co"
        //   :
           window.location.hostname,
    },

    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      dispatch(fetchStoreDetails(data?.storeDetails));
      if (data?.storeDetails) {
        localStorage.setItem(
          `vjw-${window.location.hostname}logo`,
          data?.storeDetails?.storeLogo
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}name`,
          data?.storeDetails?.name
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}address`,
          JSON.stringify(data?.storeDetails?.user?.addresses)
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}socials`,
          JSON.stringify({
            facebook: data?.storeDetails?.user?.facebookLink,
            youtube: data?.storeDetails?.user?.youtubeLink,
            instagram: data?.storeDetails?.user?.instagramLink,
          })
        );
      }
      generateDynamicManifest(
        data?.storeDetails?.name,
        data?.storeDetails?.name,
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vel est nam animi corporis, modi ipsum itaque iure dignissimos aliquam.",
        data?.storeDetails?.storeLogo
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    localStorage.removeItem(`vjw-${window.location.hostname}token`);
    localStorage.removeItem(`vjw-${window.location.hostname}user`);
    getStoreDetails();
  }, []);

  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      {/* LOGO GOES HERE */}
      <img
        src={
          localStorage.getItem(`vjw-${window.location.hostname}logo`) ||
          process.env.PUBLIC_URL + "logo.png"
        }
        onClick={() => navigate("/app/home")}
        alt='logo'
        className=' w-1/2 lg:w-[100px]'
      />

      {/* LOGIN FORM GOES HERE */}
      <section className='p-4 w-5/6'>
        <section className='h-full rounded-lg overflow-hidden flex flex-col items-center justify-start shadow-generic py-6 px-4 lg:w-1/2 lg:mx-auto'>
          <h2 className='text-3xl font-bold'>Welcome</h2>
          <h6 className='text-sm'>Login to continue</h6>
          <form className='authForm mt-4' onSubmit={handleSubmit}>
            <TextInput
              type='number'
              label='Whatsapp Number (no +91)'
              placeholder='Enter your number'
              max = {9999999999}
              pattern="[0-9]{9}"
              updateVal={(e) =>
                setauthDetails({
                  ...authDetails,
                  whatsappNumber: "+91" + e,
                })
              }
              required={true}
            />
            {error.error && <ErrorMessage error={error.message} />}
            {success.success && <SuccessMessage success={success.message} />}
            <center>
              <button className='inline-flex text-white bg-[color:var(--accent-color)] border-0 py-2 px-10 focus:outline-none hover:bg-[color:var(--accent-color)]-200 rounded text-md'>
                {loading && <Loader variant={loaderType.white} />} Get Otp
              </button>
            </center>
          </form>
        </section>

        <section className='mt-2 flex items-center justify-center'>
          New here?&nbsp; &nbsp;
          <Link to='/register' className='text-blue-600'>
            Create New Account
          </Link>
        </section>
      </section>
    </section>
  );
};

export default Login;
