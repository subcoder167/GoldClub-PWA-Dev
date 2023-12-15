import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { closeSideNav } from "../../redux/actions/client";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { logOut } from "../../functions";
const SideNav = () => {
  const state = useSelector((state) => state.client);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    closeNav();
  }, [location.pathname]);
  const closeNav = () => {
    dispatch(closeSideNav());
  };
  return (
    <>
      <section
        className={
          "sideNav flex flex-col fixed w-full h-[100dvh] overflow-y-scroll bg-white text-black items-center justify-center bottom-0 transition-all duration-300" +
          " " +
          (state.sideNavOpen ? "right-0" : "right-[-2500px]")
        }
        //   {

        //   }
      >
        <div className='navTop absolute top-0 w-full flex items-center justify-between px-6 py-2'>
          <Link to='/app/home' className='logo'>
            <img
              src={localStorage.getItem(`vjw-${window.location.hostname}logo`)}
              // {process.env.PUBLIC_URL + "/logo_nav.png"}
              alt=''
              className='h-20 object-contain aspect-square'
            />
          </Link>
          <div
            className='closeBtn px-7 py-2 
            
             border-2 border-black rounded-full'
            onClick={closeNav}
          >
            Close
          </div>
        </div>
        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <h6 className='text-md sm:text-lg font-bold'>Shop By Gender </h6>
          <ul className='list-none mt-1 text-center'>
            <li>
              <Link to='products?gender=kids' onClick={closeNav}>
                {" "}
                Kids
              </Link>
            </li>
            <li>
              <Link to='products?gender=male' onClick={closeNav}>
                {" "}
                Male
              </Link>
            </li>
            <li>
              <Link to='products?gender=female' onClick={closeNav}>
                {" "}
                Female
              </Link>
            </li>
            <li>
              <Link to='products?gender=unisex' onClick={closeNav}>
                {" "}
                Unisex
              </Link>
            </li>
          </ul>
        </div>

        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link to='products'>
            <h6 className='text-md sm:text-lg font-bold'>Browse products </h6>
          </Link>
        </div>

        {/* <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link to='settings'>
            <h6 className='text-md sm:text-lg font-bold'>Settings </h6>
          </Link>
        </div> */}
        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link to='my-orders'>
            <h6 className='text-md sm:text-lg font-bold'>My Orders </h6>
          </Link>
        </div>
        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link to='my-favourites'>
            <h6 className='text-md sm:text-lg font-bold'>My Favourites </h6>
          </Link>
        </div>
        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link to='profile'>
            <h6 className='text-md sm:text-lg font-bold'>My Profile </h6>
          </Link>
        </div>
        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link to='/app/home#faq'>
            <h6 className='text-md sm:text-lg font-bold'>FAQs</h6>
          </Link>
        </div>
        <div className='navGroup flex flex-col items-center justify-center my-2'>
          <Link
            to='/login'
            onClick={
              localStorage.getItem(`vjw-${window.location.hostname}user`) &&
              logOut
            }
          >
            <h6 className='text-md sm:text-lg font-bold'>
              {localStorage.getItem(`vjw-${window.location.hostname}user`) ? (
                <span className='flex items-center'>
                  <BiLogOut size={25} />
                  &nbsp; LogOut
                </span>
              ) : (
                <span className='flex items-center'>
                  <BiLogIn size={25} />
                  &nbsp; Login
                </span>
              )}
            </h6>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SideNav;
