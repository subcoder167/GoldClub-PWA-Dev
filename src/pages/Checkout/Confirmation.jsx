import React from "react";
import { motion } from "framer-motion";
const Confirmation = (props) => {
  return (
    <div
      className='w-screen h-screen flex items-center justify-center bg-green-900/50 backdrop-blur-sm fixed top-0 left-0 z-50'
      onClick={props?.handleEvent}
    >
      <motion.div
        className='w-10/12 lg:w-1/2 h-40 bg-green-700 p-4 flex items-center justify-center rounded-lg border-2 border-white'
        initial={{ y: 20, scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 0.75,
          stiffness: 500,
        }}
      >
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.4 }}
          transition={{
            type: "spring",
            damping: 10,
            mass: 0.75,
            stiffness: 500,
            delay: 0.25,
          }}
        >
          <h3 className='text-2xl font-bold text-white'>Order Placed 🎉!</h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Confirmation;
