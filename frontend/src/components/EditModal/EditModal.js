import React, { useState } from 'react'

const EditModal = ({onClose, onSave , item}) => {
    const [editedItem,setEditedItem] = useState({...item})
    

    const handleInputChange =(event)=>{
      const {name , value} = event.target;
      setEditedItem((prevState)=>({...prevState,[name]:value}))
    }

    const handleSaveItem =()=>{
         onSave(editedItem);
         onClose()
    }

  return (
    <div className="modal">
        <h3>Edit Property</h3>
       <div className="modal-content">
          <label>Property Name</label>
          <input type="text" name="property_name" value={editedItem.property_name} onChange={handleInputChange}/>

          <label >Price</label>
          <input type="number" name="price" value={editedItem.price} onChange={handleInputChange}/>

          <label >Address</label>
          <input type="text" name="address" value={editedItem.address} onChange={handleInputChange}/>
       </div>
       <div className='modal-buttons'>
           <button onClick={onClose}>Close</button>
           <button onClick={handleSaveItem}>Save</button>
       </div>
    </div>
  )
}

export default EditModal
