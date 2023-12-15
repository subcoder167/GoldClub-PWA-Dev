import React, { useEffect, useState } from "react";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import OtpInput from "../../components/FormControls/OtpInput";
import { useMutation } from "@apollo/client";
import { SEND_OTP, VALIDATE_OTP } from "../../Graphql/Mutations";
import Loader from "../../components/Loader/Loader";
import { loaderType } from "../../constants/loaderConstants";
import SuccessMessage from "../../components/Messages/SuccessMessage";
const Otp = () => {
  const [otp, setotp] = useState({ whatsappNumber: null, otpVal: null });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState({ success: false, message: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.login);

  const [validateOtp, { loading }] = useMutation(VALIDATE_OTP, {
    variables: {
      mobile: otp.whatsappNumber,
      otp: otp.otpVal,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.verify.status) {
        setSuccess({ success: true, message: data.verify.message });

        localStorage.setItem(
          `vjw-${window.location.hostname}user`,
          JSON.stringify(data?.verify)
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}user-det`,
          JSON.stringify(data?.verify?.user)
        );
        setTimeout(() => {
          if (sessionStorage.getItem("beforeLogin")) {
            navigate(sessionStorage.getItem("beforeLogin"));
            sessionStorage.removeItem("beforeLogin");
          } else navigate("/app");
        }, 100);
      } else if (!data.verify.status) {
        setSuccess({ success: false, message: "" });
        setError({ error: true, message: data.verify.message });
      }
    },
    onError: (err) => {
      setError({ error: true, message: err.message });
    },
  });
  const [sendOtp, { otpLoading }] = useMutation(SEND_OTP, {
    variables: {
      mobile: state?.whatsappNumber,
    },
    onCompleted: (data) => {
      if (data?.otp?.status) {
        setError({ error: false, message: "" });
        setSuccess({ success: true, message: data.otp.message });
      } else {
        setSuccess({ success: false, message: "" });
        setError({ error: true, message: data.otp.message });
      }
    },
    onError: (err) => {
      setError({ error: true, message: err.message });
    },
  });
  useEffect(() => {
    if (state.whatsappNumber == null) navigate("/login");
    setotp({ ...otp, whatsappNumber: state.whatsappNumber });
  }, []);

  useEffect(() => {
    if (otp.otpVal && otp.otpVal.length == 6) setDisabled(false);
    else setDisabled(true);
  }, [otp]);

  const handleOtp = (e) => {
    setotp({
      ...otp,
      otpVal: Object.values(e).join(""),
    });
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setSuccess({ success: false, message: "" });
    setError({ error: false, message: "" });
    validateOtp();
  };
  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      {/* LOGO GOES HERE */}
      <img
        src={
          localStorage.getItem(`vjw-${window.location.hostname}logo`) ||
          process.env.PUBLIC_URL + "logo.png"
        }
        alt='logo'
        className='lg:w-[100px] w-1/2'
      />

      {/* LOGIN FORM GOES HERE */}
      <section className='p-4 w-5/6'>
        <section className='h-full rounded-lg overflow-hidden flex flex-col items-center justify-start shadow-generic py-6 px-4 lg:w-1/2 lg:mx-auto'>
          <h2 className='text-3xl font-bold'>Welcome</h2>
          <h6 className='text-sm'>Login to continue</h6>
          <form className='authForm mt-4' onSubmit={handleSubmit}>
            <OtpInput
              updateOtp={(e) => handleOtp(e)}
              handleComplete={handleSubmit}
            />
            {error.error && <ErrorMessage error={error.message} />}
            {success.success && <SuccessMessage success={success.message} />}
            <center>
              <button
                className='inline-flex text-white bg-[color:var(--accent-color)] border-0 py-2 px-10 focus:outline-none hover:bg-[color:var(--accent-color)]-200 rounded text-md disabled:opacity-75'
                disabled={loading || disabled}
              >
                {loading ? <Loader variant={loaderType.white} /> : "Submit"}
              </button>
            </center>
          </form>
          <section className='mt-2 flex items-center justify-center'>
            <h5 className='text-blue-600 font-bold' onClick={sendOtp}>
              {otpLoading ? (
                <>
                  <Loader /> Sending Otp
                </>
              ) : (
                <>Resend Otp</>
              )}
            </h5>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Otp;
