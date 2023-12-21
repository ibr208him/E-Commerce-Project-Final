import React, { useContext } from 'react'
import { UserContext } from './../Context/UserContext';

export default function UserInfo() {
    let {userDetails,setUserDetails,loading}=useContext(UserContext);
    console.log(userDetails);

    const getDateAndTime = (timestamp)=>{
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const newDate=`${day}-${month}-${year}`                 
      const newTime=`${hours>12?hours-12:hours==0?12:hours}:${minutes}:${seconds} ${hours<12?'AM':'PM'}`
      return ({newDate ,newTime })
      }





    if(loading) {
        return <h2>Loading .........</h2>
       }
  return (
    <div className='container'>

    <table className="table w-50 border border-dark">
  <thead>
  </thead>
  <tbody>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">User Name</th>
      <td className="px-5 py-3"><h3>{userDetails.userName}</h3></td>

    </tr>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">User ID</th>
      <td colspan="2" className="px-5 py-3">{userDetails._id}</td>
      
    </tr>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">Profile image</th>
      <td className="px-5 py-3"> <div className='profile-img-contianer'><img src={userDetails.image.secure_url} alt="profile-image" className='img-fluid w-25' /></div>
</td>
 
    </tr>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">The profile was created on</th>
      <td colspan="2" className="px-5 py-3"><p>{getDateAndTime(userDetails.createdAt).newDate} at {getDateAndTime(userDetails.createdAt).newTime}</p></td>
      
    </tr>
    
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">User Status</th>
      <td colspan="2" className="px-5 py-3">{userDetails.status}</td>
      
    </tr>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">Last time chnaged the password</th>
      <td colspan="2" className="px-5 py-3"><p>{getDateAndTime(userDetails.changePasswordTime).newDate} at {getDateAndTime(userDetails.changePasswordTime).newTime}</p></td>
      
    </tr>
  </tbody>
</table>
    </div>
  )
}
