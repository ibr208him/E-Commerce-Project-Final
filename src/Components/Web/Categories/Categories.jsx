import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import './Categories.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faFacebook,faTwitter,faSquareInstagram,faSquareXTwitter}  from '@fortawesome/free-brands-svg-icons'


export default function Categories() {


  const getCategories=async()=>{
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=10`); // for limit=10, see the documentation to get active categories(by default by backened is set to 4) ,get all is made for admin
  return data;
  }

  const {data,isLoading}=useQuery('web-categories',getCategories); // first argument is the name of data at browser cach memory
                                                                   // here we use curly braces wherase with useState we use square brackets
  console.log(data?.categories,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

   if(isLoading){
   return <h2>Loading..........</h2>
   }


  return (

<div className='categories'>
<div className='container'>
<div className='categories-header d-flex align-items-center'>
  <div className='welcome row'>
    
  <div className='welcome-message col-6 my-auto p-5 d-flex flex-column align-items-center'> 
  <p><span className='fs-1 text-danger'>Welcome</span> to our online store!</p>
  <p>We look forward to serving you.  You can now get all your favourite products delivered direct to your door</p>
  <div className="social-mediaa d-flex justify-content-center gap-3 bg-white py-2 rounded-3 w-50">

 <Link className="social-mediaa" theme="secondary" to="https://www.facebook.com"> <FontAwesomeIcon className='social-media-iconn social-media-icon1' icon={faFacebook} /></Link>
<Link className="social-mediaa" theme="secondary" to="https://www.twitter.com"> <FontAwesomeIcon className='social-media-iconn social-media-icon2' icon={faTwitter} /> </Link>
<Link className="social-mediaa" theme="secondary" to="https://www.instagram.com"><FontAwesomeIcon className='social-media-iconn social-media-icon3' icon={faSquareInstagram} /> </Link>
<Link className="social-mediaa" theme="secondary" to="https://www.tiktok.com"><FontAwesomeIcon className='social-media-iconn social-media-icon4' icon={faSquareXTwitter} /> </Link>


</div>
  </div>
  <div className=' col-6 p-5'>
    <img src='/p2.JPG' className='img-fluid'/>
  </div>
  </div>
</div>
  {
data?.categories.length>0?  // data?.categories >>> means if the data object has data then get the property categories
  <> 
{/* <div className='swiper-custom-pagination'></div> */}
      <Swiper
    // install Swiper modules
    modules={[Navigation, Pagination, Scrollbar,Autoplay]}
    spaceBetween={50}
    slidesPerView={3}
    navigation
    pagination={
      { 
        clickable: true,
        // el:'.swiper-custom-pagination',
    }
  }
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
     autoplay={{delay:1000}}
     loop={true}
    
  >
    {
    data?.categories.map((category,index)=>{
  return(
    <SwiperSlide key={index} className='text-center'>
      <Link to={`/products/category/${category._id}`}>
  
    <img src={category.image.secure_url} alt="category image"/>
    </Link>
    </SwiperSlide>

  )
  })
}
  </Swiper>

  </>  
:
<h2>no categories found</h2>

}
</div>

</div>
  )
}
