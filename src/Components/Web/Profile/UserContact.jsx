import React, { useContext } from 'react'
import { UserContext } from './../Context/UserContext';

export default function UserContact() {
    let {userDetails,setUserDetails,loading}=useContext(UserContext);
    console.log(userDetails);
    if(loading) {
        return <h2>Loading .........</h2>
       }
  return (
    <>
    <table className="table p-5 border border-dark">
  <thead>
  </thead>
  <tbody>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">User Email</th>
      <td className="px-5 py-3 border border-dark"><h6>{userDetails.email}</h6></td>

    </tr>
    <tr>
      <th scope="row" className="px-5 py-3 border border-dark">User Phone</th>
      <td className="px-5 py-3 border border-dark"> {userDetails.phone?userDetails.phone:'phone number was not provided'} </td>
 
    </tr>

    
  </tbody>
</table>



    </>
  )
}
