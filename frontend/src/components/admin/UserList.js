import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from "../layouts/Loader"
import {MDBDataTable} from 'mdbreact'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import { deleteUser, getUsers } from '../../actions/userActions'
import { clearError, clearUserDeleted } from '../../slices/userSlice'

const UserList = () => {
    const {users=[],loading = true,error,isUserDeleted } = useSelector(state=>state.userState)
    const dispatch=useDispatch()

    const deleteHandler = (e,id) => {
        e.target.disabled = true
        dispatch(deleteUser(id))
    }


    const setUsers = () =>{
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
                    label:"Email",
                    field:"email",
                    sort:"asc"
                },
                {
                    label:"Role",
                    field:"role",
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

        users.forEach(user => {
            data.rows.push({
                id:user._id,
                name:user.name,
                email:user.email,
                role: user.role,
                actions:(
                    <>
                        <Link to={`/admin/user/${user._id}`} className='btn btn-primary '><i className='fa fa-pencil'></i></Link>
                        <Button onClick={e=>deleteHandler(e,user._id)} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        });
        return data
    }

    useEffect(()=>{
        if(isUserDeleted){
            toast("User Deleted Successfully",{
                type: 'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
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
        dispatch(getUsers())
    },[dispatch,error,isUserDeleted])
    return (
        <div id='dashborad' className="row">
        <div id='db_sidebar' className="col-12 col-md-2">
            <Sidebar page={"User"}/>
        </div>
        <div className="col-12 col-md-10">
        <h1 className="my-4 d-flex justify-content-center">User List</h1>
        <>{loading ?<Loader/>:
            <MDBDataTable 
                data={setUsers()}
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

export default UserList