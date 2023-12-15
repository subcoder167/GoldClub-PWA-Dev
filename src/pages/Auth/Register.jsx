import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";

import { CREATE_TOKEN, REGISTER } from "../../Graphql/Mutations";
import TextInput from "../../components/FormControls/TextInput";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import SuccessMessage from "../../components/Messages/SuccessMessage";

import "../../styles/Auth.css";
import Loader from "../../components/Loader/Loader";
import { loaderType } from "../../constants/loaderConstants";
import { GET_STORE_DETAILS } from "../../Graphql/Query";
import { useDispatch } from "react-redux";
import { fetchStoreDetails } from "../../redux/actions/graph";
import { generateDynamicManifest } from "../../functions";
const Register = () => {
  const [authDetails, setauthDetails] = useState({
    firstname: null,
    lastname: null,
    whatsappNumber: null,
  });
  const [error, setError] = useState({ error: false, message: "" });
  const [token, setToken] = useState(null);
  const [success, setSuccess] = useState({ success: false, message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createToken] = useMutation(CREATE_TOKEN, {
    variables: {
      password: "password",
      phoneNumber: "+919510321680",
    },
    onCompleted: (data) => {
      localStorage.setItem(
        `vjw-${window.location.hostname}token`,
        data.tokenCreate.token
      );

      setTimeout(() => {
        register();
      }, 10);
    },
    onError: (err) => {
      setError({ error: true, message: err.message });
    },
  });
  const [register, { loading }] = useMutation(REGISTER, {
    variables: {
      firstName: authDetails?.firstname?.trim(),
      lastName: authDetails?.lastname?.trim(),
      phoneNumber: "+91" + authDetails?.whatsappNumber?.trim(),
    },
    context: {
      headers: {
        authorization: localStorage.getItem(
          `vjw-${window.location.hostname}token`
        ),
      },
    },
    onCompleted: (data) => {
      console.log(data.customerCreate);
      if (data.customerCreate.user) {
        setError({ error: false, message: "" });
        setSuccess({
          success: true,
          message: "You're registered successfully",
        });
      } else {
        setSuccess({ success: false, message: "" });
        setError({
          error: true,
          message: data.customerCreate.accountErrors[0].message,
        });
      }

      if (data && data.customerCreate.user)
        setTimeout(() => {
          navigate("/login");
        }, 900);
    },
    onError: (err) => {
      console.log(err);
      setError({ error: true, message: err.message });
    },
  });
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
          `vjw-${window.location.hostname}rates`,
          JSON.stringify(data?.storeDetails?.metalRates)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ error: false, message: null });
    createToken();
    // register();
  };
  useEffect(() => {
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
        className='lg:w-[100px] w-1/2'
      />

      {/* LOGIN FORM GOES HERE */}
      <section className='p-4 w-5/6'>
        <section className='h-full rounded-lg overflow-hidden flex flex-col items-center justify-start shadow-generic py-6 px-4 lg:w-1/2 lg:mx-auto'>
          <h2 className='text-3xl font-bold'>Welcome</h2>
          <h6 className='text-sm'>Login to continue</h6>
          <form className='authForm mt-4' onSubmit={handleSubmit}>
            <TextInput
              label='First Name'
              placeholder='Enter your first name'
              updateVal={(e) =>
                setauthDetails({ ...authDetails, firstname: e })
              }
              required={true}
            />
            <TextInput
              label='Last Name'
              placeholder='Enter your last name'
              updateVal={(e) => setauthDetails({ ...authDetails, lastname: e })}
              required={true}
            />
            <TextInput
              label='Whatsapp Number'
              type='number'
              placeholder='Enter your number'
              updateVal={(e) =>
                setauthDetails({
                  ...authDetails,
                  whatsappNumber: e,
                })
              }
              required={true}
            />
            {error.error && <ErrorMessage error={error.message} />}
            {success.success && <SuccessMessage success={success.message} />}

            <center>
              <button className='inline-flex text-white bg-[color:var(--accent-color)] border-0 py-2 px-10 focus:outline-none hover:bg-[color:var(--accent-color)]-200 rounded text-md'>
                {loading && <Loader variant={loaderType.white} />} Register
              </button>
            </center>
          </form>
        </section>

        <section className='mt-2 flex items-center justify-center'>
          Already Have Account ?&nbsp;
          <Link to='/login' className='text-blue-600'>
            Login Now
          </Link>
        </section>
      </section>
    </section>
  );
};

export default Register;
