import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo.png'
export default function Navbar({logedUser,removeUser}) {
function logOut() {
  removeUser()
  navigator('/login')
  
}
let navigator= useNavigate();
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-transparent  navbar-dark shadow-lg p-3">
  <div className="container">
    <Link className="navbar-brand" to="/home">
    <Link className="navbar-brand" to="/home">
      <img src={logo} alt="Logo" width="60"  className="d-inline-block align-text-center me-2"/>
       Game Over
    </Link>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {logedUser?  <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/all">All</Link>
        </li>
        <li class="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to='/plateform'  role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Plateform
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to='/plateform/pc'>Pc</Link></li>
            <li><Link className="dropdown-item" to='/plateform/browser'>browser</Link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to='/sortby'  role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Sort-by
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to='/sortby/released-date'>released-date</Link></li>
            <li><Link className="dropdown-item" to='/sortby/popularity'>popularity</Link></li>
            <li><Link className="dropdown-item" to='/sortby/alphabetical'>alphabetical</Link></li>
            <li><Link className="dropdown-item" to='/sortby/relevance'>relevance</Link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to='/category'  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to='/category/racing'>racing</Link></li>
            <li><Link className="dropdown-item" to='/category/sports'>sports</Link></li>
            <li><Link className="dropdown-item" to='/category/social'>social</Link></li>
            <li><Link className="dropdown-item" to='/category/shooter'>shooter</Link></li>
            <li><Link className="dropdown-item" to='/category/open-world'>open-world</Link></li>
            <li><Link className="dropdown-item" to='/category/zombie'>zombie</Link></li>
            <li><Link className="dropdown-item" to='/category/fantasy'>fantasy</Link></li>
            <li><Link className="dropdown-item" to='/category/action-rgb'>action-rgb</Link></li>
            <li><Link className="dropdown-item" to='/category/action'>action</Link></li>
            <li><Link className="dropdown-item" to='/category/flight'>flight</Link></li>
            <li><Link className="dropdown-item" to='/category/battel-royale'>battel-royale</Link></li>
          </ul>
        </li>

      
      </ul>:''}
     {logedUser? <span onClick={logOut} className="nav-link" to="/register"> <button className='btn btn-outline-info'>Log out</button>
          </span>
        :  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register"> <button className='btn btn-outline-info'>Join Free</button></Link>
        </li>
      </ul>}
    
      
         
      
    </div>
  </div>
</nav>
    </>
  )
}
