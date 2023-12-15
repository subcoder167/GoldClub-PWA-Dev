import React from "react";
import { motion } from "framer-motion";
const SuccessMessage = (props) => {
  return (
    <motion.div initial={{ y: 10 }} animate={{ y: 0 }}>
      <h5 className="text-green-600 text-center my-1">
        {props && props.success}
      </h5>
    </motion.div>
  );
};

export default SuccessMessage;
