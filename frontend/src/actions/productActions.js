import axios from "axios"
import { productsRequest, productsSuccess, productsFail, adminProductsRequest, adminProductsSuccess, adminProductsFail } from "../slices/productsSlice"
import { productRequest, productSuccess, productFail, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductSuccess, updateProductFail, updateProductRequest, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from "../slices/productSlice"


export const getProducts = (keyword,price,category,rating,currentPage) =>async(dispatch)=>{
    try{
        dispatch(productsRequest())
        let link=`/api/v1/products?page=${currentPage}`
        if(keyword){
            link += `&keyword=${keyword}`
            
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category){
            link += `&category=${category}`
        }
        if(rating){
            link += `&rating=${rating}`   
        }
        const {data}=await axios.get(link)
        dispatch(productsSuccess(data))
    }
    catch(err){
        //handle error
        dispatch(productsFail(err.response.data.message))

    }
}


export const getProduct =id => async(dispatch)=>{
    try{
        dispatch(productRequest())
        const {data}=await axios.get(`/api/v1/products/${id}`)
        dispatch(productSuccess(data))
        
    }
    catch(err){
        //handle error
        dispatch(productFail(err.response.data.message))

    }
}

export const createReview = reviewData => async(dispatch)=>{
    try{
        dispatch(createReviewRequest())
        const config={
            headers : {
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.put(`/api/v1/review`,reviewData,config)
        dispatch(createReviewSuccess(data))
        
    }
    catch(err){
        //handle error
        dispatch(createReviewFail(err.response.data.message))

    }
}

export const getAdminProducts  =id => async(dispatch)=>{
    try{
        dispatch(adminProductsRequest())
        const {data}=await axios.get('/api/v1/admin/products')
        dispatch(adminProductsSuccess(data))
    }
    catch(err){
        //handle error
        dispatch(adminProductsFail(err.response.data.message))

    }
}

export const craeteNewProduct  = productData => async(dispatch)=>{
    try{
        dispatch(newProductRequest())
        const {data}=await axios.post('/api/v1/admin/products/new',productData)
        dispatch(newProductSuccess(data))
    }
    catch(err){
        //handle error
        dispatch(newProductFail(err.response.data.message))

    }
}

export const deleteProduct  = id => async(dispatch)=>{
    try{
        dispatch(deleteProductRequest())
        await axios.delete(`/api/v1/admin/products/${id}`)
        dispatch(deleteProductSuccess())
    }
    catch(err){
        //handle error
        dispatch(deleteProductFail(err.response.data.message))

    }
}

export const updateProduct  = (id,productData) => async(dispatch)=>{
    try{
        dispatch(updateProductRequest())
        console.log(productData)        
        const {data}=await axios.put(`/api/v1/admin/products/${id}`,productData)
        console.log(data)
        dispatch(updateProductSuccess(data))
    }
    catch(err){
        //handle error
        dispatch(updateProductFail(err.response.data.message))

    }
}

export const getReviews = id =>async(dispatch)=>{
    try{
        dispatch(reviewsRequest())
        const {data}=await axios.get('/api/v1/admin/reviews',{params:{id}})
        dispatch(reviewsSuccess(data))
    }
    catch(err){
        //handle error
        dispatch(reviewsFail(err.response.data.message))

    }
}

export const deleteReviews = (productId,id) =>async(dispatch)=>{
    try{
        dispatch(deleteReviewRequest())
        await axios.delete('/api/v1/review',{params:{productId,id}})
        dispatch(deleteReviewSuccess())
    }
    catch(err){
        //handle error
        dispatch(deleteReviewFail(err.response.data.message))

    }
}