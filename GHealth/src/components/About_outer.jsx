import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/About_outer.css";

const About_outer = () => {
  const navigate = useNavigate();

  return (
    <div className="apple-container">
      {/* MINIMALIST FLOATING SIGN IN BUTTON */}
      <section className="signin_btn">
        <button className="small-signin-btn" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </section>

      <section className="snap-section ceo-bg">
        <div className="content-box ceo-layout">
          <div className="image-wrapper">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUk8WF8fnSyJisYlPH8gClE1O79Nhq5kVkHg&s"
              alt="CEO"
              className="hero-img"
            />
          </div>
          <div className="text-wrapper">
            <span className="label">Leadership</span>
            <h1>Designed by purpose.</h1>
            <p>
              "Founded by CEO Gireesh, GHealth Gym is dedicated to providing a
              premium fitness environment where personalized coaching meets
              cutting-edge equipment to help you reach your peak potential."
            </p>
            <p className="caption">CEO Gireesh</p>
          </div>
        </div>
      </section>

      <section className="snap-section trainer-bg">
        <div className="content-box center-text">
          <h2 className="section-title">Guided by the best.</h2>
          <div className="trainer-grid">
            <TrainerCard
              name="Rajendra Mani"
              role="Technical Coach"
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Rajendran_mani_%28_Mr_World%29.jpg/500px-Rajendran_mani_%28_Mr_World%29.jpg"
            />
            <TrainerCard
              name="Sangram Chougule"
              role="Design Mentor"
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/SangramChougule.png/500px-SangramChougule.png"
            />
            <TrainerCard
              name="Arathy Krishna"
              role="Lead Strategist"
              img="https://static.langimg.com/mly/thumb/98425250/samayam-malayalam.jpg?imgsize=26068&width=700&resizemode=3"
            />
          </div>
        </div>
      </section>

      <section className="snap-section achievement-bg">
        <div className="content-box achievement-layout">
          <div className="text-wrapper">
            <span className="label gold">Elite Achievement</span>
            <h2>World Champion Performance.</h2>
            <div className="achievement-card glass-effect">
              <h3>Rajendra Mani</h3>
              <p className="champion-title">IFBB Pro & World Champion</p>
              <hr className="divider" />
              <p className="testimonial">
                "I use <strong>GHealth</strong> every single day to measure my
                daily nutrient value with surgical accuracy."
              </p>
            </div>
          </div>
          <div className="image-wrapper">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Rajendran_mani_%28_Mr_World%29.jpg/500px-Rajendran_mani_%28_Mr_World%29.jpg"
              alt="Rajendra Mani"
              className="achievement-img shadow-pop"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const TrainerCard = ({ name, role, img }) => (
  <div className="trainer-card">
    <div className="img-container">
      <img src={img} alt={name} />
    </div>
    <h3>{name}</h3>
    <p>{role}</p>
  </div>
);

export default About_outer;
