import React, { useEffect } from "react";
import { BiDollar } from "react-icons/bi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoSearch, IoCartOutline, IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeHomeSearch,
  closeSideNav,
  openHomeSearch,
  openSideNav,
} from "../../redux/actions/client";

import { fetchUserDetails, fetchStoreDetails } from "../../redux/actions/graph";
import SideNav from "./SideNav";
import Filter from "../Filter/Filter";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_MENU_ITEMS,
  GET_MENU_SUBITEMS,
  GET_PUBLIC_DETAILS,
  GET_STORE_DETAILS,
} from "../../Graphql/Query";
import { generateDynamicManifest } from "../../functions";
import { CREATE_TOKEN } from "../../Graphql/Mutations";
const Nav = () => {
  const state = useSelector((state) => state?.client);
  const cart = useSelector((state) => state?.cart?.cart);
  const dispatch = useDispatch();
  const [getPublicDetails] = useLazyQuery(GET_PUBLIC_DETAILS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const { store, ...others } = data?.me;
      dispatch(fetchUserDetails(others));
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const [createToken] = useMutation(CREATE_TOKEN, {
    onCompleted: (data) => {
      localStorage.setItem(
        `vjw-${window.location.hostname}ad-token`,
        data.tokenCreate.token
      );
    },
  });
  const [getStoreDetails, { loading }] = useLazyQuery(GET_STORE_DETAILS, {
    variables: {
      // domain: {
      // domain: "ssjewellery.goldclub.co",
      domain:
        process.env.NODE_ENV == "development"
          ? "ssjewellery.goldclub.co"
          : window.location.hostname,
      // },
    },

    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log("STORE DETAILS", data);
      dispatch(fetchStoreDetails(data?.storeDetails));
      if (data?.storeDetails) {
        localStorage.setItem(
          `vjw-${window.location.hostname}logo`,
          data?.storeDetails?.storeLogo
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}name`,
          data?.storeDetails?.name
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}address`,
          JSON.stringify(data?.storeDetails?.user?.addresses)
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}rates`,
          JSON.stringify(data?.storeDetails?.metalRates)
        );
        localStorage.setItem(
          `vjw-${window.location.hostname}socials`,
          JSON.stringify({
            facebook: data?.storeDetails?.user?.facebookLink,
            youtube: data?.storeDetails?.user?.youtubeLink,
            instagram: data?.storeDetails?.user?.instagramLink,
          })
        );
      } else {
        window.location.href = "https://goldclub.co";
      }
      generateDynamicManifest(
        data?.storeDetails?.name,
        data?.storeDetails?.name,
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vel est nam animi corporis, modi ipsum itaque iure dignissimos aliquam.",
        data?.storeDetails?.storeLogo
      );
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const [getNavItems, navItems] = useLazyQuery(GET_MENU_ITEMS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [getNavSubItems, navSubItems] = useLazyQuery(GET_MENU_SUBITEMS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const toggleSideNav = () => {
    if (state && state.sideNavOpen) dispatch(closeSideNav());
    else if (state && !state.sideNavOpen) dispatch(openSideNav());
  };
  const toggleHomeSearch = () => {
    if (state && state.homeSearchOpen) dispatch(closeHomeSearch());
    else if (state && !state.homeSearchOpen) dispatch(openHomeSearch());
  };

  useEffect(() => {
    createToken();
    getPublicDetails();
    getNavItems();
    getNavSubItems();
    getStoreDetails();
  }, []);
  return (
    <nav className='nav w-full h-[60px] flex items-center justify-between px-5 shadow-2xl'>
      <Link to='/app/home' className='logo'>
        <div className="flex flex-row gap-4 justify-evenly content-center items-center h-full">
          <img
            src={
              // process.env.NODE_ENV == "development"
              //   ? process.env.PUBLIC_URL + "/logo_nav.png"
              //   :
              localStorage.getItem(`vjw-${window.location.hostname}logo`)
            }
            alt=''
            className='w-[80px] max-h-[60px] object-fill'
          />
          <p className="bold text-xl">{localStorage.getItem(`vjw-${window.location.hostname}name`)}</p>
        </div>
      </Link>
      <div className='navRightIcons flex items-center gap-x-2'>
        {/* <button
          className="text-md text-gray-600 p-0.5"
          
        >
          {state && !state.HomeSearchOpen && <BiDollar size={24} />}
          {state && state.HomeSearchOpen && <IoCloseCircleOutline size={24} />}
        </button> */}
        <button
          className='text-md text-gray-600 p-0.5'
          onClick={toggleHomeSearch}
        >
          {state && !state.homeSearchOpen && <IoSearch size={24} />}
          {state && state.homeSearchOpen && <IoCloseCircleOutline size={24} />}
        </button>
        <Link to='/app/cart' className='text-md text-gray-600 p-0.5 relative'>
          <IoCartOutline size={24} />
          {cart?.length > 0 && (
            <div className='cartQty px-2 py-1 bg-black text-white absolute -top-2 -right-2 rounded-full text-xs'>
              {cart?.length}
            </div>
          )}
        </Link>
        <button className='text-md text-gray-600 p-0.5' onClick={toggleSideNav}>
          {state && !state.sideNavOpen && <HiOutlineMenuAlt1 size={24} />}
          {state && state.sideNavOpen && <IoCloseCircleOutline size={24} />}
        </button>
      </div>
      <SideNav />
      <Filter />
    </nav>
  );
};
const MemoNav = React.memo(Nav);
export default MemoNav;
