import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import './CategoryProducts.css'
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext.jsx';
import { CartContext } from './../Context/CartContext';


export default function CategoryProducts() {
    const {id}=useParams('id');

    const getCategoryProducts=async()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`); 
        return(data);   


    }

const {data,isLoading}=useQuery('categoryProducts',getCategoryProducts);
console.log(data,'rtrtrtr'); // if you remove '?' ,error will happen as data took time to be received at the first time

const { userTokenContext, setUserTokenContext } = useContext(UserContext);
const {addToCartContext}=useContext(CartContext);
  const addToCart=async (productId)=>{
    const res=await addToCartContext(productId);
    console.log(res);
  }

if(isLoading){
  return <h2> loading.................</h2>
}
  return (
    <div className='container mt-5 bg-success py-4'>
      <div className='d-flex text-center column-gap-3'>
{
        data.products.length>0?data.products.map((product,index)=>{
          return(
           
            <div className="product-cardd rounded-4 ">
                <div className="product-itemm  bg-white rounded-4 d-flex flex-column  justify-content-center align-items-center" key={index}>
                <h2 className="mb-5 text-black fs-5 rounded-2 p-2">{product.name}</h2>
                <div className="imgContainerr rounded-circle">
                  <img src={product.mainImage.secure_url} className=" rounded-circle" />
                </div>
                {/* <div className='price bg-success w-25 h-25'> */}
                <h2 className="product-price mt-4 text-black fs-5 p-3 rounded-4">Price: ${product.price}</h2>
                {/* </div> */}
                <div className="avg-rating mb-3 d-flex align-items-center bg-white p-3 rounded-2">

<>
      {
       
        ((Math.round((Math.round(product.avgRating*2)/2)))-0.5)==((Math.round(product.avgRating*2)/2))?
        
        Array.from({ length: (Math.round(product.avgRating*2)/2)+0.5 }).map((_,index)=>{
          return (
          
          index==(Math.round(product.avgRating*2)/2)-0.5?<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/></svg>

         :
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
              )              
             })
        
          

         :
         Array.from({ length: (Math.round(product.avgRating*2)/2)}).map((_,index)=>{
         return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

         })

        
      }
      {
       (Math.round(product.avgRating*2)/2)<4.5?
       Array.from({ length:Math.round(5-(Math.round(product.avgRating*2)/2)-0.5)}).map((_,index)=>{
        return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#4b4949" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

        })
        :
     ''
      }
       </>
  
   
       </div>
                <div className="details d-flex text-align-center justify-content-center  mt-4 w-100 ">
                  <Link
                    className="product-detail bg-info p-2 rounded-2 w-100 fs-5"
                    to={`/products/${product._id}`}
                  >
                    details
                  </Link>
                </div>
                <button className='justify-content-center d-flex align-items-center bg-success rounded-2 w-100 fs-5 my-2' onClick={()=>addToCart(product._id)} disabled={userTokenContext?false:true}> <p className="me-2 text-white">Add to Cart</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 576 512"><path fill="#fff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/></svg>
                </button>
              </div>

              </div>
          

          )
        })
        :
        <div>
        <h2 className='bg-danger p-5 text-white'> Currently,no products available for this category....</h2>
        <p className='bg-danger p-5 text-white fs-5'> Products are currently availble for the following categories : Home&Kitchen and (أزياء الرجال)</p>
        </div>
      }
      </div>
    </div>
  )
}
