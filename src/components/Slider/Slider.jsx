import "./slider.scss";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { posts } from "../postsData";
import { Link } from "react-router-dom";


function Slider() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();
  const innerCarouselRef = useRef();

  useEffect(() => {
    const carouselWidth = carouselRef.current.offsetWidth;
    const innerCarouselWidth = innerCarouselRef.current.scrollWidth;
    setWidth(innerCarouselWidth - carouselWidth + 40); // 20px margin
  }, []);


  return (
    <div className="slider">
      <motion.div className="carousel" ref={carouselRef}>
        <motion.div 
          ref={innerCarouselRef}
          drag="x" 
          dragConstraints={{right: 0, left: -width}}
          className="inner-carousel">
          {posts.map(post => {
            return(
              <motion.div className="item" key={post.id}>
                <img src={post.img}  alt={post.title} />
                
              <Link to={`/blog/${post.id}`} className="imageContainer">
                <div className="overlay">
                  <p className="category">{post.category}</p>
                  <h2 className="title">{post.title}</h2>
                </div>
              </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Slider;