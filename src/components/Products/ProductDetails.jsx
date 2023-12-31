import React, { useCallback, useEffect, useState } from "react";

import SectionTitle from "../../components/Headings/SectionTitle";

import DisplayPrice from "../Utils/DisplayPrice";
import RTE from "../RTE";

function ProductDetailCard(props) {
  return (
    <>
      {/* <div className='w-[45%] min-h-20 mt-3 font-bold flex flex-col  justify-start shadow-md border-2  ml-2 rounded-md p-4 text-sm'> */}
      <div className='w-[100%] min-h-20 mt-3 font-bold flex flex-col  justify-start text-sm'>
        <div className='flex items-center justify-between border-b-2 py-3 px-4'>
            <span className='font-bold'>{props.title}</span>
            <span className='font-bold'>{props?.title != "Gemstone Details" &&
              (props?.description || "Unavailable")}
            {props?.title == "Gemstone Details" &&
              JSON.parse(props?.description).map((deet) => (
                <div className='my-1'>
                  <strong>{deet?.name} :</strong>{" "}
                  <span>
                    {deet?.shape || "N/A"}({deet?.size || "N/A"})
                  </span>
                </div>
              ))}</span>
          </div>
        </div>
    </>
  );
}








// const ProdInfo = (props) => {
  
//   let vd = props?.currentProduct;
//   let pd = props?.product?.data?.product;

//   // METAL PRICES
//   let metalType = pd?.attributes
//     .filter((attr) => attr?.attribute?.name == "Metal Type")[0]
//     ?.values[0]?.name?.toLowerCase();
//   let metalPurity = 0;

//   switch (metalType) {
//     case "gold":
//       metalPurity = pd?.attributes
//         .filter((attr) => attr?.attribute?.name == "Gold Carat")[0]
//         ?.values[0]?.name?.toLowerCase();
//       break;
//     case "silver":
//       metalPurity = pd?.attributes
//         .filter((attr) => attr?.attribute?.name == "Silver Carat")[0]
//         ?.values[0]?.name?.toLowerCase();
//       break;

//     case "platinum":
//       metalPurity = pd?.attributes
//         .filter((attr) => attr?.attribute?.name == "Platinum Carat")[0]
//         ?.values[0]?.name?.toLowerCase();
//       break;

//     default:
//       break;
//   }

//   console.log(metalPurity);

//   // GEMSTONES
//   // const isStudded =
//   //   pd?.attributes?.filter((attr) => attr?.attribute?.name == "Type")[0]
//   //     ?.values[0]?.name == "Studded" || false;
//   // let gemstoneDetails;

//   // let totalGemstonewt = 0;
//   // let totalGemstonePrice = 0;
//   // if (isStudded) {
//   //   gemstoneDetails = JSON.parse(
//   //     vd?.attributes?.filter(
//   //       (attr) => attr?.attribute?.slug == "gemstone-details"
//   //     )[0]?.values[0]?.value
//   //   );

//   return (
//     <>
//       <div>{metalType}:{metalPurity}</div>
//     </>
//   );
// };









