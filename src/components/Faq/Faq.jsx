import React, { useEffect, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { motion } from "framer-motion";
import { useLazyQuery } from "@apollo/client";
import { GET_FAQ } from "../../Graphql/Query";

import Loader from "../Loader/Loader";
import ErrorMessage from "../Messages/ErrorMessage";
import { get } from "lodash";
const FaqCard = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className='faqCard w-[100%] lg:w-1/2 '>
      <div className='bg-slate-50 appearance-none marker:none my-4 rounded-md shadow-md'>
        <div
          className='flex items-center justify-start relative px-2 h-15s'
          onClick={() => setOpen(!open)}
        >
          <img
            className='h-10 w-10'
            src={faq?.logo || `vjw-${window.location.hostname}logo`}
            alt=''
          />
          <h3 className='p-4 faq_question font-bold relative'>
            {faq?.question}
          </h3>

          <span className='absolute right-5 top-2/5'>
            <motion.div
              initial={open ? { rotate: 0 } : { rotate: 180 }}
              animate={open ? { rotate: 180 } : { rotate: 0 }}
            >
              <AiOutlineCaretDown />
            </motion.div>
          </span>
        </div>

        <motion.div
          initial={
            open
              ? { y: -20, height: 0, opacity: "0" }
              : { y: 0, height: "auto ", opacity: "1" }
          }
          animate={
            open
              ? { y: 0, height: "auto ", opacity: "1" }
              : { y: -20, height: 0, opacity: "0" }
          }
          // initial={
          //   open
          //     ? { y: -20, height: 0, display: "none" }
          //     : { y: 0, height: "auto ", display: "inline-block" }
          // }
          // animate={
          //   open
          //     ? { y: 0, height: "auto ", display: "inline-block" }
          //     : { y: -20, height: 0, display: "none" }
          // }
          className='w-full'
        >
          <p className='bg-transparent p-4 rounded-b-md rounded-l-md'>
            {faq?.answer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
const Faq = () => {
  const [faq, setFaq] = useState([
    {
      question: "100 % Money Back Guarantee",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, explicabo! Numquam hic esse reiciendis tempora error optio quia saepe sunt!",
      icon: "rupee.png",
    },
    {
      question: "One Year Replacement Warranty",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, explicabo! Numquam hic esse reiciendis tempora error optio quia saepe sunt!",
      icon: "discount.png",
    },
    {
      question: "Lifetime Exchange",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, explicabo! Numquam hic esse reiciendis tempora error optio quia saepe sunt!",
      icon: "jewels.png",
    },
  ]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const [getFaq, { loading }] = useLazyQuery(GET_FAQ, {
    onCompleted: (data) => {
      setFaq(data?.faqs);
      setSuccess(true);
    },
    onError: (err) => {
      setError({ error: true, message: "Failed to fetch FAQs" });
    },
  });

  useEffect(() => {
    setError({ error: false, message: "" });
    getFaq();
  }, []);
  return (
    <section
      className='faqWrapper flex flex-col items-center justify-center'
      id='faq'
    >
      {loading && <Loader />}
      {!loading &&
        !error?.error &&
        faq &&
        faq?.map((faq, idx) => <FaqCard faq={faq} key={idx} />)}
      {error?.error && <ErrorMessage error={error?.message} />}
    </section>
  );
};

export default Faq;
