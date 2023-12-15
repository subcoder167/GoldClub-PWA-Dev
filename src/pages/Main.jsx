import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import Whatsapp from "../components/Floating/Whatsapp";

// import { ROLES } from "../constants/RoleConstants";
const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <section className="mainWrapper flex flex-col items-center justify-center mt-[65px] w-full ">
        {(
          <section className="w-full ">
            <Outlet />
          </section>
        ) || (
          <div>
            {" "}
            <center>Welcome to Jewellery Application</center>
            <div>
              <Link to="/login">Please Login here</Link>
            </div>
          </div>
        )}
      </section>
      <Whatsapp />

      <section className="w-full my-8">
        <Footer />
      </section>
    </>
  );
};

export default Main;
