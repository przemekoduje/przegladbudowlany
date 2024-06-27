import './about.scss';
import imgSrc from '../../assets/images/profil2.webp';
import { useState } from 'react';

export default function About() {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleChevronClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='section2 about' id='about'>
      <div className="ramka">
        <img src={imgSrc} alt="ja" className={`${isExpanded ? 'expanded-img' : 'profil'}`} />
        <div className={`text-area ${isExpanded ? 'expanded' : ''}`}>
          <span className="chevron" onClick={handleChevronClick}>
          <i className={`fa-solid ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
          </span>
          
          <h1>Przemysław <br/>Rakotny</h1>
          <div className="tel">
              <i className="fa-solid fa-phone"></i>
              <h3>+48 690 029 414</h3>
          </div>
            <span>
                  Jestem mgr. inz. budownictwa z 20-letnim doświadczeniem. <br/>Posiadam uprawnienia budowalne do nadzoru bez ograniczeń oraz kwalifikacje dozorowe G-3 w zakresie instalacji i urządzeń gazowych. 
                  Uprawniony jestem równiez do wykonywania świadectw charakterystyki energetycznej obiektów budowlanych... 
            </span>
            <span >
                  Jestem Gliwiczaninem. Usługi świadczę na terenie Śląska. Hobbystycznie zajmuje się kodowaniem stron internetowych na: <a href="/">przemokoduje.pl </a>.  Poznaję również historię i tradycje regionalnego budownictwa w Polsce o czym niebawem na blogu. Udzielam się również w Stowarzyszeniu Nowa Cechownia, które promuje polską muzykę.
            </span>
            <div className="upr">
              <div className="upr-buttons">
                  <a href="/assets/uprawnienia.pdf">
                    <img src="/assets/uprawnienia.png" alt="" className='img-upr'/>
                  </a>
                  <a href="/assets/uprawnienia_G3.pdf">
                    <img src="/assets/uprawnienia_G3.png" alt="" className='img-upr' />
                  </a>
                  <a href="/assets/uprawnienia_sche.pdf">
                    <img src="/assets/uprawnienia_sche.png" alt="" className='img-upr'/>
                  </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
