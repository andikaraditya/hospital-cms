import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

/**
 * Generate Bar Chart Component
 * @param data - list of data  
 * @returns Bar Component
 */

function BarChart({data}) {
    return (
        <Bar
        data={{
            labels: data.map((el) => {
                return el.name
            }),
            datasets: [
                {
                    label: ["number of patients"],
                    data: data.map((el) => {
                        return el.count
                    }),
                    backgroundColor: ["#7ED957", "#FFDE59", "#FF5757"]
                }
            ]
        }}
        />
    );
}

export default BarChart;