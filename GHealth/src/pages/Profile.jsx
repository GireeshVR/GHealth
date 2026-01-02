import { useState, useEffect } from "react";
import axios from "axios";
import { ProgressBar, Button, Modal, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,
} from "chart.js";
import LiquidFillGauge from "react-liquid-gauge";
import "./profile.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const API_URL = "http://127.0.0.1:8000/api/profile/profile/";

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    await axios.delete(`${API_URL}delete/${id}/`);
    fetchData();
  };

  const handleEditSave = async () => {
    await axios.put(`${API_URL}edit/${editItem.id}/`, editItem);
    setShowModal(false);
    fetchData();
  };

  const groupedByDate = data.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const getTotals = (items) =>
    items.reduce((a, i) => ({
        calories: a.calories + i.calories,
        protein: a.protein + i.protein,
        carbs: a.carbs + i.carbs,
        fat: a.fat + i.fat,
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

  if (loading) return <div className="loader-box">Loading Analytics...</div>;

  const overallTotals = getTotals(data);

  return (
    <div className="profile-container">
      {/* HEADER SECTION */}
      <div className="glass-header">
        <h2 className="gradient-text">Nutrition Intelligence</h2>
        <p>Real-time macro tracking per day</p>
      </div>

      {/* DAILY SECTIONS */}
      {Object.keys(groupedByDate).map((date) => {
        const totals = getTotals(groupedByDate[date]);

        return (
          <div key={date} className="date-section-wrapper">
            <h5 className="date-badge">{date}</h5>
            
            <div className="date-grid">
              {/* MEALS LIST */}
              <div className="meals-column">
                {groupedByDate[date].map((item) => (
                  <div key={item.id} className="meal-card">
                    <div className="meal-info">
                      <span className="meal-name">{item.meal}</span>
                      <div className="macro-pills">
                        <span className="pill cal">{item.calories} kcal</span>
                        <span className="pill prot">{item.protein}p</span>
                        <span className="pill carb">{item.carbs}c</span>
                        <span className="pill fat">{item.fat}f</span>
                      </div>
                    </div>
                    <div className="meal-actions">
                      <button className="action-btn edit" onClick={() => { setEditItem(item); setShowModal(true); }}>✏️</button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DAILY PROGRESS BARS */}
              <div className="day-summary-card">
                <div className="summary-header">
                  <h6>Day Summary</h6>
                  <span className="total-cal-text">{totals.calories} / 2000 kcal</span>
                </div>

                <div className="custom-progress-group">
                  <div className="progress-labels">
                    <label>Protein</label>
                    <span>{totals.protein}g / 150g</span>
                  </div>
                  <ProgressBar className="pg-protein" now={totals.protein} max={150} />
                </div>

                <div className="custom-progress-group">
                  <div className="progress-labels">
                    <label>Carbs</label>
                    <span>{totals.carbs}g / 300g</span>
                  </div>
                  <ProgressBar className="pg-carbs" now={totals.carbs} max={300} />
                </div>

                <div className="custom-progress-group">
                  <div className="progress-labels">
                    <label>Fat</label>
                    <span>{totals.fat}g / 70g</span>
                  </div>
                  <ProgressBar className="pg-fat" now={totals.fat} max={70} />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* GLOBAL ANALYTICS FOOTER */}
      <div className="global-stats">
        <div className="liquid-card">
          <h5>Total Calorie Progress</h5>
          <LiquidFillGauge
            style={{ margin: '0 auto' }}
            width={150}
            height={150}
            value={Math.min((overallTotals.calories / 2000) * 100, 100)}
            riseAnimation
            waveAnimation
            circleStyle={{ fill: "#4f46e5" }}
            waveStyle={{ fill: "#4f46e5" }}
            textStyle={{ fill: "#1e293b", fontSize: "14px", fontWeight: "bold" }}
            waveTextStyle={{ fill: "#fff", fontSize: "14px" }}
          />
        </div>
        
        <div className="chart-card-full">
          <h5>Overall Macro Balance</h5>
          <Bar
            data={{
              labels: ["Protein", "Carbs", "Fat"],
              datasets: [{
                data: [overallTotals.protein, overallTotals.carbs, overallTotals.fat],
                backgroundColor: ["#6366f1", "#f59e0b", "#ef4444"],
                borderRadius: 8,
              }]
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Nutrition Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editItem && (
            <Form>
              {["calories", "protein", "carbs", "fat"].map((f) => (
                <Form.Group key={f} className="mb-3">
                  <Form.Label className="text-uppercase small fw-bold">{f}</Form.Label>
                  <Form.Control
                    type="number"
                    value={editItem[f]}
                    onChange={(e) => setEditItem({...editItem, [f]: Number(e.target.value)})}
                  />
                </Form.Group>
              ))}
              <Button className="w-100 btn-primary" onClick={handleEditSave}>Save Changes</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;