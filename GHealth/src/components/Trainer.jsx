import React, { useState } from "react";
import "../components/Trainer.css"; // Import your CSS file here

const Trainer = () => {
  const [showPopup, setShowPopup] = useState(false);

  const trainers = [
    {
      id: 1,
      name: "Alex Johnson",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Rajendran_mani_%28_Mr_World%29.jpg/500px-Rajendran_mani_%28_Mr_World%29.jpg",
      role: "Weight lifting Expert",
    },
    {
      id: 2,
      name: "Sarah Williams",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/SangramChougule.png/500px-SangramChougule.png",
      role: "Bodybuilder Coach",
    },
    {
      id: 3,
      name: "Michael Chen",
      image:
        "https://static.langimg.com/mly/thumb/98425250/samayam-malayalam.jpg?imgsize=26068&width=700&resizemode=3",
      role: "Boxing Pro",
    },
  ];

  const handleContact = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="trainer-container">
      <h1>Our Professional Trainers</h1>

      <div className="trainer-grid">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="trainer-card">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="trainer-image"
            />
            <h3>{trainer.name}</h3>
            <p>{trainer.role}</p>
            <button className="contact-btn" onClick={handleContact}>
              Contact
            </button>
          </div>
        ))}
      </div>
      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>✅ Message Sent!</h3>
            <p>Our trainer will contact you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainer;
