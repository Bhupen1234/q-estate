import React from 'react'
import "./Header.css"
const Header = ({onPage}) => {
  return (
    <div className="header">
      <div className='logo'>
        QEstate
      </div>
      {
        onPage==="home" ? (
            <div className="nav-link">
               <span>Explore</span>
            </div>
        )
        :
        ""
      }
    </div>
  )
}

export default Header
