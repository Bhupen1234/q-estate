import React, {  useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit} from 'react-icons/fa';
import EditModal from '../EditModal/EditModal';

const ListingTableView = ({listingData,sortBy,priceChangeFilter,locationFilter}) => {
  //STATES :
  //currentPage
  //filteredData
  //selectedRows

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData,setFilteredData] = useState([])
  const [selectedRows,setSelectedRows] = useState([]) 
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  let itemsPerPage=10;


  let displayData = applyFilters(filteredData,sortBy,priceChangeFilter,locationFilter)
  const totalPages = Math.ceil(displayData.length/itemsPerPage);
  const startIndex = (currentPage-1) * itemsPerPage;
  const lastIndex = startIndex+ itemsPerPage;
  const isAllSelected = selectedRows.length === itemsPerPage;

  // const totalPages;
  // const startIndex;
  // const lastIndex;

  //EDITING Functions

   const handleOpenModal=(item)=>{
       setIsEditModalOpen(true);
       setEditedItem(item);
       
   }

   const handleCloseModal=()=>{
      setIsEditModalOpen(false)
      setEditedItem(null);
   }

   const handleSaveEditedData=(editedItem)=>{
       const updatedData = [...filteredData];
       const indexTobeEdited = updatedData.findIndex((item)=>(
        item.property_id === editedItem.property_id
       ))


       if(indexTobeEdited !== -1){
        updatedData[indexTobeEdited] =editedItem;
        setFilteredData(updatedData)
       }


       setEditedItem(null);
   }


  //DELETE Functions
   const handleDeleteSelected =()=>{
    const updatedData = filteredData.filter((ele)=> !selectedRows.includes(ele.property_id));
    const updatedTotalPages = Math.ceil(updatedData.length/itemsPerPage);

      if(currentPage>updatedTotalPages){
        setCurrentPage(updatedTotalPages);
      }
      setFilteredData(updatedData);
      setSelectedRows([])

   }
   
   const handleDeleterow =(id)=>{
      const updatedData = filteredData.filter((ele)=> ele.property_id !==id);
      const updatedTotalPages = Math.ceil(updatedData.length/itemsPerPage);

      if(currentPage>updatedTotalPages){
        setCurrentPage(updatedTotalPages);
      }
      setFilteredData(updatedData);

   }  


  //CHECKBOX Handlers
  const selectIndividualRow=(event,id)=>{
      let isChecked =event.target.checked;
       if(isChecked){
        setSelectedRows([...selectedRows,id])
       }
       else{
        let filtered = selectedRows.filter((rowId)=> rowId!==id )
        setSelectedRows(filtered)
       }



  }


  useEffect(()=>{
    console.log("Selected Rows :" , selectedRows);

  },[selectedRows])


  const selectAllRows =(event,data)=>{
      let isChecked = event.target.checked

      if(isChecked){
         const startIndex = (currentPage-1) *itemsPerPage;
         let rowSelected =[]
         for(let i=startIndex;i< startIndex + itemsPerPage;i++){
           if(i<displayData.length){
            rowSelected.push(displayData[i].property_id)
           }
           else{
            rowSelected.push(Math.random())
           }


         }
         setSelectedRows(rowSelected)
      }
      else{
        setSelectedRows([])
      }
  }



 //Common Functions
  function applyFilters(filteredData,sortBy,priceChange,location){
    let updatedData =[...filteredData]
    if(priceChange.length !== 0){
      updatedData = updatedData.filter((listing)=>{
        let found = false;
        priceChange.forEach((priceEntry) => {
          let low = priceEntry.split("-")[0]
          let high = priceEntry.split("-")[1]
          if(Number(listing.price)>= Number(low) && Number(listing.price)<=Number(high))
            found=true
        });
          
        return found;
      })
    }
    

    if(location.length !==0){
      updatedData =updatedData.filter((listing)=>location.includes(listing.city))
    }

    if(sortBy==="price"){
        updatedData.sort((firstListing,secondlisting)=>(firstListing.price - secondlisting.price))
    }
    else if(sortBy ==="date"){
        updatedData.sort((firstListing,secondlisting)=> new Date(firstListing.listing_date) - new Date(secondlisting.listing_date))
    }
   

    // console.log("Updated Data :",updatedData);
    return updatedData;
  }


  const getPageNumbers =(totalPages)=>{
    const pageNumbers=[]

    for(let currPage=1 ;currPage<=totalPages;currPage++){
      pageNumbers.push(currPage)

    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers(totalPages)


  //PAGINATION Handlers
  const handleFirstPage =()=>{
    setCurrentPage(1)
  }

  const handleLastPage =()=>{
    setCurrentPage(totalPages)
  }

  const handlePreviousPage =()=>{
    setCurrentPage(currentPage-1)
  }


  const handleNextPage =()=>{
    setCurrentPage(currentPage+1)
  }

  const handlePageClick =(page)=>{
    setCurrentPage(page)
  }

  useEffect(()=>{
   setFilteredData(listingData)
  },[listingData])

  useEffect(()=>{
     setCurrentPage(1)
     setSelectedRows([]);
  },[priceChangeFilter,locationFilter])

  return (
    <div className="listing-table-container">
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox"  onChange={(event)=>selectAllRows(event,displayData)} checked={isAllSelected}/>
          </th>
          <th>Property Name</th>
          <th>Price</th>
          <th>Address</th>
          <th>Listing Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {displayData.slice(startIndex,lastIndex).map((item)=>{
          return(

            <tr className={"table-row"} key={item.property_id}>
            <td>
             <input type="checkbox"  onChange={(event)=>selectIndividualRow(event,item.property_id)}  checked={selectedRows.includes(item.property_id)}/>
            </td>
             <td className="property_name">{item.property_name}</td>
             <td>Rs. {item.price}</td>
             <td>{item.address}</td>
             <td>{item.listing_date}</td>
              <td className="action-items">
             
                 <AiFillDelete onClick={()=>handleDeleterow(item.property_id)}/>
                 <FaEdit onClick={()=>handleOpenModal(item)} />
              </td>
             </tr>
          )
        })
        }
        
      </tbody>
    </table>

    <div className='table-footer'>
       <button  onClick={handleDeleteSelected}>Delete Selected</button>
       <div className="pagination-container">
        <span>
          Page {totalPages<1 ? 0 : currentPage} of {totalPages}
        </span>

        <div className="pagination">
          <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
          <button onClick={handlePreviousPage}  disabled={currentPage === 1}>Previous</button>
          {
            pageNumbers.map((page)=>(
               <button type="button" key={page} onClick={()=>handlePageClick(page)}>{page}</button>
            ))
          }
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          <button onClick={handleLastPage} disabled={currentPage === totalPages} >Last</button>

        </div>
       </div>
    </div>

    {
      isEditModalOpen && <EditModal onClose={handleCloseModal} onSave={handleSaveEditedData} item={editedItem}/>
    }
    </div>
  )
}

export default ListingTableView
