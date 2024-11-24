import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {NavDropdown} from 'react-bootstrap'

const Sidebar = ({page}) => {
    const navigate = useNavigate()
  return (
    <div class="sidebar-wrapper">
        <nav id="sidebar">
            <ul class="list-unstyled components">
            <li>
                <Link className={page.includes("Dashboard") && 'active'} to="/admin/dashboard"><i class="fa fa-tachometer-alt"></i> Dashboard</Link>
            </li>
    
            <li>
                <NavDropdown title={
                    <><i className='fa fa-product-hunt'></i> <span>Product</span></>
                }>
                    <NavDropdown.Item onClick={()=> navigate('/admin/products')}><i className='fa fa-shopping-basket'></i>All</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=> navigate('/admin/products/create')}><i className='fa fa-plus'></i>Create</NavDropdown.Item>
                </NavDropdown>
            </li>

            <li>
                <Link to="/admin/orders" className={page.includes("Order") && 'active'}><i class="fa fa-shopping-basket"></i> Orders</Link>
            </li>

            <li>
                <Link to="/admin/users" className={page.includes("User") && 'active'}><i class="fa fa-users"></i> Users</Link>
            </li>
            <li>
                <Link to="/admin/reviews" className={page.includes("Review") && 'active'}><i class="fa fa-users"></i> Reviews</Link>
            </li>
    
        </ul>
        </nav>
    </div>
  )
}

export default Sidebar