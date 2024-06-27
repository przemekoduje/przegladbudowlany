import "./services.scss";

import { db } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const [isRotated, setIsRotated] = useState(false);

  const handleOrderClick = () => {
    setIsRotated(!isRotated);
  };
  const [userList, setUserList] = useState([]);

  const[newName, setNewName] = useState("");
  const[newEmail, setNewEmail] = useState("");
  const[newPhone, setNewPhone] = useState(0);
  const[isBud, setIsBud] = useState("");
  const[isEl, setIsEl] = useState("");
  const[isGaz, setIsGaz] = useState("");
  const[isOp, setIsOp] = useState("");
  const[isSw, setIsSw] = useState("");

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
    
    getUserList();
  }, []);

  const navigate = useNavigate();


  const onSubmitUser = async () => {
    try{
        await addDoc(userCollectionRef, {
            name: newName,
            email: newEmail,
            phoneNbr: newPhone,
            budowlany: isBud,
            elektryczny: isEl,
            gazowy: isGaz,
            opinia: isOp,
            swiadectwo: isSw,
        });
        getUserList();
        navigate("/success");
    }catch(err) {
        console.error(err);
    }
    
  }

  return (
    <div className="section1">
      <div className="maincontainer">
        <div className={`thecard ${isRotated ? "rotate" : ""}`} id="card">
          <div className="thefront">
            <h1 className="main-text">
              Kompleksowy <br />
              audyt techniczny <br />
              nieruchomości
            </h1>
            <button
              onClick={handleOrderClick}
              id="orderBtn"
              className="btn-front"
            >
              ZAPYTAJ O OFERTĘ
            </button>
            <p className="desc">Wykonuję usługi na obszarze całego Śląska.</p>
          </div>
          <div className="theback">
            
          <div className="orderForm"> 
              <input
                className="field"
                id="name"
                type="text"
                placeholder="Imię"
                name="name"
                required
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                className="field"
                id="email"
                type="email"
                placeholder="email"
                name="email"
                required
                onChange={(e) => setNewEmail(e.target.value)} 
              />
              <input
                className="field"
                type="tel"
                placeholder="telefon"
                name="phone"
                required
                onChange={(e) => setNewPhone(Number(e.target.value))}
              />

              <div className="service-label">
                <label
                  className="service-text"
                  htmlFor="service"
                  
                >
                  Jaką usługę potrzebujesz?
                </label>

                <div id="service" className="service">
                  
                  <div className="option">
                    <input
                      className="service-checkbox"
                      type="checkbox"
                      id="budowlany"
                      name="service"
                      value="budowlany"
                      checked={isBud}
                      onChange={(e) => setIsBud(e.target.checked)}
                    />
                    <label htmlFor="budowlany">przegląd budowlany</label>
                    <br />
                  </div>
                  
                  <div className="option">
                    <input
                      className="service-checkbox"
                      type="checkbox"
                      id="gazowy"
                      name="service"
                      value="gazowy"
                      checked={isGaz}
                      onChange={(e) => setIsGaz(e.target.checked)} 
                    />
                    <label htmlFor="gazowy">przegląd instalacji gazowej</label>
                    <br />
                  </div>
                  <div className="option">
                    <input
                      className="service-checkbox"
                      type="checkbox"
                      id="elektryczny"
                      name="service"
                      value="elektryczny"
                      checked={isEl}
                      onChange={(e) => setIsEl(e.target.checked)}
                    />
                    <label htmlFor="elektryczny">przegląd instalacji elektrycznej</label>
                    <br />
                  </div>
                  <div className="option">
                    <input
                      className="service-checkbox"
                      type="checkbox"
                      id="swiadectwo"
                      name="service"
                      value="swiadectwo"
                      checked={isSw}
                      onChange={(e) => setIsSw(e.target.checked)}
                    />
                    <label htmlFor="swiadectwo">
                      
                        świadectwo charakterystyki en.
                      
                    </label>
                    <br />
                  </div>
                  <div className="option">
                    <input
                      className="service-checkbox"
                      type="checkbox"
                      id="opinia"
                      name="service"
                      value="opinia"
                      checked={isOp}
                      onChange={(e) => setIsOp(e.target.checked)}
                    />
                    <label htmlFor="opinia">opinię budowlaną</label>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-back"
                onClick={onSubmitUser}
              >
                Wyślij
              </button>
              <figcaption>
                Proszę o cierpliwość - odpowiedź pojawi się w przeciągu jednego
                dnia.
              </figcaption>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
