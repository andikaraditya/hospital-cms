import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import LoadingScreen from "../components/LoadingScreen";
import "./HomePage.scss"

function HomePage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [facilityData, setFacilityData] = useState([])
    const [illnessData, setIllnessData] = useState([])
    const [insuranceData, setInsuranceData] = useState([])
    const [riskData, setRiskData] = useState([])

    async function fetchData() {
        setLoading(true)
        try {
            const {data} = await axios({
                method: "get",
                url: "http://localhost:3000/Patients",
                params: {
                    "_expand": "Ward"
                }
            })

            setFacilityData(formatData(data, "Ward"))
            setIllnessData(formatData(data.map((el) => {
                return {
                    illness: {
                        name: el.illness
                    }
                }
            }), "illness"))
            setRiskData(formatData(data.map((el) => {
                return {
                    risk: {
                        name: el.info.risk
                    }
                }
            }), "risk"))
            setInsuranceData(formatData(data.map((el) => {
                if (el.info.insurance) {
                    return {
                        insurance: {
                            name: "yes"
                        }
                    }
                }
                return {
                    insurance: {
                        name: "no"
                    }
                }
            }), "insurance"))
            setData(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    function formatData(data, field) {
        let result = []
        
        for (const item of data) {
            let isAdded = false

            if (result.length === 0) {
                result.push({
                    name: item[field].name,
                    count: 1
                })
                continue
            }

            for (let i = 0; i < result.length; i++) {
                if (result[i].name === item[field].name) {
                    result[i].count += 1
                    isAdded = true
                    break
                }
            }

            if (isAdded) {
                continue
            } else {
                result.push({
                    name: item[field].name,
                    count: 1
                })
            }
        }

        return result
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <LoadingScreen 
            name="Dashboard"
            />
        )
    }

    return (
        <>
            <h1>Dashboard</h1>
            <div id="dasboard-container">
                <div className="dashboard-item">
                    <h2>Total Patients</h2>
                    <p>{data.length}</p>
                </div>
                <div className="dashboard-item">
                    <h2>Facilities</h2>
                    <Pie
                    data={{
                        labels: facilityData.map((el) => {
                            return el.name
                        }),
                        datasets: [
                            {
                                data: facilityData.map((el) => {
                                    return el.count
                                })
                            }
                        ]
                    }}
                    />
                </div>
                <div className="dashboard-item">
                    <h2>Diagnose</h2>
                    <Pie
                    data={{
                        labels: illnessData.map((el) => {
                            return el.name
                        }),
                        datasets: [
                            {
                                data: illnessData.map((el) => {
                                    return el.count
                                })
                            }
                        ]
                    }}
                    />
                </div>
                <div className="dashboard-item">
                    <h2>Risk</h2>
                    <Pie
                    data={{
                        labels: riskData.map((el) => {
                            return el.name
                        }),
                        datasets: [
                            {
                                label: riskData.map((el) => {
                                    return el.name
                                }),
                                data: riskData.map((el) => {
                                    return el.count
                                })
                            }
                        ]
                    }}
                    />
                </div>
                <div className="dashboard-item">
                    <h2>Insurance</h2>
                    <Pie
                    data={{
                        labels: insuranceData.map((el) => {
                            return el.name
                        }),
                        datasets: [
                            {
                                data: insuranceData.map((el) => {
                                    return el.count
                                })
                            }
                        ]
                    }}
                    />
                </div>
            </div>
        </>
    );
}

export default HomePage;