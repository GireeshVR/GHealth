// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../pages/Dashboard.css";

// const API_URL = "http://127.0.0.1:8000/api/dashboard/";

// const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

// const emptyMeal = {
//   calories: "",
//   protein: "",
//   carbs: "",
//   fat: "",
// };

// const savedDraft = localStorage.getItem("nutritionDraft");

// const Dashboard = () => {
//   const [nutrition, setNutrition] = useState(
//     savedDraft
//       ? JSON.parse(savedDraft)
//       : {
//           Breakfast: { ...emptyMeal },
//           Lunch: { ...emptyMeal },
//           Dinner: { ...emptyMeal },
//           Snacks: { ...emptyMeal },
//         }
//   );

//   /* 🔹 Auto-save draft */
//   useEffect(() => {
//     localStorage.setItem("nutritionDraft", JSON.stringify(nutrition));
//   }, [nutrition]);

//   const handleChange = (meal, field, value) => {
//     setNutrition((prev) => ({
//       ...prev,
//       [meal]: {
//         ...prev[meal],
//         [field]: value,
//       },
//     }));
//   };

//   /* 🔹 Validation */
//   const isFormValid = () => {
//     for (let meal of meals) {
//       const { calories, protein, carbs, fat } = nutrition[meal];
//       if (calories === "" || protein === "" || carbs === "" || fat === "") {
//         return false;
//       }
//     }
//     return true;
//   };

//   const totals = meals.reduce(
//     (acc, meal) => {
//       acc.calories += Number(nutrition[meal].calories || 0);
//       acc.protein += Number(nutrition[meal].protein || 0);
//       acc.carbs += Number(nutrition[meal].carbs || 0);
//       acc.fat += Number(nutrition[meal].fat || 0);
//       return acc;
//     },
//     { calories: 0, protein: 0, carbs: 0, fat: 0 }
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       alert("Please enter all meal details before saving the day.");
//       return;
//     }

//     const payload = {
//       meals: nutrition,
//       totals,
//       date: new Date().toISOString().split("T")[0],
//     };

//     try {
//       const response = await axios.post(API_URL, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Saved successfully:", response.data);

//       // Clear localStorage and reset form
//       localStorage.removeItem("nutritionDraft");
//       setNutrition({
//         Breakfast: { ...emptyMeal },
//         Lunch: { ...emptyMeal },
//         Dinner: { ...emptyMeal },
//         Snacks: { ...emptyMeal },
//       });

//       alert("Nutrition saved successfully!");
//     } catch (error) {
//       console.error("Error saving nutrition:", error);
//       alert("Failed to save data. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Tracker</h2>

//      <div className="dashboard">

//        <div className="tracker">
//         <table width="100%" border="1" cellPadding="8">
//           <thead>
//             <tr>
//               <th>Meal</th>
//               <th>Calories</th>
//               <th>Protein (g)</th>
//               <th>Carbs (g)</th>
//               <th>Fat (g)</th>
//             </tr>
//           </thead>

//           <tbody>
//             {meals.map((meal) => (
//               <tr key={meal}>
//                 <td>{meal}</td>
//                 {["calories", "protein", "carbs", "fat"].map((field) => (
//                   <td key={field}>
//                     <input
//                       type="number"
//                       min="0"
//                       value={nutrition[meal][field]}
//                       onChange={(e) =>
//                         handleChange(meal, field, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="totall">
//         <h3 style={{ marginTop: "20px" }}>Totals</h3>
//         <p>
//           Calories: <b>{totals.calories}</b> kcal
//         </p>
//         <p>
//           Protein: <b>{totals.protein}</b> g
//         </p>
//         <p>
//           Carbs: <b>{totals.carbs}</b> g
//         </p>
//         <p>
//           Fat: <b>{totals.fat}</b> g
//         </p>
//       </div>
//      </div>

//       <button type="submit">Save Day</button>
//     </form>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import NutritionChart from "./NutritionChart";
import "../pages/Dashboard.css";

const API_URL = "http://127.0.0.1:8000/api/dashboard/";

const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const emptyMeal = {
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
};

const savedDraft = localStorage.getItem("nutritionDraft");

const Dashboard = () => {
  const [nutrition, setNutrition] = useState(
    savedDraft
      ? JSON.parse(savedDraft)
      : {
          Breakfast: { ...emptyMeal },
          Lunch: { ...emptyMeal },
          Dinner: { ...emptyMeal },
          Snacks: { ...emptyMeal },
        }
  );

  // 🔹 Auto-save
  useEffect(() => {
    localStorage.setItem("nutritionDraft", JSON.stringify(nutrition));
  }, [nutrition]);

  const handleChange = (meal, field, value) => {
    setNutrition((prev) => ({
      ...prev,
      [meal]: {
        ...prev[meal],
        [field]: value,
      },
    }));
  };

  // 🔹 Validation
  const isFormValid = () => {
    for (let meal of meals) {
      const { calories, protein, carbs, fat } = nutrition[meal];
      if (calories === "" || protein === "" || carbs === "" || fat === "") {
        return false;
      }
    }
    return true;
  };

  // 🔹 Totals calculation
  const totals = meals.reduce(
    (acc, meal) => {
      acc.calories += Number(nutrition[meal].calories || 0);
      acc.protein += Number(nutrition[meal].protein || 0);
      acc.carbs += Number(nutrition[meal].carbs || 0);
      acc.fat += Number(nutrition[meal].fat || 0);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill all meal details");
      return;
    }

    const payload = {
      meals: nutrition,
      totals,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem("nutritionDraft");

      setNutrition({
        Breakfast: { ...emptyMeal },
        Lunch: { ...emptyMeal },
        Dinner: { ...emptyMeal },
        Snacks: { ...emptyMeal },
      });

      alert("Nutrition saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save data");
    }
  };

 return (
  <form onSubmit={handleSubmit}>
    <h2>Nutrition Tracker</h2>

    <div className="dashboard">
      {/* LEFT : MEALS */}
      <div className="meal-grid">
        {meals.map((meal) => (
          <div className="meal-card" key={meal}>
            <h3>{meal}</h3>

            <div className="meal-inputs">
              <div>
                <label>Calories</label>
                <input
                  type="number"
                  value={nutrition[meal].calories}
                  onChange={(e) =>
                    handleChange(meal, "calories", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Protein (g)</label>
                <input
                  type="number"
                  value={nutrition[meal].protein}
                  onChange={(e) =>
                    handleChange(meal, "protein", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Carbs (g)</label>
                <input
                  type="number"
                  value={nutrition[meal].carbs}
                  onChange={(e) =>
                    handleChange(meal, "carbs", e.target.value)
                  }
                />
              </div>

              <div>
                <label>Fat (g)</label>
                <input
                  type="number"
                  value={nutrition[meal].fat}
                  onChange={(e) =>
                    handleChange(meal, "fat", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT : CHART */}
      <div className="totall">
        <NutritionChart totals={totals} />
      </div>
    </div>

    <button type="submit">Save Day</button>
  </form>
);

};

export default Dashboard;
