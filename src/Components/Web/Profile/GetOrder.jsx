import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { CartContext } from '../Context/CartContext.jsx';
import axios from 'axios';

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
<div className='col-lg-3' key={index}>
<div className=' '>
        <h2 className='w-75 bg-white m-auto mb-3 p-1'> Order No{index+1} </h2>
    </div>
    



<table className="table border border-dark ">
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
    <th scope="col"className=" border border-dark">final price</th>
      <td scope="col">{order.finalPrice}</td>
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


{/* <div className='row'>
    <p className='fw-bold'> Ordered Products are:</p> */}
{
  //  order.products.map((product,index) =>{
  //   getProductinfofnc(product.productId);
  //   arrProducts[index]=productinfo;
  //   return (
  //       <div>
  //   <p> productname: {arrProducts[index].name} </p>
  //   {/* <p> product quantity: {product.quantity} </p> */}
  //   {/* <p> product unit price: {product.unitPrice} </p>
  //   <p> product total price: {product.finalPrice} </p> */}

  //   </div>
  //   )

  //  }) 
}

{/* </div> */}

</div>
)
})
:
''

   }
   
   </div>

   
   </div>
  )

// return(


// <h2> {data.orders[0].status}</h2>

// )

}
