import React,{ useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { OrderDetail as OrderDetailAction, updateOrders } from '../../actions/orderAction'
import { clearOrderUpdated,clearError } from '../../slices/orderSlice'



const UpdateOrder = () => {
    const {loading,isOrderUpdated,error,orderDetail} = useSelector(state=>state.orderState)
    const {user={},orderItems=[],shippingInfo={},totalPrice=0,paymentInfo={}}=orderDetail
    const isPaid=paymentInfo.status==="succeeded"?true:false;
    const [orderStatus,setOrderStatus] = useState("Processing")
    const {id:orderId}=useParams()


    const dispatch = useDispatch()

    
  const submitHandler = (e) => {
     e.preventDefault()
     const orderData={}
     orderData.orderStatus= orderStatus
    dispatch(updateOrders(orderId,orderData))
    }
     
    
  



 

  useEffect(()=>{
    if(isOrderUpdated){
        toast("Order Updated Successfully",{
            type: 'success',
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearOrderUpdated())
        })
        return;
    }
    if(error){
        toast.error(error,{
            position: toast.POSITION.TOP_CENTER,
            type:'error',
            onOpen:()=>{dispatch(clearError())}
        })
        return
    } 
    dispatch(OrderDetailAction(orderId)) 
    
  },[isOrderUpdated,error,dispatch,orderId])

  useEffect(()=>{
    if(orderDetail._id){
        setOrderStatus(orderDetail.orderStatus)
    }
  },[orderDetail])

  return (
    <div id='dashborad' className="row">
        <div id='db_sidebar' className="col-12 col-md-2">
            <Sidebar page={"Order"}/>
        </div>
        <div className="col-12 col-md-10">
        <>
        <div className="row d-flex justify-content-around">
                <div className="col-12 col-md-8 mt-4 order-details">

                    <h1 className="my-5">Order # {orderDetail._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNumber}</p>
                    <p className="mb-4"><b>Address:</b>{shippingInfo.address},{shippingInfo.city},{shippingInfo.postalCode},{shippingInfo.state},{shippingInfo.country}</p>
                    <p><b>Amount:</b> Rs.{totalPrice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className={isPaid?"greenColor":"redColor"} ><b>{isPaid?"Paid":"Not Paid"}</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className={orderStatus && orderStatus.includes("Delivered")?"greenColor":"redColor"} ><b>{orderStatus}</b></p>


                    <h4 className="my-4">Order Items:</h4>

                    <hr />
                    <div className="cart-item my-1">
                        {orderItems && orderItems.map(item=>(
                            <div className="row my-5">
                            <div className="col-4 col-lg-2">
                                <img src={item.image} alt={item.name} height="45" width="65" />
                            </div>

                            <div className="col-5 col-lg-5">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div>


                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>Rs.{item.price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{item.quantity} Piece(s)</p>
                            </div>
                        </div>
                        ))}
                                
                    </div>
                    <hr />
                </div>
                <div className="col-12 col-md-2 mt-5">
                  <h4 className='my-4'>Order Status</h4>
                  <div className='form-group'>
                    <select 
                    className="form-control"
                    onChange={e=>setOrderStatus(e.target.value)}
                    value={orderStatus}
                    name="status" >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button disabled={loading} onClick={submitHandler} className='btn btn-primary btn-block'>Update Status</button>
                </div>
            </div>
        </>
        </div>
    </div>
    
  )
}

export default UpdateOrder