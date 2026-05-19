import React, { useState, useEffect, useContext } from 'react';
import Heart from '../../assets/Heart';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../../contextStore/PostContext';
import './postcards.css';

function PostCards({ product, index }) {
  let { setPostContent } = useContext(PostContext); // Set the post content in the global context

  const history = useHistory(); // Redirect to the view post page

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get the current date
    const today = new Date();
    
    // Format the date (e.g., YYYY-MM-DD)
    const formattedDate = today.toISOString().split('T')[0];
    
    // Set the date to the state
    setCurrentDate(formattedDate);
  }, []);

return (
  <div className="card" key={index} onClick={() => {
    setPostContent(product);
    history.push('/view');
  }}>
    <div className="favorite">
      <Heart />
    </div>
    <div className="image">
      <img
  src={
    product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`
  }
  alt=""
/>
    </div>
    <div className="content">
      <p className="rate">&#x20B9; {product.price}</p>
      <span className="category"> {product.category} </span>
      <p className="name"> {product.name}</p>
    </div>
    <div className="date">
      <span>{currentDate}</span>
    </div>
  </div>
);
}

export default PostCards;