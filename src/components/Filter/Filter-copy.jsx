import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeFilter } from "../../redux/actions/client";
import { handleFilters } from "../../redux/actions/graph";
import { FaArrowLeft } from "react-icons/fa";
import { filter } from "../../constants/filter";

const Filter = () => {
  const state = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const closeFilterWrapper = () => {
    dispatch(closeFilter());
  };
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(filter[0]?.query);
  const [localFilter, setLocalFilter] = useState(filter);
  const [filterQueries, setFilterQueries] = useState(structuredClone(filter));

  const handleFilterQueries = () => {
    dispatch(handleFilters(selectedOptions));
    dispatch(closeFilter());
  };

  const FilterCheck = memo((props) => {
    const [checked, setChecked] = useState(props?.active);
    const handleCheck = (e) => {
      let tempOption = structuredClone(selectedOptions);
      tempOption?.forEach((temp) => {
        // check for the slug
        if (temp.slug == props?.query?.slug) {
          if (temp?.values?.includes(e.target.value)) {
            // check if the option selected is already in values
            // remove the option and set checked = false
            if (temp.values)
              temp.values = temp?.values?.filter(
                (val) => val !== e.target.value
              );
            setChecked(false);
          } else if (!temp?.values?.includes(e.target.value)) {
            //add the option and set checked = true
            if (temp.values) temp.values = [...temp.values, e.target.value];
            else temp.values = [e.target.value];
            setChecked(true);
          }
          if (temp.values == null || temp.values.length == 0) {
            tempOption = tempOption.filter(
              (tempVal) => tempVal.slug !== temp.slug
            );
          }
        }
      });
      setSelectedOptions(tempOption);
    };
    useEffect(() => {
      setChecked(
        selectedOptions
          ?.map((op) => op?.values)
          .flat()
          ?.includes(props?.option?.optionType)
      );
    }, [selectedOptions]);

    return (
      <div className='p-3' key={props?.option?.optionType}>
        <input
          type='checkbox'
          name={props?.query?.query}
          id={props?.query + props?.option?.optionType}
          value={props?.option?.optionType}
          checked={checked}
          onChange={(e) => handleCheck(e)}
          key={props?.option?.optionType}
        />

        <label
          className='w-full py-2 px-3 text-sm'
          htmlFor={props?.query + props?.option?.optionType}
        >
          {props?.option?.optionType}&nbsp;({props?.option?.available || 0})
        </label>
      </div>
    );
  });

  return (
    <>
      <section
        className={
          "sideNav flex flex-col fixed w-full h-full bg-white text-black items-start bottom-0 transition-all duration-300" +
          " " +
          (state.filterOpen ? "left-0" : "left-[-2500px]")
        }
      >
        <div className='filterTop  w-full flex  items-center justify-between px-6 py-2 border-b-2 border-b-stone-600/10'>
          <div className='flex items-center text-lg py-2'>
            <FaArrowLeft onClick={closeFilterWrapper} /> &nbsp;
            <span className='font-bold ml-4'>Filters</span>
          </div>
          <div
            className='text-[goldenrod] font-bold'
            onClick={() => {
              setSelectedOptions(
                filter?.map((query) => {
                  return {
                    slug: query?.slug,
                    values: [],
                  };
                })
              );
              handleFilterQueries();
            }}
          >
            Clear Filters
          </div>
        </div>
        <section className='filterMenuWrapper w-full h-full flex overflow-y-scroll'>
          <section className='filterMenu w-1/2 h-full'>
            <section className='queryMenu w-full h-full'>
              {localFilter?.map((query, idx) => (
                <div
                  key={query?.query}
                  className={
                    query?.query === currentFilter
                      ? "bg-[#000531] text-white filterQuery border-b-2  border-b-[#000531] w-full py-2 px-3 text-sm"
                      : "filterQuery border-b-2 w-full py-2 px-3 text-sm"
                  }
                  onClick={() => setCurrentFilter(query?.query)}
                >
                  {query?.query}
                </div>
              ))}
            </section>
          </section>
          <section className='filterMenu w-1/2 h-full bg-gray-50'>
            {localFilter
              ?.filter((query) => query?.query === currentFilter)
              ?.map((query, idx) => (
                <div key={query?.query}>
                  {query?.options?.map((option, idx) => (
                    <>
                      <FilterCheck
                        query={query}
                        option={option}
                        active={selectedOptions
                          ?.map((op) => op?.values)
                          .flat()
                          ?.includes(option?.optionType)}
                        key={option?.optionType}
                      />
                    </>
                  ))}
                </div>
              ))}
          </section>
        </section>
        <div
          className='filterBottom w-full flex items-center justify-center text-center py-3 bg-[#000531] text-white'
          onClick={() => {
            handleFilterQueries();
          }}
        >
          Apply Filters
        </div>
      </section>
    </>
  );
};

export default Filter;
