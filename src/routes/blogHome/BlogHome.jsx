import React from "react";
import "./blogHome.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import ListPopular from "../../components/ListPopular/ListPopular";

export default function BlogHome() {
  return (
    <div className="bloghome">
      <Navbar />
      <Slider className="resp-slider" />
      <ListPopular />
    </div>
  );
}
