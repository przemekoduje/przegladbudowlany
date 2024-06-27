import "./blogPost.scss";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import DOMPurify from 'dompurify';


export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost(postSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  
  // Synchronizacja danych z Firestore w czasie rzeczywistym
  useEffect(() => {
    const postRef = doc(db, "posts", id);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleLike = async () => {
    try {
      const postRef = doc(db, "posts", id);

      // Pobierz aktualny stan z bazy danych
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const currentPost = postSnap.data();
        const newLikedState = !currentPost.liked;
        let newLikes = currentPost.likes;

        // Aktualizuj liczbę "like" w zależności od stanu "liked"
      if (newLikedState) {
        newLikes++; // Dodaj "like"
      } else {
        newLikes--; // Usuń "like"
      }

        // Aktualizuj dokument w Firestore
        await updateDoc(postRef, {
          likes: newLikes,
          liked: newLikedState
        });
      }

    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blogpost">
      <div className="post">
        <div className="post-top">
          <img src={post.img || post.imgMain} alt={post.title} />
          <Link to="/blog/" className="arrow">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <div className="opis">
            <div className="top">
              <div className="category">{post.category}</div>
              <div className="time">{post.date}</div>
            </div>
            <div className="bottom">
              <div className="title">{post.title}</div>
            </div>
          </div>
        </div>
        <div className="post-bottom">
          <div className="social">
            <div className="author">
              <img
                src="https://images.pexels.com/photos/4927361/pexels-photo-4927361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={post.author.name}
              />
              <div className="name">{post.author.name}</div>
            </div>
            <button onClick={handleLike}>
                    <i className="fa-regular fa-thumbs-up"></i> {post.likes}
            </button>
            {/* <div className="comment">
              <i className="fa-regular fa-comment-dots"></i>
              <span>32</span>
            </div> */}
          </div>
          <div className="text">
            {/* <span className="teaser">{post.teaser}</span> */}
            <span className="full" 
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.description)}}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
