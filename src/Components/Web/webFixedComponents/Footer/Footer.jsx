import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faFacebook,faTwitter,faInstagram,faTiktok}  from '@fortawesome/free-brands-svg-icons'
import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
<div className="footer">
  <div className="footer-content p-3 pt-5 text-center">
    <p>Copyright 2017. All rights reserved.</p>
    <div className="social-media d-flex justify-content-center column-gap-3">

      <div className="social-media-container d-flex justify-content-center align-items-center"> <Link className="social-media-icon" theme="secondary" to="https://www.facebook.com"> <FontAwesomeIcon className='icon' icon={faFacebook} /></Link></div> 
      <div className="social-media-container d-flex justify-content-center align-items-center"><Link className="social-media-icon" theme="secondary" to="https://www.twitter.com"> <FontAwesomeIcon className='icon' icon={faTwitter} /> </Link></div>
      <div className="social-media-container d-flex justify-content-center align-items-center"><Link className="social-media-icon" theme="secondary" to="https://www.instagram.com"><FontAwesomeIcon className='icon' icon={faInstagram} /> </Link></div>
      <div className="social-media-container d-flex justify-content-center align-items-center"><Link className="social-media-icon" theme="secondary" to="https://www.ticktock.com"><FontAwesomeIcon className='icon' icon={faTiktok} /> </Link></div>
      
      <div className="clrfix" />

    </div>
  </div>
</div>

  )
}
