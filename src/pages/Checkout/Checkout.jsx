import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";



const Checkout = () => {

    const service = useLoaderData()
    const {_id, title, price, img} = service;
    const {user} = useContext(AuthContext)

    const handleBookService= event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }

console.log(booking)
fetch('http://localhost:5000/bookings',{
    method: 'POST',
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify(booking)
})
.then(res => res.json())
.then(data=>{
    console.log(data)
    // if(data.insertedId){
    //     Swal.fire({
    //         title: 'success',
    //         text: 'User added successfully',
    //         icon: 'success',
    //         confirmButtonText: 'Cool'
    //       })
    // }
})
    }
    return (
        <div>
            <h2>check out: {title}</h2>
            <div className="">
            <form onSubmit={handleBookService}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" name="name" defaultValue={user?.displayName} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" placeholder="Date" name="date" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" defaultValue={user?.email} name="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due amount</span>
          </label>
          <input type="text" defaultValue={ '$'+ price} className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-block btn-primary" type="submit" value="confram order" />
        </div>
        </form>
      </div>
    </div>
      
    );
};

export default Checkout;