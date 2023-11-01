import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
const Header = ({onPage}) => {
  let navigate= useNavigate()
  return (
    <div className="header">
      <div className='logo'>
        QEstate
      </div>
      {
        onPage==="home" ? (
            <div className="nav-link" onClick={()=>navigate("/explore")}>
               <span>Explore</span>
            </div>
        )
        :
        (
          <div className="nav-link" onClick={()=>navigate("/")} >
             <span>Featured Listings</span>
          </div>
      )
      }
    </div>
  )
}

export default Header
