"use client";

import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";

export const ErrorAlert = ({errorHere}) => {

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        padding: "0px 30px",
        width: "50%",
        top: '14.5%'
      }}
    >
      <Alert  style={{fontWeight: 'bold'}} severity="error">There was an error: {errorHere}</Alert>
    </motion.div>
  );
};
