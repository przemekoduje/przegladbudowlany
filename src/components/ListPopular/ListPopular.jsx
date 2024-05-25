import React, { useState } from "react";
import "./listPopular.scss";
import { posts as initialPosts } from "../postsData";
import { Link } from "react-router-dom";


export default function ListPopular() {
  const [posts, setPosts] = useState(
    initialPosts.map((post) => ({ ...post, liked: false }))
  );

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newLikedState = !post.liked;
        return { ...post, likes: post.likes + (newLikedState ? 1 : -1), liked: newLikedState };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="listpopular">
      <div className="popular-list-head">
        <h2>Popularne</h2>
        <button>pokaż wszystkie</button>
      </div>
      <ul className="blog-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`} className="imageContainer">
              <img src={post.img} alt={post.title} width="200" />
            
              </Link>
            
            <div className="opis">
              <div className="top">
                <div className="category">{post.category}</div>
                <div className="title">{post.title}</div>
              </div>
              <span className="desc_teaser">{post.desc_teaser}</span>
              <div className="timepluslike">
                <div className="time">{post.data}</div>
                <div className="like">
                  <button onClick={() => handleLike(post.id)}>
                    <i className="fa-regular fa-thumbs-up"></i> {post.likes}
                  </button>
                </div>
              </div>
            </div>
            

            {/* <Link to={`/blog/${post.id}`}>Czytaj więcej</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
