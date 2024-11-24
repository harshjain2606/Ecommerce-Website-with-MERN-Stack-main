import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: "order",
    initialState:{
        orderDetail:{},
        userOrders: [],
        loading:false,
        isOrderDeleted:false,
        adminOrders:[],
        isOrderUpdated:false
    },
    reducers:{
        createOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order
            }
        },
        createOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        userOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        userOrderSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                userOrders:action.payload.order
            }
        },
        userOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        orderDetailRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        orderDetailSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                orderDetail:action.payload.order
            }
        },
        orderDetailFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        adminOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminOrders:action.payload.orders
                
            }
        },
        adminOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        deleteOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        deleteOrderSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                isOrderDeleted:true
            }
        },
        deleteOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        updateOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        updateOrderSuccess(state,action){
            
            return{
                ...state,
                loading:false,
                isOrderUpdated:true
            }
        },
        updateOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearOrderDeleted(state,action){
            return{
                ...state,
                isOrderDeleted:false
            }
        },
        clearOrderUpdated(state,action){
            return{
                ...state,
                isOrderUpdated:false
            }
        }


    }
});

const {actions,reducer} = orderSlice;

export const {createOrderFail,createOrderRequest,createOrderSuccess,clearError,userOrderFail,userOrderRequest,userOrderSuccess,orderDetailFail,orderDetailRequest,orderDetailSuccess,adminOrderFail,adminOrderRequest,adminOrderSuccess,deleteOrderFail,deleteOrderRequest,deleteOrderSuccess,updateOrderFail,updateOrderRequest,updateOrderSuccess,clearOrderDeleted,clearOrderUpdated}=actions;

export default reducer