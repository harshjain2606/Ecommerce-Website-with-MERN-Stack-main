import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { addCartItem } from '../../actions/cartAction'
import { toast } from 'react-toastify'

const Product = ({product,col}) => {
    const dispatch=useDispatch()
    const quantity=1
  return (
    <>
    <Link className="homeproduct" to={`/product/${product._id}`}>
    <section id="product1" class="section-p">
        <div class="procontainer">
        <div class="pro" >
            <div><div class="card ">
                
            <img className='card-img-top mx-auto'  alt={product.name} src={product.images && product.images[0].image}/>
                </div>
            </div>
            <div class="des">

                <h5>{product.name}</h5>
                <div className="ratings mt-auto">
                            <div className="rating-outer">
                            <div className="rating-inner"  style={{width: `${product.rating/5*100}%`}} ></div>
                            </div><br />
                            <span id="no_of_reviews">({ product.numberOfReviews } Review)</span>
                        </div>
                <h4>Rs.{product.price}</h4>
            </div>
            <Link onClick={()=>{dispatch(addCartItem(product._id,quantity));  toast("Cart Item Added",{type:"success",position:toast.POSITION.BOTTOM_CENTER})}}><i class="fa fa-shopping-cart cart"></i></Link>
            </div>
            </div>
        </section>
    </Link>
    </>
  )
}

export default Product