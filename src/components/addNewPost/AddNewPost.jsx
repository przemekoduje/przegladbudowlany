import { useState } from "react";
import "./addNewPost.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db, auth } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import UploadWidget from "../UploadWidget";
import { Editor } from "@tinymce/tinymce-react";

function AddNewPost() {
  const [text, setText] = useState("");
  const [value, setValue] = useState("<p>TinyMce editor text</p>");
  console.log("VALUE", value);
  console.log("TEXT", text);

  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const formData = new FormData(e.target.form);
    const inputs = Object.fromEntries(formData);

    // Check if all required fields are filled
    const isFormValid = Object.values(inputs).every(
      (value) => value.trim() !== ""
    );

    // Enable/disable the button based on form validation
    setIsButtonDisabled(!isFormValid);
  };

  //   const handleEditorChange = (content) => {
  //     setValue(content);
  //     handleInputChange({ target: { form: document.querySelector("form") } });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    inputs.description = value;

    try {
      const postsCollectionRef = collection(db, "posts");

      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      // Prepare images object
      const imagesObj = images.reduce((acc, url, index) => {
        if (index === 0) {
          acc.imgMain = url;
        } else {
          acc[`img${index + 1}`] = url;
        }
        return acc;
      }, {});

      await addDoc(postsCollectionRef, {
        ...inputs,
        ...imagesObj,
        author: { name: "Przemo", id: auth.currentUser.uid },
        date: formattedDate,
        likes: 0,
        liked: false,
      });

      e.target.reset();
      setValue("");
      setError("");
      setImages([]);
      setIsButtonDisabled(true);
    } catch (err) {
      console.error(err);
      setError("Wystąpił błąd podczas dodawania posta");
    }
  };

  return (
    <div className="addNewPost">
      <div className="formContainer">
        <div className="wrapper">
          <h1>Add New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="title">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <div className="description">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                onChange={setValue}
                value={value}
              />
            </div> */}
            <div className="description">
              <Editor
                apiKey="53ztybbwmiwe92f8ujdm6gaqrh3jpxwta7u6pe6v7l9q7qm4"
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  setText(editor.getContent({ format: "text" }));
                }}
                onInit={(evt, editor) => {
                  setText(editor.getContent({ format: "text" }));
                }}
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate  mentions  tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                }}
              />
            </div>
            <div className="category">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="teaser">
              <label htmlFor="teaser">Description Teaser</label>
              <input
                id="teaser"
                name="teaser"
                type="text"
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              className="sendButton"
              disabled={isButtonDisabled}
              style={{
                backgroundColor: isButtonDisabled ? "#01c9a8" : "#016050",
                color: isButtonDisabled ? "#aaa" : "#fff",
              }}
            >
              {" "}
              Add
            </button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}

        <UploadWidget
          uwConfig={{
            cloudName: "przemokoduje",
            uploadPreset: "przegladbudowlany", // Twój upload preset
            multiple: true,
            folder: "images",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default AddNewPost;
