import "./blogPost.scss";
import { useParams } from "react-router-dom";
import { posts } from "../../components/postsData";
import { Link } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="blogpost">
      <div className="post">
        <div className="post-top">
          <img src={post.img} alt="" />
          <Link to={`/blog/`} className="arrow">

          <i class="fa-solid fa-arrow-left"></i>
          </Link>
          <div className="opis">
            <div className="top">
              <div className="category">{post.category}</div>
              <div className="time">{post.data}</div>
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
                alt=""
              />
              <div className="name">{post.author}</div>
            </div>
            <div className="like">
              <i class="fa-regular fa-thumbs-up"></i>
              <span>{post.likes}</span>
            </div>
            <div className="comment">
              <i class="fa-regular fa-comment-dots"></i>
              <span>32</span>
            </div>
          </div>
          <div className="text">
            <span className="teaser">{post.desc_teaser}</span>
            <span className="full">{post.desc_full}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
