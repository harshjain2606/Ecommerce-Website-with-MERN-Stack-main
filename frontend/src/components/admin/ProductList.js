import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearError, clearProductDeleted } from '../../slices/productSlice'
import { deleteProduct, getAdminProducts } from '../../actions/productActions'
import Loader from "../layouts/Loader"
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'


const ProductList = () => {
    const {products=[],loading,error} = useSelector(state=>state.productsState)
    const {isProductDeleted,error:productError} = useSelector(state=>state.productState)
    const dispatch=useDispatch()

    const deleteHandler = (e,id) => {
        e.target.disabled = true
        dispatch(deleteProduct(id))
    }


    const setProducts = () =>{
        const data = {
            columns:[
                {
                    label:"ID",
                    field:"id",
                    sort:"asc"
                },
                {
                    label:"Name",
                    field:"name",
                    sort:"asc"
                },
                {
                    label:"Price",
                    field:"price",
                    sort:"asc"
                },
                {
                    label:"Stock",
                    field:"stock",
                    sort:"asc"
                },
                {
                    label:"Actions",
                    field:"actions",
                    sort:"asc"
                }
            ],
            rows:[]
        }

        products.forEach(product => {
            data.rows.push({
                id:product._id,
                name:product.name,
                price:`Rs.${product.price}`,
                stock:product.stock,
                actions:(
                    <>
                        <Link to={`/admin/products/${product._id}`} className='btn btn-primary '><i className='fa fa-pencil'></i></Link>
                        <Button onClick={e=>deleteHandler(e,product._id)} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        });
        return data
    }

    useEffect(()=>{
        if(isProductDeleted){
            toast("Product Deleted Successfully",{
                type: 'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }
        if(error||productError){
            toast.error(error ||productError ,{
                position: toast.POSITION.TOP_CENTER,
                type:'error',
                onOpen:()=>{dispatch(clearError())}
            })
            return
        }
        dispatch(getAdminProducts())
    },[dispatch,error,isProductDeleted,productError])
    return (
        <div id='dashborad' className="row">
        <div id='db_sidebar' className="col-12 col-md-2">
            <Sidebar page={"Product"}/>
        </div>
        <div className="col-12 col-md-10">
        <h1 className="my-4 d-flex justify-content-center">Product List</h1>
        <>{loading ?<Loader/>:
            <MDBDataTable 
                data={setProducts()}
                bordered
                striped
                hover
                className='px-3'
            />
            }
        </>
        </div>
    </div>
    
  )
}

export default ProductList