const ProductDetails = (props) => {

  // const stringifiedProp = JSON.stringify(props, null, 2)

  // console.log(stringifiedProp);

  const [seeMore, setSeeMore] = useState(true);
  const [counter, setCounter] = useState(props?.quantity);

  useEffect(() => {
    if (counter < 1) setCounter(1);
  }, [counter]);


  const incrementQuantity = () => props?.increment();
  const decrementQuantity = () => props?.decrement();


  const gold = JSON.parse(JSON.stringify(props?.attributes.find(attr => attr.attribute.name === "Metal Type").values))[0].name;
  const purity = JSON.parse(JSON.stringify((props?.attributes.find(attr=>attr.attribute.name === "Gold Carat").values)))[0].name;
  
  const gem = JSON.parse(JSON.stringify((props?.attributes.find(attr=>attr.attribute.name === "Gemstone").values)))[0].name;
  const gems = gem.replace(/[\[\]"\']/g, '');

  const gemAllDetails = props?.attributes.find(attr => attr.attribute.id === "QXR0cmlidXRlOjg5")?.values;
  let gemDetails = [];

  if (gemAllDetails && gemAllDetails.length > 0) {
    const jsonString = gemAllDetails[0].name;

    try {
      // Parse the "name" value into an array
      gemDetails = JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  // console.log(gemDetails[0]);



  const specificAttributes = [
    'Less Weight',
    'Gross Weight',
    'Net Weight',
    'Making Charge',
    'Wastage Charge',
    'Gemstone Details',
    'Total Gemstone Weight',
  ];


  

  
  return (
    <div className='productDetails flex flex-col items-start justify-start w-[95%] my-4'>
      <h1 className='text-3xl font-bold'>{props?.name}</h1>
      <SectionTitle title='Product Details' />

    {/* {JSON.stringify(props?.attributes.find(attr=>attr.attribute.name=="Metal Type").values)}
    {JSON.stringify(props?.attributes.find(attr=>attr.attribute.name=="Gold Carat").values)} */}

    
      <span className={seeMore ? 'block' : 'hidden'}>
        Set in {gold} {purity}k, with {gemDetails[0]?.shape},({gemDetails[0]?.size}) {gems}.  
      </span>

      



      <div
        // className={seeMore ? "line-clamp-none w-full " : "line-clamp-1 w-full"}
        className={seeMore ? "h-0 overflow-hidden w-full " : "h-auto w-full"}
      >
        {/* <div className='mt-2 invisible'>""</div> */}

        <div className='w-full flex justify-start flex-wrap relative'>
        {props?.product?.attributes
          ?.filter(attribute => (
            specificAttributes.includes(attribute?.attribute?.name) &&
            attribute?.values[0]?.name &&
            attribute?.values[0]?.name.toLowerCase() !== 'none'
          ))
          .map((attribute) => (
            <ProductDetailCard
              key={attribute?.attribute?.name} // Ensure this is unique
              title={attribute?.attribute?.name}
              description={attribute?.values[0]?.name}
            />
        ))}

        </div>
      </div>



      <div>
        
      </div>


      <div
        className='seeMore text-indigo-600 text-md mt-2 underline'
        onClick={() => setSeeMore(!seeMore)}
      >
        {seeMore ? "See All" : "See Less"}
      </div>




      <div className='priceDivWrapper flex items-center justify-between w-full my-4 '>
        <div className='priceDiv flex items-center'>
          <div className='price text-2xl font-black'>
            <DisplayPrice
              price={
                props?.totalPrice != "NaN"
                  ? props?.totalPrice
                  : "Check Breakdown" ||
                    props?.product?.pricing?.priceRange?.stop?.net?.amount ||
                    props?.product?.pricing?.price?.net?.amount
              }
            />
            {(props?.isDesignBank === "true") && (
              "Contact store"
              )}
            {/* &nbsp;
            <span className="text-lg ">to</span>
            &nbsp;
            <DisplayPrice
              price={
                props?.product?.pricing?.priceRange?.stop?.net?.amount || 2999
              }
            /> */}
          </div>
          <div className='oldPrice text-xs line-through ml-1'>
            <DisplayPrice price={props?.product?.oldPrice} />
          </div>
        </div>
        <div className='counter flex items-center justify-center'>
          <button
            className='bg-[#01124F] text-white py-1 px-3 text-lg disabled:opacity-70 rounded-md'
            onClick={() => decrementQuantity()}
            disabled={props?.quantity === 1}
          >
            -
          </button>
          <h2 className='text-md font-bold mx-4'>{props?.quantity}</h2>
          <button
            className='bg-[#01124F] text-white py-1 px-3 text-lg rounded-md'
            onClick={() => incrementQuantity()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
