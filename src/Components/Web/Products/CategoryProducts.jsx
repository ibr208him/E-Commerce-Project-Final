import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import './CategoryProducts.css'

export default function CategoryProducts() {
    const {id}=useParams('id');

    const getCategoryProducts=async()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`); 
        return(data);   
    }

const {data,isLoading}=useQuery('categoryProducts',getCategoryProducts);
console.log(data,'rtrtrtr'); // if you remove '?' ,error will happen as data took time to be received at the first time

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
                <div className="details d-flex text-align-center justify-content-center  mt-4 w-100 ">
                  <Link
                    className="product-detail bg-info p-2 rounded-2 w-100 fs-5"
                    to={`/products/${product._id}`}
                  >
                    details
                  </Link>
                </div>
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
