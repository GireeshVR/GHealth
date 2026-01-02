import React from "react";
import "../components/About.css";

const About = () => {
  return (
    <div className="apple-container">
      {/* SECTION 1: CEO */}
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

      {/* SECTION 2: TRAINERS */}
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

      {/* SECTION 3: ACHIEVEMENTS & FEATURED USER */}
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
                "To maintain a world-class physique, precision is everything. 
                I use <strong>GHealth</strong> every single day to measure my daily 
                nutrient value and track my macros with surgical accuracy."
              </p>
              <div className="stats-row">
                <div className="stat">
                  <span>Protein</span>
                  <p>Tracked</p>
                </div>
                <div className="stat">
                  <span>Calories</span>
                  <p>Optimized</p>
                </div>
              </div>
            </div>
          </div>
          <div className="image-wrapper">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Rajendran_mani_%28_Mr_World%29.jpg/500px-Rajendran_mani_%28_Mr_World%29.jpg" 
               alt="Rajendra Mani World Champion" 
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

export default About;