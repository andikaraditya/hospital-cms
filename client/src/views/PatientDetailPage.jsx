import { useEffect, useState } from "react";
import "./PatientDetailPage.scss"
import axios from "axios";
import { useParams } from "react-router-dom";
function PatientDetailPage() {
    const [patient, setPatient] = useState({})

    const {id} = useParams()
    async function fetchPatient() {
        try {
            const {data} = await axios({
                method: "get",
                url: `http://localhost:3000/Patients/${id}`,
                params: {
                    "_expand": ["Doctor", "Ward"]
                }
            })
            // console.log(data)
            setPatient(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPatient()
    }, [])

    if (patient.name === undefined) {
        return (
            <>
            </>
        )
    }

    return (
        <div id="detail-page">
            <div id="side-profile">
                <img src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png" alt="" />
                <h1>{patient.name}</h1>
                <div className="profile-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="" />
                    <p>{patient.Doctor.name}</p>
                </div>
                <div className="profile-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/2185/2185005.png" alt="" />
                    <p>{patient.Ward.name}</p>
                </div>
            </div>
            <div id="info-detail">
            </div>
        </div>
    );
}

export default PatientDetailPage;