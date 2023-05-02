import React, { useState } from 'react'
import { PieChartTwoTone } from '@ant-design/icons';
// import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* <Link to="/" className="navbar-logo">
            CCC Group 5 <PieChartTwoTone />
          </Link> */}
          CCC Group 5 <PieChartTwoTone />
          <div className="menu-icon">
            
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
