import React from "react";
import { motion } from "framer-motion";
import { closeMessage } from "../../redux/actions/client";
import { useDispatch, useSelector } from "react-redux";

const MessageModal = (props) => {
  const messageOpen = useSelector((state) => state.client.messageOpen);
  const dispatch = useDispatch();
  const handleMessage = () => {
    dispatch(closeMessage());
  };
  return (
    <section
      className={
        "bg-black/[0.5] fixed w-full h-full backdrop-blur-xs z-[999999999] flex flex-col items-end justify-center " +
        " " +
        (messageOpen ? "bottom-0" : "-bottom-[10000px]")
      }
    >
      <button
        class="inline-flex text-white bg-transparent border-2 border-white py-2 px-6 focus:outline-none hover:bg-red-600 rounded-full text-lg font-black mb-10 mr-3"
        onClick={handleMessage}
      >
        Close
      </button>
      <motion.div
        className={`relative flex flex-col items-center justify-center h-auto w-11/12 py-5 lg:h-screen lg:w-[50vw] mx-auto
         rounded-md bg-slate-50  transition-all ease-in-out shadow-lg `}
        initial={messageOpen ? { opacity: "0" } : { opacity: "1" }}
        animate={
          messageOpen ? { opacity: "1", y: 0 } : { opacity: "0", y: -40 }
        }
      >
        <h3 className="font-bold text-2xl text-center px-4 text-red-800">
          {props?.message}
        </h3>
      </motion.div>
    </section>
  );
};
MessageModal.defaultProps = {
  message: "You must be logged in to perform this action.",
};
export default MessageModal;
