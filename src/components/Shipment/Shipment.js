import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../Login/user-auth';
import './Shipment.css';
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const stripePromise = loadStripe('pk_test_51H5R9rK9isrihyCvLKRpQpHp3TqFFtLCQh3JXkXEyYDrhtpbO2uaMcTC1Ruj7an3JmaBvqNfwSSrPdhxIm5XNXDd00yqnc1Ee1');
  const onSubmit = (data) => {
    //todo- after payment need to added
    console.log(auth.user.email)
    const savedCart = getDatabaseCart()
    const orderDetail = { email: auth.user.email, cart: savedCart, shipment: data }
    fetch('https://mighty-earth-81475.herokuapp.com/placeOrder', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(orderDetail) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(database => {
        console.log('order placed', database)
        alert('order succesfully placed')
        processOrder()
      })
  }
  const auth = useAuth();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Shipping information</h3>
          <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
            {errors.name && <span className="error">Name is required</span>}
            <input name="Email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
            {errors.Email && <span className="error">Email is required</span>}
            <input name="address" ref={register({ required: true })} placeholder="Address" />
            {errors.address && <span className="error">address is required</span>}
            <input name="phone" ref={register({ required: true })} placeholder="Phone" />
            {errors.phone && <span className="error">phone is required</span>}
            <input name="city" ref={register({ required: true })} placeholder="City" />
            {errors.city && <span className="error">city is required</span>}
            <input name="country" ref={register({ required: true })} placeholder="Country" />
            {errors.country && <span className="error">country is required</span>}
            <input type="submit" />
          </form>
        </div>
        <div className="col-md-6">
          <h3 className="py-5">Payment</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
