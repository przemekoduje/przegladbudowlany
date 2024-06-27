import { useState, useEffect } from "react";
import "./listPopular.scss";
import { db } from "../../config/firebaseConfig";
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";


export default function ListPopular() {


    const[postsList, setPostList] = useState([]);

    const postsCollectionRef = collection (db, "posts");
    
    useEffect (() => {
      const getPosts = async () => {
        const data = await  getDocs (postsCollectionRef);
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
      getPosts();
    }, [postsCollectionRef]);

    const handleLike = async (postId) => {
      const postDoc = doc(db, "posts", postId);
      const post = postsList.find(p => p.id === postId);
      const newLikedState = !post.liked;
      await updateDoc(postDoc, {
        likes: newLikedState ? post.likes + 1 : post.likes - 1,
        liked: newLikedState
      });
      setPostList(postsList.map(p => p.id === postId ? { ...p, likes: newLikedState ? p.likes + 1 : p.likes - 1, liked: newLikedState} : p));
    };


  return (
    <div className="listpopular">
      <div className="popular-list-head">
        <h2>Popularne</h2>
        {/* <button>pokaż wszystkie</button> */}
      </div>
      <ul className="blog-list">
        {postsList.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`} className="imageContainer">
              <img src={post.imgMain} alt="" width="200" />
            </Link>

            <div className="opis">
              <div className="top">
                <div className="category">{post.category}</div>
                <div className="title">{post.title}</div>
              </div>
              <span className="desc_teaser">{post.teaser}</span>
              <div className="timepluslike">
                <div className="time">{post.date}</div>
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


