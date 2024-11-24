import React, { useEffect, useState } from 'react'
import MetaData from './MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Loader from './Loader'
import Product from '../product/Product'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination'


const Shop = ({setPage}) => {
    const dispatch = useDispatch()
    const {products,loading,error,resPerPage,productsCount}=useSelector((state)=> state.productsState)
    const [currentPage,setCurrentPage]=useState(1)
    setPage("Shop")
    const setCurrentPageNo=(pageNo)=>{
        setCurrentPage(pageNo)
        
    }
    
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
            <h1 id='Shop'>Shop Our Latest Product</h1>
            <section id="home_products" >
            <div className="row">
                { products && products.map(product =>(
                    <Product col={3} key={product._id} product={product}/>
                ))} 
            </div>
            </section>
            {productsCount>0 && productsCount > resPerPage?
            <div className='d-flex justify-content-center mt-5'>
                <Pagination
                    
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={productsCount}
                    itemsCountPerPage={resPerPage}
                    nextPageText={'>>'}
                    prevPageText={"<<"}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass={'page-item'}
                    linkClass={'page-link font'}
                />
            </div>:null}
            </>
            }       
        </>
  )
}

export default Shop