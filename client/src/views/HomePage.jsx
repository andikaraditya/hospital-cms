import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import "./HomePage.scss"
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

const DUMMY_PATIENT_IMAGE = "https://cdn-icons-png.flaticon.com/512/1430/1430453.png"
const DUMMY_FACILITY_IMAGE = "https://cdn-icons-png.flaticon.com/512/2185/2185005.png"
const DUMMY_DOCTOR_IMAGE = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"

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
                    <img src={DUMMY_PATIENT_IMAGE}/>
                </div>
                <div className="heading-item">
                    <p>Active facilities: </p>
                    <span>{facilityData.length}</span>
                    <img src={DUMMY_FACILITY_IMAGE}/>
                </div>
                <div className="heading-item">
                    <p>On duty physician: </p>
                    <span>{doctors.length}</span>
                    <img src={DUMMY_DOCTOR_IMAGE}/>
                </div>
            </div>
            <div className="dasboard-container">
                <div className="dashboard-item">
                    <h2>Facilities</h2>
                    <PieChart
                        data={facilityData}
                    />
                    <p className="info">hover to see how many patients in each facilities</p>
                </div>
                <div className="dashboard-item">
                    <h2>Diagnose</h2>
                    <BarChart
                        data={illnessData}
                    />
                </div>
                <div className="dashboard-item">
                    <h2>Risk</h2>
                    <BarChart
                        data={riskData}
                    />
                </div>
                <div className="dashboard-item">
                    <h2>Insurance</h2>
                    <PieChart
                        data={insuranceData}
                    />
                </div>
            </div>
        </>
    );
}

export default HomePage;