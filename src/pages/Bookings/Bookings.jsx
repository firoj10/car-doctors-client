import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";


const Bookings = () => {
    const {user} = useContext(AuthContext)
    const [bookings, setBookings]= useState([])
    const navigate = useNavigate();
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(()=>{
        fetch(url,{
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
        .then(res=> res.json())
        .then(data=>{
            if(!data.error){
                setBookings(data)
            }else{
                navigate('/')  
            }
        })
    },[url,navigate]);
    const handleDelete  = id =>{
        const proceed = confirm('Are u sure You wont to Delete')
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('delete success');
                    const remaining = bookings.filter(booking=>booking ._id !==id);
                    setBookings(remaining)
                }
            })
        }
    }
    const handleBookingConfirm = id=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })

        .then(res=> res.json())
        .then(data=> {
            console.log(data);
            if(data.modifiedCount > 0){
                alert('update success');
                //update status
                const remaining = bookings.filter(booking=>booking ._id !==id);
                const updated = bookings.find(booking=>booking ._id ===id);
                updated.status = 'confirm'
                const newBooking = [updated, ...remaining]
                    setBookings(newBooking)
            }
        })
    }
    return (
        <div>
           <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>img</th>
        <th>Name</th>
        <th>Date</th>
        <th> Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    
   
 {
    bookings.map(booking=> <BookingRow key={booking._id}
        booking={booking}
        handleBookingConfirm={handleBookingConfirm}
        handleDelete={handleDelete}
    ></BookingRow>)
 }
  
    </tbody>

    
    
  </table>
</div>
        </div>
    );
};

export default Bookings;