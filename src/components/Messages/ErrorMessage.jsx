import React from "react";
import { motion } from "framer-motion";
const ErrorMessage = (props) => {
  return (
    <motion.div initial={{ y: 10 }} animate={{ y: 0 }}>
      <h5 className="text-red-600 text-center my-1">{props && props.error}</h5>
    </motion.div>
  );
};

export default ErrorMessage;
