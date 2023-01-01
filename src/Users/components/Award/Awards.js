import React from "react";
// import Heading from "../../common/Heading";
import { awards } from "../../../data";
import "./awards.css";

const Awards = () => {
  return (
    <>
      <section className="awards padding">
        <div className="container">
          <div className="heading">
            <p>Our Awards</p>
            <h1>
              Over 1,24,000+ Happy User Bieng With Us Still They Love Our
              Services
            </h1>
          </div>

          <div className="content">
            {awards.map(({ icon, num, name }, i) => (
              <div className="box" key={i}>
                <div className="iconDiv">
                  <span>{icon}</span>
                </div>
                <h1>{num}</h1>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;
