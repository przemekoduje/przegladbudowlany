import Auth from "../auth/Auth";
import "./console.scss";
import { db, auth } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import CreatePost from "../../components/createPost/CreatePost";
import AddNewPost from "../../components/addNewPost/AddNewPost";



export default function Console() {
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const userCollectionRef = collection(db, "users");

  const getUserList = async () => {
    try {
      const data = await getDocs(userCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        getUserList();
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    getUserList();
  };
  

  return (
    <div className="console">
      <h1>Admin Console</h1>
      <div className="close">
        <Link to="/">
          <button>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </Link>
      </div>

      {!isLoggedIn ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <div className="userList">
            {userList.map((user) => (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phoneNbr}</p>
                <p style={{ display: user.budowlany ? "block" : "none" }}>
                  Budowlany
                </p>
                <p style={{ display: user.elektryczny ? "block" : "none" }}>
                  Elektryczny
                </p>
                <p style={{ display: user.gazowy ? "block" : "none" }}>
                  Gazowy
                </p>
                <p style={{ display: user.opinia ? "block" : "none" }}>
                  Opinia
                </p>
                <p style={{ display: user.swiadectwo ? "block" : "none" }}>
                  Świadectwo
                </p>
              </div>
            ))}
            <button onClick={handleLogout}>Wyloguj się</button>
          </div>
          

            <div className="newPost">
              {/* <CreatePost /> */}
              <AddNewPost />
            </div>
          
          
        </>
      )}
    </div>
  );

  
  
}
