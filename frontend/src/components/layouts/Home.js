import React, { useEffect, useState } from 'react'
import MetaData from './MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Loader from './Loader'
import Product from '../product/Product'


import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Home = ({setPage}) => {
    const dispatch = useDispatch()
    const {products,loading,error}=useSelector((state)=> state.productsState)
    const [currentPage,setCurrentPage]=useState(1)
    setPage("Home")
    
    useEffect(()=>{
        if(error){
            return toast.error(error)
        }
        dispatch(getProducts(null,null,null,null,currentPage))
    },[error,dispatch,currentPage])

    return (
        <>
        
            {loading?<Loader/>:
            <>
            <MetaData title={"Buy Best Products"}/>
            <section id="hero">
                <h2>Embrace Elegance:</h2>
                <h1>Unveil the Timeless</h1>
                <h1 class="fo">Beauty of Sarees! </h1>
                <p>Save more with coupons & up to 60% off!</p>
                <button ><Link to="/shop">Shop now</Link></button>

            </section>
            <div id="feature" class="section-p">
            <div class="fe-box">
                <img src="./images/features/f1.png" alt=""/>
                <h6>Free Shipping</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f2.png" alt=""/>
                <h6>Online order</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f3.png" alt=""/>
                <h6>Save Money</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f4.png" alt=""/>
                <h6>Promotion</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f5.png" alt=""/>
                <h6>Happy Sell</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f6.png" alt=""/>
                <h6>24/7 Support</h6>
            </div>
            
        </div>
        <section id="feat">
            <h1>Featured Product</h1>
            <h5>Summer Collection New Modern  Design</h5>
        </section>
            
            <section id="home_products" >
            <div className="row">
                { products && products.slice(0,4).map(product =>(
                    
                    <Product col={3} key={product._id} product={product}/>
                ))} 
            </div>
            </section>
            </>
            }       
        </>
  )
}

export default Home
