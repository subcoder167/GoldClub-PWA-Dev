import React, { useRef, useState } from "react";
import SectionTitle from "../Headings/SectionTitle";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchVal, setSearchVal] = useState(null);
  const searchInput = useRef();
  const navigate = useNavigate();
  const clearSearch = () => {
    setSearchVal(null);
    // searchInput.current.value = "";
  };

  const handleSearch = (e) => {
    e && e.preventDefault();
    e !== null && navigate("/app/products?search=" + searchVal);
    e == null && navigate("/app/products");
  };
  return (
    <section className="w-full">
      <SectionTitle title="Search" />
      <div className=" w-full text-black bg-white flex items-center justify-center border rounded-full shadow-md">
        <form
          className="overflow-hidden flex justify-between w-full py-2 px-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className=" text-black outline-none w-[85%] text-sm"
            placeholder="Enter product, type or categories..."
            onKeyUp={(e) => setSearchVal(e.target.value)}
            ref={searchInput}
          />
          {searchVal && searchVal.trim().length > 0 && (
            <div className="clearBtn px-2 text-sm" onClick={clearSearch}>
              &times;
            </div>
          )}
          <button className="flex items-center justify-center ">
            <svg
              className="h-4 w-4 text-grey-dark"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
