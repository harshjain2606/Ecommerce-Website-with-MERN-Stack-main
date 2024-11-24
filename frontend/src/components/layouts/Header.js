import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown,Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';


const Header = ({page}) => {

  const {isAuthenticated,user}=useSelector(state=>state.authState)
  const dispatch=useDispatch()
  const {items:cartItems} = useSelector(state=>state.cartState)
  const navigate = useNavigate()
  const logouthandler = ()=>{
    dispatch(logout)
    navigate('/')
  }
  
  return (
    <>
    <section id="header">
    <div className='d-flex'>
    <Link to="/">
      <img width="75px" src="/images/logo.png" alt='Azhagan Exports Logo'/>
    </Link>
    <Link to="/" id="ae">Azhagan Exports</Link>   
    </div>
    <div>
    
        <ul id="navbar">
          <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search/>
        </div>
            <li><Link className={page==="Home"?"font active":"font"} to={"/"}>Home</Link></li>
            <li><Link className={page==="Shop"?"font active":"font"} to={"/shop"} >Shop</Link></li>
            <li><Link className={page==="About"?"font active":"font"} to={"/about"} >About</Link></li>
            <div>
                {isAuthenticated?
                (
                  <Dropdown className=' d-inline'>
                    <Dropdown.Toggle variant='default text-dark pr-5' id='dropdown-basic'>
                      <figure className='avatar avatar-nav'>
                        <Image width="50px" src={user.avatar??"./images/default_avatar.png"}/>
                      </figure>
                      <span className={"font"} style={{color:"black"}}>{user.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                      {user.role === 'admin' &&<Dropdown.Item onClick={()=>{navigate('/admin/dashboard')}} className='text-dark'>DashBoard</Dropdown.Item>}
                      <Dropdown.Item onClick={()=>{navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{navigate('/orders')}} className='text-dark'>My orders</Dropdown.Item>
                      <Dropdown.Item onClick={logouthandler} className='text-danger'>Log out</Dropdown.Item>
                    </Dropdown.Menu>

                  </Dropdown>
                )
                :
                <Link to="/login" className="btn" id="login_btn">Login</Link>
                }
                
              </div>
            <li><Link to="/cart" className={"font"}><i className="fa fa-shopping-cart">{cartItems.length}</i></Link></li>

        </ul>
    </div>
    <div id="mobile">
        <a href="cart.html"><i class="far fa-shopping-bag"></i></a>
        <i id="bar" class="fas fa-outdent"></i>
    </div>
    </section>
    </>
  )
}

export default Header