import { AgCharts } from "ag-charts-react";
import {
  CategoryAxisModule,
  NumberAxisModule,
  LineSeriesModule,
  LegendModule,
  ModuleRegistry,
} from "ag-charts-community";

ModuleRegistry.registerModules([
  CategoryAxisModule,
  NumberAxisModule,
  LineSeriesModule,
  LegendModule,
]);

const NutritionChart = ({ totals }) => {
  const options = {
    title: {
      text: "Daily Nutrition Trend",
    },

    data: [
      {
        nutrient: "Calories",
        value: totals.calories,
      },
      {
        nutrient: "Protein",
        value: totals.protein,
      },
      {
        nutrient: "Carbs",
        value: totals.carbs,
      },
      {
        nutrient: "Fat",
        value: totals.fat,
      },
    ],

    series: [
      {
        type: "line",
        xKey: "nutrient",
        yKey: "value",
        yName: "Amount",
        marker: {
          enabled: true,
        },
      },
    ],

    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Nutrients",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Value",
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};

export default NutritionChart;
