import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../layouts/Loader"
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import { clearError, clearReviewDeleted } from '../../slices/productSlice'
import { deleteReviews, getReviews } from '../../actions/productActions'

const ReviewList = () => {
    const {reviews=[],loading = true,error,isReviewDeleted } = useSelector(state=>state.productState)
    const dispatch=useDispatch()
    const [productId,setProductId]=useState("")

    const deleteHandler = (e,id) => {
        e.target.disabled = true
        dispatch(deleteReviews(productId,id))
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(getReviews(productId))
    }


    const setReviews = () =>{
        const data = {
            columns:[
                {
                    label:"ID",
                    field:"id",
                    sort:"asc"
                },
                {
                    label:"Rating",
                    field:"rating",
                    sort:"asc"
                },
                {
                    label:"User",
                    field:"user",
                    sort:"asc"
                },
                {
                    label:"Comment",
                    field:"comment",
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

        reviews.forEach(review => {
            data.rows.push({
                id:review._id,
                rating:review.rating,
                user:review.user.name,
                comment: review.comment,
                actions:(
                    <>
                        <Button onClick={e=>deleteHandler(e,review._id)} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        });
        return data
    }

    useEffect(()=>{
        if(isReviewDeleted){
            toast("Review Deleted Successfully",{
                type: 'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(productId))
            return;
        }
        if(error){
            toast.error(error ,{
                position: toast.POSITION.TOP_CENTER,
                type:'error',
                onOpen:()=>{dispatch(clearError())}
            })
            return
        }
        
    },[dispatch,error,isReviewDeleted,productId])
    return (
        <div id='dashborad' className="row">
        <div id='db_sidebar' className="col-12 col-md-2">
            <Sidebar page={"Product"}/>
        </div>
        <div className="col-12 col-md-10">
        <h1 className="my-4 d-flex justify-content-center">Review List</h1>
        <div className='row justify-content-center mt-5'>
            <div className='col-5'>
                <form onSubmit={submitHandler}>
                    <div className='form-group'>
                        <label >Product Id</label>
                        <input type="text" 
                                onChange={e=>setProductId(e.target.value)}
                                value={productId}
                                className='form-control'/>
                    </div>
                    <button type='submit' disabled={loading} className='btn btn-primary btn-block py-2'>
                        Search
                    </button>
                </form>
            </div>
        </div>
        <>{loading ?<Loader/>:
            <MDBDataTable 
                data={setReviews()}
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

export default ReviewList