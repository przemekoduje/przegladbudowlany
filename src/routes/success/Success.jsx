import React from "react";
import './success.scss'
import Navbar from "../../components/navbar/Navbar";

export default function Success() {
    return (
        <div className="success">
          <div className="success-nav">
            <Navbar/>
          </div>
          <div class="maincontainer">
            <div class="thecard" id="card">
                <div class="thefront">
                    <div class="main-text">
                       <p>Dziękuję za złożone zapytanie. Odpowiem w najblizszym dniu roboczym.</p>
                    </div>
                    <a href="/" class="btn-front">Zakończ</a>
                    <p class="zaproszenie">Zapraszam do odwiedzenia mojego bloga, poświęconego historii polskiego budownictwa regionalnego oraz do zapoznania się z przepisami prawa dotyczącymi audytu technicznego nieruchomości.</p>
                </div>
                
            </div>
            
        </div>
          
          
        </div>
      );
}
