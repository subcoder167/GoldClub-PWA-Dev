import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import DisplayPrice from "../Utils/DisplayPrice";
import { closeCustomization } from "../../redux/actions/client";
import SectionTitle from "../Headings/SectionTitle";
import { materials, sizes } from "../../constants/filter";
const CustomizationCard = (props) => {
  return (
    <div
      className={
        "rounded-lg flex flex-col items-center justify-center w-[30%] h-32 gap-2 bg-gray-200 transition duration-150 cursor-pointer py-2" +
        (props?.selected && "bg-yellow-200")
      }
      onClick={() => props?.selectHandler()}
    >
      <span className="w-3/4 font-bold text-center text-md">
        {props?.customization?.name}
      </span>
      <span className="w-3/4 font-bold text-center text-xs">
        {props?.customization?.size}
      </span>
      <span className="w-3/4 font-bold text-center bg-white rounded-xl text-xs ">
        {props?.customization?.available}
      </span>
    </div>
  );
};
const Customizations = (props) => {
  const [materialSelect, setmaterialSelect] = useState(null);
  const [sizeSelect, setsizeSelect] = useState(null);
  const customizationOpen = useSelector(
    (state) => state.client.customizationOpen
  );
  const dispatch = useDispatch();
  const handleCustomization = () => {
    dispatch(closeCustomization());
  };
  const materialSelectHandler = (idx) => {
    setmaterialSelect(idx);
  };
  const sizeSelectHandler = (idx) => {
    setsizeSelect(idx);
  };
  return (
    <div
      className={
        "bg-black/50  fixed w-full h-full backdrop-blur-sm z-[999999999] " +
        (customizationOpen ? "bottom-0" : "-bottom-[10000px]")
      }
    >
      <motion.div
        // lg:h-screen lg:w-[50vw]
        className={
          `customizations fixed flex flex-col items-center justify-start w-full h-[50vh]  lg:h-screen lg:w-[50vw] 
         rounded-s-xl bg-slate-50  transition-all ease-in-out shadow-lg ` +
          (customizationOpen
            ? "bottom-0 lg:right-0"
            : "bottom-[-100vh] lg:right-[-100vw] lg:bottom-0")
        }
        initial={customizationOpen ? { opacity: "0" } : { opacity: "1" }}
        animate={customizationOpen ? { opacity: "1" } : { opacity: "0" }}
      >
        <h2 className="bg-yellow-100 p-3 text-yellow-600 text-lg font-bold w-full ">
          <DisplayPrice
            price={props?.product?.pricing?.priceRange?.start?.net?.amount}
          />
          <span className="text-sm line-through ml-5 text-gray-500">
            {props?.product?.oldPrice !== props?.product?.newPrice && (
              <DisplayPrice price={props?.product?.oldPrice} />
            )}
          </span>
        </h2>
        <section className="customizationsWrapper w-full flex flex-col items-start  h-5/6 overflow-y-scroll no-scrollbar">
          <div className="customizationSection w-full border-b-2 p-3 ">
            <SectionTitle title="Material Type" />
            <div className="flex flex-wrap justify-start gap-2 mt-4">
              {materials?.map((material, idx) => (
                <CustomizationCard
                  selectHandler={() => materialSelectHandler(idx)}
                  selected={idx === materialSelect}
                  customization={material}
                />
              ))}
            </div>
          </div>
          <div className="customizationSection w-full border-b-2 p-3 ">
            <SectionTitle title="Size" />
            <div className="flex flex-wrap justify-start gap-2 mt-4">
              {sizes?.map((size, idx) => (
                <CustomizationCard
                  selectHandler={() => sizeSelectHandler(idx)}
                  selected={idx === sizeSelect}
                  customization={size}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="customizationsBtn pb-3 mt-3">
          <button
            class="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            onClick={handleCustomization}
          >
            Confirm customizations
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Customizations;
