import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { CartContext } from '../Context/CartContext.jsx';
import './GetOrder.css'
import { Link } from 'react-router-dom';

export default function GetOrder() {

    const[customLoading,setCustomLoading]=useState(true);

 const {getOrderContext}=useContext(CartContext);


const getOrder=async ()=>{
    try{
    const res=await getOrderContext();
    console.log(res,'ordeeeeeeeeeeer');
    if(res.message=='success'){
        setCustomLoading(false);
    return res;
    }
}
catch(err){
    console.log(err);
}
}


const {data,isLoading}=useQuery('userOrders',getOrder);
console.log(data,'ordeeeeeeeeeers');

/*---------------------------------------------------------------------------*/
// const productId=data?.orders[0].products[0].productId;
//    console.log(productId);


//    const {getProductDetailsContext}=useContext(CartContext);

//    const getProductDetails=async (productId)=>{
//      const res=await getProductDetailsContext(productId);
//      // console.log(res,'ordeeeeeeeeeeer');
//      return res;
//    }
//    const {data:dataa,isLoading:isLoadingg}=useQuery(['product',productId],()=>getProductDetails(productId)); // pas a parameter with userQuery function ,see this link https://www.calvintorra.com/blog/how-to-pass-parameters-to-usequery-using-axios
//    console.log(dataa,'producttttttttttttttttt');



// //   getProductDetails(productId).then((res)=>{
// //     console.log(res,'producttttttttttttttttt');
// //   })

/*----------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/
//  const [productinfo,setproduct]=useState({})
// const arrProducts=[];


 

//  const getprodName=(id)=>{
//   const {data:prodName,isLoading:isLoadingxg}=useQuery(['productdet','id'],()=>getdet(id)); // pas a parameter with userQuery function ,see this link https://www.calvintorra.com/blog/how-to-pass-parameters-to-usequery-using-axios
//   //console.log(prodName,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
//   return prodName;
// }

// let productInfo=getprodName('656f2b4f40318c1d253442dd');


if(customLoading){
    return <h2>loading........</h2>
}

  return (
    <div className='bg-success container text-center m-auto p-3'>
{
    data.orders.length>0?
    <div className='text-center bg-dark text-white p-3 w-50 m-auto'>
        <h2 > Your Orders </h2>
    </div>
    :
    <h2 className='text-danger fs-1 p-5'> No orderes recoreded for you</h2>
}
<div className='row gap-3 m-5'>

   {
data?.orders?
data?.orders.map((order,index)=>{

return (
<div className='col-lg-12 border border-success border-5 p-3 bg-light m-3' key={index}>
<div className=' '>
        <h2 className='w-75 bg-dark text-white m-auto mb-3 p-1'> Order No{index+1} </h2>
    </div>
    
<table className="table border border-dark border-3 ">
  <thead>
  </thead>
  <tbody>
    <tr>
    <th scope="col" className=" border border-dark">status</th>
  
      <td scope="col">{order.status}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">address</th>
      <td scope="col">{order.address}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">phone number</th>
      <td scope="col">{order.phoneNumber}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">Coupon name</th>
      <td scope="col">{order.CouponName?order.CouponName:'No coupon was used'}</td>
    </tr>
    <tr>
    <th scope="col"className=" border border-dark">final total order price</th>
      <td scope="col">${order.finalPrice}</td>
    </tr>
    
    <tr>
    <th scope="col" className=" border border-dark">Payment type</th>
      <td scope="col">{order.paymentType}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">  created at</th>
      <td scope="col">{order.  createdAt}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">  Updated at</th>
      <td scope="col">{order. updatedAt}</td>
    </tr>

      </tbody>
</table>



 <div className='row'>
    <p className='fw-bold fs-4'> Ordered Products are:</p> 
    {
    order.products.map((product,productIndex) =>{

     return (
         <div className="col-lg-12 ">
          <p className='fw-bold fs-5'> Product number {productIndex+1}</p> 
<table className="table border border-dark border-3 ">
  <thead>
  </thead>
  <tbody>
    <tr>
    <th scope="col" className=" border border-dark">Product Name</th>
  
      <td scope="col">{product.productId.name}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">Quantity</th>
      <td scope="col">{product.quantity}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">Original Unit Price</th>
      <td scope="col">${product.unitPrice}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">Discount per unit Price</th>
      <td scope="col">${product.productId.discount}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">Final total Price</th>
      <td scope="col">${product.finalPrice}</td>
    </tr>
    <tr>
    <th scope="col" className=" border border-dark">Product Image</th>
      <td scope="col" className='img-field-container'>
        <img src={product.productId.mainImage.secure_url} className='img-fluid'/>
        </td>
    </tr>
<tr className=" text-center m-auto">
    <th scope="col" className="p-5 text-center m-auto"><Link className='bg-info rounded-2 text-white fs-5 p-2' to={`/products/${product.productId._id}`}>                   <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#d92417" d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"/></svg>                   
    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#d92417" d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"/></svg>                   
 ... Visit the product detail page ...     <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#d92417" d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"/></svg>                   
 <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#d92417" d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"/></svg>                   
</Link></th>
      
    </tr>

   

      </tbody>
</table>

     </div>
     )

    }) 
   }


</div>

</div>
)
})
:
''

   }
   
   </div>

   
   </div>
  )


}
