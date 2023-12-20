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
    const [doctors, setDoctors] = useState([])

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

    async function fetchDoctors() {
        try {
            const {data} = await axios({
                method: "get",
                url: "http://localhost:3000/Doctors"
            })

            setDoctors(data)
        } catch (error) {
            console.log(error)
        }
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
        fetchDoctors()
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
            <div className="dasboard-container">
                <div className="heading-item">
                    <p>Addmited patients: </p>
                    <span>{data.length}</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png"/>
                </div>
                <div className="heading-item">
                    <p>Active facilities: </p>
                    <span>{facilityData.length}</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/2185/2185005.png"/>
                </div>
                <div className="heading-item">
                    <p>On duty physician: </p>
                    <span>{doctors.length}</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"/>
                </div>
            </div>
            <div className="dasboard-container">
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
                                }),
                            }
                        ]
                    }}
                    />
                    <p className="info">hover to see how many patients in each facilities</p>
                </div>
                <div className="dashboard-item">
                    <h2>Diagnose</h2>
                    <Bar
                    data={{
                        labels: illnessData.map((el) => {
                            return el.name
                        }),
                        datasets: [
                            {
                                label: ["Number of patients"],
                                data: illnessData.map((el) => {
                                    return el.count
                                }),
                                backgroundColor: ["#7ED957", "#FFDE59", "#FF5757"]
                            }
                        ]
                    }}
                    />
                </div>
                <div className="dashboard-item">
                    <h2>Risk</h2>
                    <Bar
                    data={{
                        labels: riskData.map((el) => {
                            return el.name
                        }),
                        datasets: [
                            {
                                label: ["number of patients"],
                                data: riskData.map((el) => {
                                    return el.count
                                }),
                                backgroundColor: ["#7ED957", "#FFDE59", "#FF5757"]
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