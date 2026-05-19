import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./Post.css";
import axios from 'axios';
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";

import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  let [posts, setPosts] = useState([]); //for showing all posts in Descending order of date
  let [posts2, setPosts2] = useState([]); //for showing all posts in Ascending order of date
  let [loading, setLoading] = useState(false);
  let [loading2,setLoading2] = useState(false)
   useEffect(() => {

    setLoading(true);
    setLoading2(true);

    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {

        const products = response.data;

        // descending order
        const descending = [...products].reverse();

        // ascending order
        const ascending = [...products];

        setPosts(ascending);

        setPosts2(descending);

        setAllPost(products);

        setLoading(false);

        setLoading2(false);

      })
      .catch((error) => {

        console.log(error);

      });

}, [setAllPost]);
  // quickMenuCards assign all cards of post item later it will be displayed
  let quickMenuCards = posts.map((product, index) => {
    return(<div className="quick-menu-cards" key={index}> <PostCards product={product} index={index} /> </div>);
  });

  let freshRecomendationCards = posts2.map((product, index) => { if(index<4) {
    return (<div className="fresh-recomendation-card" key={index}> <PostCards product={product} index={index} /> </div>);}
    return null 
});
  return (
    <div className="postParentDiv">
      {posts && (
        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <Link to="./viewmore">
              {" "}
              <span>View more</span>{" "}
            </Link>
          </div>
          <div className="cards">
            {" "}
            {loading ? <BarLoading /> : quickMenuCards}
          </div>
        </div>
      )}
     <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="fresh-recomendation-cards cards">{loading2 ? <BarLoading/> : freshRecomendationCards}</div> 
      </div> 
    </div>
  );
}

export default Posts;
