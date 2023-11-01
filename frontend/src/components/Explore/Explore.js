import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import config from "../../config";
import axios from "axios";
import CheckBoxFilter from "../CheckBoxFilter/CheckBoxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingTableView from "../ListingTableView/ListingTableView";

const Explore = () => {
  const [listingData, setListingData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceChangeFilter, setPriceChangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const fetchListings = async () => {
    try {
      let response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      let data = response.data.listings;
      setListingData(data);
    } catch (error) {
      console.error(error);
      setListingData([]);
    }
  };

  const handleLocationFilterChange = (event) => {
     if(event.target.checked){
      setLocationFilter((prevState)=>[...prevState,event.target.value])
       
     }
     else{
      setLocationFilter((prevState)=>prevState.filter((ele)=>ele!==event.target.value))
      
     }
  };

  const handlePriceChangeFilterChange = (event) => {
    if(event.target.checked){
      setPriceChangeFilter((prevState)=>[...prevState,event.target.value])
    
     }
     else{
      setPriceChangeFilter((prevState)=>prevState.filter((ele)=>ele!==event.target.value))
  
     }
  };
  const handleSortByChange = (event) => {
     setSortBy(event.target.value)
  };


  useEffect(()=>{
    fetchListings();
  },[])
  return (
    <div>
      {/* header */}
      <Header />
      <div className="property-listing-view">
        {/* checkboxFilters */}
        <CheckBoxFilter
          handleLocationFilterChange={handleLocationFilterChange}
          handlePriceChangeFilterChange={handlePriceChangeFilterChange}
          locationFilter={locationFilter}
          priceChangeFilter={priceChangeFilter}
        />
        {/* sortingFilters */}
        <SortingFilter  sortBy={sortBy} handleSortByChange={handleSortByChange}/>
        {/* ListingTableView  */}
        <ListingTableView listingData={listingData} sortBy={sortBy} priceChangeFilter={priceChangeFilter} locationFilter={locationFilter}/>
      </div>
    </div>
  );
};

export default Explore;
