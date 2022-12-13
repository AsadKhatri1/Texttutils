import React from 'react'

export default function Home(props) {
  return (
    <div className='homepage'>
      <h1 className="heading">
        Welcome to the best Ecommerce by {props.owner}
      </h1>
      <h5>We are providing quality work with the best quailty product.<br></br>7 days return policy avaialable.</h5>
      <button className="btns mx-2">Learn More</button>
      <button className="btns mx-2">Order Now</button>
    </div>
  )
}


