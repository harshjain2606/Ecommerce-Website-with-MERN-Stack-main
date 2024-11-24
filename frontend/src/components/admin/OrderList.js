import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from "../layouts/Loader"
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import { deleteOrders ,adminOrders as adminOrdersAction} from '../../actions/orderAction'
import {clearError, clearOrderDeleted} from "../../slices/orderSlice"

const OrderList = () => {
    const {adminOrders=[],loading = true,error,isOrderDeleted} = useSelector(state=>state.orderState)
    const dispatch=useDispatch()

    const deleteHandler = (e,id) => {
        e.target.disabled = true
        dispatch(deleteOrders(id))
    }


    const setOrders = () =>{
        const data = {
            columns:[
                {
                    label:"ID",
                    field:"id",
                    sort:"asc"
                },
                {
                    label:"Number of Items",
                    field:"noOfItems",
                    sort:"asc"
                },
                {
                    label:"Amount",
                    field:"amount",
                    sort:"asc"
                },
                {
                    label:"Status",
                    field:"status",
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

        console.log(adminOrders)
        adminOrders.forEach(order => {
            data.rows.push({
                id:order._id,
                noOfItems:order.orderItems.length,
                amount:`Rs.${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes("Processing")?"red":"green"}}>{order.orderStatus}</p>,
                actions:(
                    <>
                        <Link to={`/admin/order/${order._id}`} className='btn btn-primary '><i className='fa fa-pencil'></i></Link>
                        <Button onClick={e=>deleteHandler(e,order._id)} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        });
        return data
    }

    useEffect(()=>{
        if(isOrderDeleted){
            toast("Ordered Deleted Successfully",{
                type: 'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            })
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
        dispatch(adminOrdersAction())
    },[dispatch,error,isOrderDeleted])
    return (
        <div id='dashborad' className="row">
        <div id='db_sidebar' className="col-12 col-md-2">
            <Sidebar page={"Order"}/>
        </div>
        <div className="col-12 col-md-10  ">
        <h1 className="my-4 d-flex justify-content-center">Order List</h1>
        <>{loading ?<Loader/>:
            <MDBDataTable 
                data={setOrders()}
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

export default OrderList