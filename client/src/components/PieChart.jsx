import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

/**
 * Generate Pie Chart Component
 * @param data - list of data 
 * @returns Pie Component
 */
const PieChart = ({data}) => {
    return (
    <Pie
        data={{
            labels: data.map((el) => {
                return el.name
            }),
            datasets: [
                {
                    data: data.map((el) => {
                        return el.count
                    }),
                }
            ]
        }}
    />
    );
}

export default PieChart;