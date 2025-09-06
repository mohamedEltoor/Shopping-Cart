import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
function Navbar() {
  const navLinks = [{name : "Home" , path : "/"} , {name : "Store" , path : "/store"} , {name : "About" , path : "/about"} 
  ] 
  
  return (
    <div className='navbar'>
       <ul>
        {navLinks.map((link,index)=><li key={index}><Link to={link.path} >{link.name}</Link></li>)}
       </ul>
    </div>
  )
}

export default Navbar
