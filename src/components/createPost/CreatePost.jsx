import "./createPost.scss";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../../config/firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function CreatePost() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [teaser, setTeaser] = useState("");
  const [post, setPost] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [message, setMessage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [prevValues, setPrevValues] = useState({
    category: "",
    title: "",
    teaser: "",
    post: "",
    photoLink: "",
  });

  const postCollectionRef = collection(db, "posts");

  // Upload image to storage and get URL
  const uploadImage = async () => {
    if (imageUpload == null) {
      setMessage("Wybierz obraz do przesłania.");
      return null;
    }
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    setPhotoLink(url); // Update state with the new photo link
    return url;
  };

  // Add image to post
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => {
            if (!prev.includes(url)) {
              return [...prev, url];
            }
            return prev;
          });
        });
      });
    });
  }, []);

  const createPost = async () => {
    if (!category || !title || !teaser || !post) {
      setMessage("Wszystkie pola muszą być wypełnione.");
      return;
    }

    if (
      prevValues.category === category &&
      prevValues.title === title &&
      prevValues.teaser === teaser &&
      prevValues.post === post &&
      prevValues.photoLink === photoLink
    ) {
      setMessage("Nie można wysłać tego samego wpisu dwa razy.");
      return;
    }

    let uploadedPhotoLink = photoLink;
    if (imageUpload) {
      uploadedPhotoLink = await uploadImage();
    }

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Miesiące w JavaScript są liczone od 0
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    await addDoc(postCollectionRef, {
      category,
      title,
      teaser,
      post,
      photoLink: uploadedPhotoLink,
      author: { name: "Przemo", id: auth.currentUser.uid },
      date: formattedDate,
      likes: 0,
      liked: false
    });

    setMessage("Post wysłany!");
    setPrevValues({ category, title, teaser, post, photoLink: uploadedPhotoLink });
    setCategory("");
    setTitle("");
    setTeaser("");
    setPost("");
    setPhotoLink("");
    setImageUpload(null);

    // Usuwanie komunikatu po 3 sekundach
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="createPost">
      <div className="cpContainer">
        <h3>Create new post</h3>
        {message && <p>{message}</p>}
        <div className="inputGp">
          <label htmlFor="">Category:</label>
          <input
            type="text"
            value={category}
            placeholder="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input
            type="text"
            value={title}
            placeholder="title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Description teaser:</label>
          <textarea
            className="teaser"
            value={teaser}
            placeholder="teaser..."
            onChange={(e) => {
              setTeaser(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post:</label>
          <textarea
            className="post"
            value={post}
            placeholder="post..."
            onChange={(e) => {
              setPost(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Photo-link:</label>
          <input
            type="text"
            value={photoLink}
            placeholder="photo link...."
            onChange={(e) => {
              setPhotoLink(e.target.value);
            }}
          />
        </div>
        <div className="uploadImage">
          <input
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>Upload image</button>
        </div>
        <button onClick={createPost}>Create post</button>
        {/* <div className="zdjecie">
          {imageList.map((url, index) => (
            <img key={index} src={url} alt="uploaded" />
          ))}
        </div> */}
      </div>
    </div>
  );
}
