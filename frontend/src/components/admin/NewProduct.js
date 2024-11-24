import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { craeteNewProduct } from '../../actions/productActions'
import { toast } from 'react-toastify'
import { clearError, clearProductCreated } from '../../slices/productSlice'

const NewProduct = () => {
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("")
    const [stock,setStock]=useState(0)
    const [seller,setSeller]=useState("")
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const {loading,isProductCreated,error} = useSelector(state=>state.productState)
    const categories = [
        'Sarees',
        'Wooden Temple',
        'Shoe',
        'T-shirt',
        'Shirt',
        'Pant',
        'Watch'
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onImageChange = (e) => {
        const files = Array.from(e.target.files)
        files.forEach(file=>{
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState === 2){
                    setImagesPreview(oldArray=>[...oldArray,reader.result])
                    setImages(oldArray=>[...oldArray,file])
                }
            }
        reader.readAsDataURL(file)
        })
    }
  const submitHandler = (e) => {
     e.preventDefault()
     const formData = new FormData()
     formData.append('name',name)
     formData.append('price',price)
     formData.append('stock',stock)
     formData.append('description',description)
     formData.append('seller',seller)
     formData.append('category',category)
     {images.length!==0?
        images.forEach(image=>{
        formData.append('images',image)})
        (dispatch(craeteNewProduct(formData))
        ):toast.error("upload atleast one image of the product",{
        position: toast.POSITION.TOP_CENTER,
        type:'error',
        onOpen:()=>{dispatch(clearError())}
    })}
     
    
  }

  useEffect(()=>{
    if(isProductCreated){
        toast("Product Created Successfully",{
            type: 'success',
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearProductCreated())
        })
        navigate('/admin/products')
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
  },[isProductCreated,error,dispatch,navigate])

  return (
    <div id='dashborad' className="row">
        <div id='db_sidebar' className="col-12 col-md-2">
            <Sidebar page={"Product"}/>
        </div>
        <div className="col-12 col-md-10">
        <>
        <div className="wrapper my-5"> 
        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                onChange={e=>setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={e=>setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field" onChange={e=>setCategory(e.target.value)}>
                    <option value="">Select</option>
                    {categories.map(category=>(
                        <option key={category} value={category} >{category}</option>
                    ))}
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={e=>setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={e=>setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={onImageChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
                    {imagesPreview.map(image=>(
                        <img className='mt-3 mr-2' 
                            key={image} 
                            src={image} 
                            alt="Image Preview" 
                            width="55"
                            height="52"/>
                    ))}
            </div>

  
            <button
              id="login_button"
              type="submit"
              disabled={loading}
              className="btn btn-block py-3"
            >
              CREATE
            </button>

          </form>
    </div>
        </>
        </div>
    </div>
    
  )
}

export default NewProduct