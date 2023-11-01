import React from 'react'

const CheckBoxFilter = ({handlePriceChangeFilterChange,handleLocationFilterChange,priceChangeFilter,locationFilter}) => {
    const locations=["Sintra","Amper","Swinna","Hanji"]
    const prices =["0-300000","300001-600000","600001-1000000"]
  return (
    <div className='checkbox-filter-container'>
        <div className="filter">
            <h2>Location</h2>
            {
                locations.map((location,index)=>{
                    return(
                        <div key={index}>
                            <label>
                                <input type='checkbox' value={location} onChange={handleLocationFilterChange} checked={locationFilter.includes(location)}/>
                                {location}
                            </label>
                        </div>
                        
                    )
                })


            }
        </div>     
         <div className="filter">
            <h2>Price Range</h2>
            {
                prices.map((price,index)=>{
                    return(
                        <div key={index}>
                            <label>
                                <input type='checkbox' value={price} onChange={handlePriceChangeFilterChange} checked={priceChangeFilter.includes(price)}/>
                                {price}
                            </label>
                        </div>
                        
                    )
                })

                
            }
        </div>     
    </div>
  )
}

export default CheckBoxFilter
