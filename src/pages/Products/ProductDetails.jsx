import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import ProductCarousel from "../../components/Carousel/ProductsCarousel";
import ProductDetail from "../../components/Products/ProductDetails";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useLazyQuery } from "@apollo/client";
import {
  GET_ALL_PRODUCTS_FILTERED,
  GET_PRODUCT_BY_ID,
} from "../../Graphql/Query";

import SectionTitle from "../../components/Headings/SectionTitle";
import Search from "../../components/Search/Search";
import Empty from "../../components/FallBacks/Empty";
import { addToCart } from "../../redux/actions/cart";
import DisplayPrice from "../../components/Utils/DisplayPrice";
import Customizations from "../../components/Modals/Customizations";
import { openCustomization } from "../../redux/actions/client";
import Loader from "../../components/Loader/Loader";
import { getDiamondRate, gettotalMetalCharge } from "../../functions";
import { data } from "autoprefixer";

const VariantSelector = (props) => {
  const selected = props?.selected;
  const handleSelect = () => {
    props?.handleSelect();
  };
  return (
    <>
      <div
        className={
          "variantBox w-[30%] bg-white flex flex-col items-center justify-center rounded-lg h-28 border-[3px] hover:bg-yellow-200 cursor-pointer transition duration-150" +
          " " +
          (props?.selected ? "border-4 border-yellow-500" : "border-gray-400") +
          " " +
          (props?.variants?.isAvailable
            ? " opacity-30 pointer-events-none"
            : "opacity-100")
        }
        onClick={handleSelect}
      >
        <h3 className='text-lg font-bold text-center'>
          {props?.variant?.name?.split("/")[0]}
        </h3>
        <h4 className='font-bold text-center'>
          {props?.variant?.name?.split("/")[1]}
        </h4>
      </div>
    </>
  );
};
const PriceBreakDown = (props) => {
  let vd = props?.currentProduct;
  let pd = props?.product?.data?.product;

  console.log(pd);

  // METAL PRICES
  let metalType = pd?.attributes
    .filter((attr) => attr?.attribute?.name == "Metal Type")[0]
    ?.values[0]?.name?.toLowerCase();
  let metalPurity = 0;
  let totalMetalCharge = 0;

  switch (metalType) {
    case "gold":
      metalPurity = pd?.attributes
        .filter((attr) => attr?.attribute?.name == "Gold Carat")[0]
        ?.values[0]?.name?.toLowerCase();
      break;
    case "silver":
      metalPurity = pd?.attributes
        .filter((attr) => attr?.attribute?.name == "Silver Carat")[0]
        ?.values[0]?.name?.toLowerCase();
      break;

    case "platinum":
      metalPurity = pd?.attributes
        .filter((attr) => attr?.attribute?.name == "Platinum Carat")[0]
        ?.values[0]?.name?.toLowerCase();
      break;

    default:
      break;
  }

  // console.log(metalPurity);

  let metalPrice = gettotalMetalCharge(metalType, metalPurity) || 0;

  let netWeight =
    vd.attributes.filter((attr) => attr?.attribute?.slug == "net-weight")[0]
      ?.values[0].value || 0;
  if (netWeight == "none" || (!netWeight)) netWeight = 0;
  // if (netWeight == "none" || (!netWeight)) return 0;

  // if (!netWeight) netWeight = 0;
  totalMetalCharge = parseFloat(netWeight) * parseFloat(metalPrice);

  let totalMakingCharge = 0;
  let totalWastageCharge = 0;

  let mc =
    vd.attributes.filter((attr) => attr?.attribute?.slug == "making-charge")[0]
      ?.values[0].value || 0;

  let wc =
    vd.attributes.filter((attr) => attr?.attribute?.slug == "wastage-charge")[0]
      ?.values[0].value || 0;

  let mcm = pd?.attributes
    .filter((attr) => attr?.attribute?.name == "Making Charge Mode")[0]
    ?.values[0]?.name?.toLowerCase();
  let wcm = pd?.attributes
    .filter((attr) => attr?.attribute?.name == "Wastage Charge Mode")[0]
    ?.values[0]?.name?.toLowerCase();

  switch (mcm) {
    case "percent":
      totalMakingCharge = (totalMetalCharge * mc) / 100;
      break;
    case "gram":
      totalMakingCharge = netWeight * mc;
      break;
    case "flat":
      totalMakingCharge = mc;
      break;
    default:
      totalMakingCharge = 0;
      break;
  }
  switch (wcm) {
    case "percent":
      totalWastageCharge = (totalMetalCharge * wc) / 100;
      break;
    case "gram":
      totalWastageCharge = netWeight * wc;
      break;
    case "flat":
      totalWastageCharge = wc;
      break;
    default:
      totalWastageCharge = 0;
      break;
  }

  // GEMSTONES
  const isStudded =
    pd?.attributes?.filter((attr) => attr?.attribute?.name == "Type")[0]
      ?.values[0]?.name == "Studded" || false;
  let gemstoneDetails;

  let totalGemstonewt = 0;
  let totalGemstonePrice = 0;
  if (isStudded) {
    gemstoneDetails = JSON.parse(
      vd?.attributes?.filter(
        (attr) => attr?.attribute?.slug == "gemstone-details"
      )[0]?.values[0]?.value
    );

    // update gemstones JSON
    gemstoneDetails.forEach((gemstone, idx) => {
      let temp = gemstone;
      if (gemstone.dri) {
        temp.ppc = getDiamondRate(gemstone.dri);
        temp.tp = parseFloat(temp.ppc) * (temp.tw || 0);
      }
      gemstoneDetails[idx] = temp;
    });

    gemstoneDetails.forEach((gemstone, idx) => {
      totalGemstonewt += gemstone.tw || 0;
      totalGemstonePrice += gemstone.tp || 0;
    });
  }

  // TOTALS
  let subtotal =
    parseFloat(totalMetalCharge) +
    parseFloat(totalWastageCharge) +
    parseFloat(totalMakingCharge) +
    parseFloat(totalGemstonePrice);

  let totalGST = 
    (subtotal *
      parseFloat(
        pd?.attributes?.filter((attr) => attr?.attribute?.name == "GST")[0]
          ?.values[0]?.name
      )) /
    100;

  let finalPrice = Math.ceil(parseFloat(subtotal) + parseFloat(totalGST));

  // setBreakDown(CartData)
  useEffect(() => {
    let isDesignBank = pd?.attributes
    .filter((attr) => attr?.attribute?.name == "Is Design bank ")[0]
    ?.values[0]?.name?.toLowerCase();
    if(isDesignBank==="true"){
      metalType = 0;
      metalPurity = 0;
      metalPrice = 0;
      totalGemstonePrice = 0;
      subtotal = 0;
      totalGST = 0;
      finalPrice = 0;
    }
    props?.getBreakDown({
      metalType,
      metalPurity,
      metalPrice,
      totalGemstonePrice,
      subtotal,
      totalGST,
      finalPrice,
    });
  }, [finalPrice]);
  return (
    <>
      <section className='w-full '>
        <SectionTitle title='Price Breakdown' />

        <section className='w-full flex flex-col shadow-md mt-4'>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>
              {metalType.toUpperCase()}&nbsp;{metalPurity}k
            </span>
            <span className='font-bold'>
              <DisplayPrice price={metalPrice?.toFixed(2)} />
            </span>
          </div>

          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>Net Weight</span>
            <span className='font-bold'>{netWeight} {'gm'}</span>
          </div>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>Total Metal Charge</span>
            <span className='font-bold'>
              <DisplayPrice price={Math.ceil(totalMetalCharge)} />
            </span>
          </div>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>Total Making Charge</span>
            <span className='font-bold'>
              <DisplayPrice price={Math.ceil(totalMakingCharge)} />
            </span>
          </div>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>Total Wastage Charge</span>
            <span className='font-bold'>
              <DisplayPrice price={Math.ceil(totalWastageCharge)} />
            </span>
          </div>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>Gemstone Price</span>
            <span className='font-bold break-all'>
              <DisplayPrice price={Math.ceil(totalGemstonePrice)} />
            </span>
          </div>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>SubTotal</span>
            <span className='font-bold'>
              <DisplayPrice price={Math.ceil(subtotal)} />
            </span>
          </div>
          <div className='flex items-center justify-between py-3 px-4'>
            <span className='font-bold'>GST (3%)</span>
            <span className='font-bold'>
              <DisplayPrice price={Math.ceil(totalGST)} />
            </span>
          </div>
          <div className='flex items-center background-green justify-between rounded-md border-4 border-green-400 py-3 px-4'>
            <span className='font-bold'>Total Price</span>
            <span className='font-bold text-2xl' id='finalPrice' data-price={finalPrice}>
              <DisplayPrice price={finalPrice.toFixed(2)} />
            </span>
          </div>
        </section>
      </section>
    </>
  );
};
const ProductDetails = (props) => {
  const [isDesignBank, setIsDesignBank] = useState(false);
  const search = useSelector((state) => state?.client?.homeSearchOpen);
  const [availability, setAvailability] = useState("Ready");
  const [favorite, setFavorite] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [breakDown, setBreakDown] = useState(null);
  const location = useLocation();
  const item = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartBtn = useRef();
  const cart = useSelector((state) => state?.cart?.cart);
  const existingProduct = useSelector((state) =>
    state?.cart?.cart?.find((x) => x?.id == item?.id)
  );
  const [quantity, setQuantity] = useState(1);

  const [getProduct, product] = useLazyQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id: item?.id,
      countryCode: "IN",
    },
    onCompleted: (data) => {
      console.log("ProductDetails: getProductDetails(306)",data);
      setCurrentProduct(data?.product?.variants[0] || data?.product);
      setIsDesignBank(data?.product?.attributes[25]?.values[0]?.name);
      setAvailability(data?.product?.attributes[1]?.values[0]?.isAvailable);
      console.log(data?.product?.attributes[25]?.values[0]?.name);
      console.log(isDesignBank)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [getFilteredProduct, filteredProduct] = useLazyQuery(
    GET_ALL_PRODUCTS_FILTERED,
    {
      variables: {
        // filter: {
        //   isPublished: true,
        //   collections: "",
        //   categories: "",
        //   hasCategory: "",
        //   attributes: [""],

        //   productType: "",

        //   search: "",
        //   price: "",
        //   minimalPrice: "",
        //   productTypes: "",
        //   ids: "",
        // },
        filter: {
          // categories: ["Q2F0ZWdvcnk6MTU="],
          attributes: [
            // { slug: "gender", values: ["female", "unisex"] },
            // { slug: "metal-type", values: ["gold"] },
            // { slug: "gemstone-type", values: ["diamond", " ruby"] },
            {
              slug: "parent-product-id",
              values: [
                product?.data?.product?.attributes.filter(
                  (attr) => attr?.attribute?.name == "Parent Product ID"
                )[0]?.values[0]?.name,
              ],
            },
          ],
        },
        sort: { direction: "DESC", field: "PUBLICATION_DATE" },
      },
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
    console.log();
  }, []);
  useEffect(() => {
    getProduct();
    getFilteredProduct();
  }, [item]);

  useEffect(() => {
    if (currentProduct) {
      if (existingProduct) {
        setQuantity(existingProduct?.quantity);
        setFavorite(existingProduct?.isFavorite);
        disableAddToCart();
      } else enableAddToCart();
    }
  }, [existingProduct]);
  useEffect(() => {
    let existingProduct = cart?.find((x) => x.id == currentProduct?.id);
    if (existingProduct) {
      setQuantity(existingProduct?.quantity);
      setFavorite(existingProduct?.isFavorite);
      disableAddToCart();
    } else enableAddToCart();
  }, [currentProduct]);

  function increment() {
    setQuantity(quantity + 1);
  }
  function decrement() {
    if (quantity > 1) setQuantity(quantity - 1);
  }
  function createItem(item) {
    let newItem = Object.assign({}, item);
    let finalPrice = parseFloat(breakDown?.finalPrice || 0);
    newItem.name = product?.data?.product?.name + "/v/" + newItem.name;
    newItem.quantity = quantity;
    newItem.thumbnail = product?.data?.product?.thumbnail;
    newItem.totalPrice = quantity * finalPrice;
    newItem.breakDown = breakDown;

    dispatch(addToCart(newItem));
    disableAddToCart();
  }
  function disableAddToCart() {
    addToCartBtn.current.disabled = true;
    addToCartBtn.current.style.opacity = 0.5;
    addToCartBtn.current.innerHTML = "Added to cart";
  }
  function enableAddToCart() {
    if (addToCartBtn?.current) {
      addToCartBtn.current.disabled = false;
      addToCartBtn.current.style.opacity = 1;
      addToCartBtn.current.innerHTML = "Add to cart";
    }
  }

  return (
    <section className='lg:px-[100px]'>
      {product?.loading && <Loader />}

      {/* {!currentProduct && !product?.loading && (
        <Empty variant='Product' image='product.svg' />
      )} */}
      {currentProduct && (
        <>
          <Customizations product={currentProduct} />
          <section className='productDetailsWrapper flex-col w-full flex items-center justify-center'>
            <section className='w-[95%] px-[10px] my-4 '>
              {search && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Search />
                </motion.div>
              )}
            </section>
            <section className='flex flex-wrap w-full items-start justify-around'>
              <section className='w-[95%] lg:w-2/5 flex flex-col items-center justify-center relative lg:px-5 lg:sticky lg:top-[10%]'>
                <motion.div
                  className='favourite absolute  right-3 lg:right-10 top-10 z-[999999] text-3xl'
                  whileTap={{
                    scale: 1.3,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={(e) => setFavorite(!favorite)}
                >
                  {favorite ? (
                    <AiFillHeart color='red' />
                  ) : (
                    <AiOutlineHeart color='white' />
                  )}
                </motion.div>
                <ProductCarousel
                  images={
                    product?.data?.product?.images || [
                      product?.data?.product?.thumbnail2x?.url ||
                        product?.data?.product?.thumbnail?.url,
                    ]
                  }
                />
              </section>
              
              <section className='w-[95%] lg:w-3/5 flex flex-col items-center justify-center lg:justify-start lg:items-start lg:px-10'>
                <ProductDetail
                  product={currentProduct}
                  totalPrice={breakDown?.finalPrice?.toFixed(2)}
                  name={product?.data?.product?.name}
                  isDesignBank={isDesignBank}
                  increment={increment}
                  decrement={decrement}
                  quantity={quantity}
                  attributes={product?.data?.product?.attributes}
                />
                





                {(isDesignBank === "false") && (
                <section className='w-full flex flex-col flex-wrap items-start px-4 '>
                  <SectionTitle title='Select Your Size' />
                  <select
                    className='selectCustomization flex items-center justify-between shadow-lg rounded-md border-2 bg-white w-3/4 h-10 p-2 '
                    onChange={(e) =>
                      setCurrentProduct(JSON.parse(e.target.value))
                    }
                  >
                    {product?.data?.product?.variants?.map((variant) => (
                      <option
                        key={variant?.id}
                        selected={currentProduct?.id == variant?.id}
                        value={JSON.stringify(variant)}
                      >
                        {
                          variant?.attributes?.filter(
                            (attr) => attr?.attribute?.name == "Size"
                          )[0]?.values[0]?.value || "None"
                        }
                      </option>
                    ))}
                  </select>
                  {/* <div className='flex flex-wrap items-center justify-start w-full gap-2 mt-3'>
                    {product?.data?.product?.variants?.map((variant) => (
                      <VariantSelector
                        variant={variant}
                        selected={currentProduct?.id == variant?.id}
                        handleSelect={(e) => setCurrentProduct(variant)}
                      />
                    ))}
                  </div> */}
                </section>
                )}
                <section className="w-100 flex flex-row gap-9 px-4 py-8">
                <div className="text-center">
                  <img className="h-10 w-auto mx-auto" src={process.env.PUBLIC_URL + "/fast.svg"} alt="tTIMELY DELIVERY" />
                  <p>TIMELY DELIVERY</p>
                </div>
                <div className="text-center">
                  <img className="h-10 w-auto mx-auto" src={process.env.PUBLIC_URL + "/hallmark.png"} alt="HALLMARKED" />
                  <p>HALLMARKED</p>
                </div>
                <div className="text-center">
                  <img className="h-10 w-auto mx-auto" src={process.env.PUBLIC_URL + "/shipping.svg"} alt="FREE SHIPPING" />
                  <p>FREE SHIPPING</p>
                </div>
              </section>
                

                
              




                <div className='w-full flex items-center justify-between my-4'>
                  <div
                    className='w-1/2 h-10 font-bold flex items-center justify-center border-black border  ml-2 rounded-md pb-1'
                    ref={addToCartBtn}
                    onClick={() => {
                      createItem(currentProduct);
                    }}
                  >
                    Add to cart
                  </div>
                  {((isDesignBank === "false") || (availability === "READY")) && (
                  <div
                    className='w-1/2 h-10 font-bold bg-[#000531] pb-1 text-white border-[#000531] flex items-center justify-center  border  ml-2 rounded-md'
                    onClick={() => {
                      createItem(currentProduct);
                      navigate("/app/cart");
                    }}
                  >
                    Buy Now
                  </div>
                  )}
                  
                </div>
                {(isDesignBank === "false") && (
                <PriceBreakDown
                  currentProduct={currentProduct}
                  product={product}
                  getBreakDown={(e) => setBreakDown(e)}
                />
                )}
                
              </section>
              <section className="w-100 flex flex-row gap-9 px-4 py-8">
                <div>
                  <img className="h-10 w-auto" src={process.env.PUBLIC_URL + "/gia.png"} alt="GIA CERTIFIED" />
                  {/* <p>GIA CERTIFIED</p> */}
                </div>
                {/* <div>
                  <img className="h-10 w-auto" src={process.env.PUBLIC_URL + "/hallmark.png"} alt="HALLMARKED" />
                </div> */}
                <div>
                  <img className="h-10 w-auto" src={process.env.PUBLIC_URL + "/igi.png"} alt="IGI CERTIFIED" />
                  {/* <p>IGI CERTIFIED</p> */}
                </div>
                <div>
                  <img className="h-10 w-auto" src={process.env.PUBLIC_URL + "/sgl.png"} alt="SGL STANDARD" />
                  {/* <p>SGL STANDARD</p> */}
                </div>
              </section>
            </section>
          </section>
        </>
      )}
    </section>
  );
};

export default ProductDetails;
