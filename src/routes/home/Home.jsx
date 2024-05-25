import Navbar from "../../components/navbar/Navbar";
import About from "../../sections/about/About";
import Services from "../../sections/services/Services";
import "./home.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="home-nav">
        <Navbar />
      </div>
      <div className="section">
        <Services />
      </div>
      <div className="section">
        <About />
      </div>
    </div>
  );
}
