import { useEffect, useState } from "react";
import "./PatientDetailPage.scss"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const DUMMY_PATIENT_IMAGE = "https://cdn-icons-png.flaticon.com/512/1430/1430453.png"
const DUMMY_FACILITY_IMAGE = "https://cdn-icons-png.flaticon.com/512/2185/2185005.png"
const DUMMY_DOCTOR_IMAGE = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"

function PatientDetailPage() {
    const [patient, setPatient] = useState({})
    const [BMI, setBMI] = useState(0)

    const {id} = useParams()
    const navigate = useNavigate()

    function countBMI(weight, height) {
        return Math.round(weight / Math.pow((height / 100), 2) * 100) / 100
    }
    
    async function fetchPatient() {
        try {
            const {data} = await axios({
                method: "get",
                url: `http://localhost:3000/Patients/${id}`,
                params: {
                    "_expand": ["Doctor", "Ward"]
                }
            })

            setPatient(data)
            setBMI(countBMI(data.info.weight, data.info.height))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPatient()
    }, [])

    if (patient.name === undefined) {
        return (
            <LoadingScreen
            name="Patient detail"
            />
        )
    }

    return (
        <div id="detail-page">
            <div id="side-profile">
                <img src={DUMMY_PATIENT_IMAGE} alt="" />
                <h1>{patient.name}</h1>
                <div className="profile-info">
                    <img src={DUMMY_DOCTOR_IMAGE} alt="" />
                    <p>{patient.Doctor.name}</p>
                </div>
                <div className="profile-info">
                    <img src={DUMMY_FACILITY_IMAGE} alt="" />
                    <p>{patient.Ward.name}</p>
                </div>
            </div>
            <div id="info-detail">
                <div id="title">
                    <p>Patient Informations</p>
                    <button
                        className="pointer-hover"
                        onClick={() => {
                            navigate(`/edit/${patient.id}`)
                        }}
                    >
                        Edit Informations
                    </button>
                </div>
                <div className="info-table">
                    <p>Name: {patient.name}</p>
                    <p>Age: {patient.info.age}</p>
                </div>
                <div className="info-table">
                    <p id="blood">Blood Pressure: {patient.info.bloodPressure}</p>
                    <p id="heart">Heart Rate: {patient.info.age} bpm</p>
                </div>
                <div className="info-table">
                    <p>Height: {patient.info.height} cm</p>
                    <p>Weight: {patient.info.weight} kg</p>
                    <p>BMI: {BMI}</p>
                </div>
                <div className="info-table">
                    <p>Insurance: {patient.info.insurance ? "Yes" : "No"} </p>
                    <p>Risk: <span className={patient.info.risk}>{patient.info.risk}</span> </p> 
                </div>
                <div className="info-table">
                    <p>Diagnose: {patient.illness}</p>
                </div>
                <div className="info-table">
                    <p>Notes: <br /> <span id="description">{patient.Description}</span> </p>
                </div>
            </div>
        </div>
    );
}

export default PatientDetailPage;