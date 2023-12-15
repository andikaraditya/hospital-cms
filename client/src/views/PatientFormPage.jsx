import { useEffect, useState } from "react";
import "./PatientFormPage.scss"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PatientFormPage() {
    const [facilities, setFacilities] = useState([])
    const [doctors, setDoctors] = useState([])

    // const [name, setName] = useState("")
    // const [illness, setIllness] = useState("")
    // const [facilityId, setFacilityId] = useState("")
    // const [doctorId, setDoctorId] = useState("")
    // const [description, setDescription] = useState("")

    const [patient, setPatient] = useState({
        name: "",
        illness: "",
        DoctorId: 0,
        WardId: 0,
        Description: ""
    })

    const [info, setInfo] = useState({
        bloodPressure: 0,
        heartRate: 0,
        weight: 0,
        height: 0
    })

    const navigate = useNavigate()

    function infoHandler(e) {
        const { name, value } = e.target
        setInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    function patientFormHandler(e) {
        const { name, value } = e.target
        setPatient((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    async function fetchData() {
        try {
            const {data:doctorData} = await axios({
                method: "get",
                url: "http://localhost:3000/Doctors"
            })
            const {data:facilityData} = await axios({
                method: "get",
                url: "http://localhost:3000/Wards"
            })
            setDoctors(doctorData)
            setFacilities(facilityData)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const {name, WardId, DoctorId, illness, Description} = patient
            const {data} = await axios({
                method: "post",
                url: "http://localhost:3000/Patients",
                data: {
                    name: name,
                    WardId: WardId,
                    DoctorId: DoctorId,
                    illness: illness,
                    Description: Description,
                    info: info
                }
            })

            navigate("/patients")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id="form-page">
            <div id="head">
                <div>
                    <button
                    className="pointer-hover"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/patients")
                    }}
                    >Cancel</button>
                </div>
                <div>
                    <h1>Add Patient</h1>
                </div>
                <div>
                </div>
            </div>
            <form
            onSubmit={handleSubmit}
            >
                <div id="form">
                <div>
                    <label htmlFor="">Name: </label>
                    <input 
                    onChange={patientFormHandler}
                    type="text" name="name" id="name" placeholder="Enter patient name" required/>
                    <label htmlFor="">Diagnose: </label>
                    <input 
                    onChange={patientFormHandler}
                    type="text" name="illness" id="illness" placeholder="Enter diagnose" required/>
                    <div className="form-column-container">
                        <select 
                        onChange={patientFormHandler}
                        name="WardId" id="WardId" required>
                            <option value="">select facilities</option>
                            {facilities.map((el) => {
                                return (
                                    <option 
                                    key={el.id}
                                    value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                        <select
                        onChange={patientFormHandler}
                        name="DoctorId" id="DoctorId" required>
                            <option value="">select doctor</option>
                            {doctors.map((el) => {
                                return (
                                    <option 
                                    key={el.id}
                                    value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <label>Info:</label>
                    <div id="form-info">
                        <label >Blood Pressure:</label>
                        <input 
                        onChange={infoHandler}
                        type="number" name="bloodPressure" id="bloodPressure" required placeholder="Enter blood pressure"/>
                    </div>
                    <div id="form-info">
                        <label >Heart Rate:</label>
                        <input 
                        onChange={infoHandler}
                        type="number" name="heartRate" id="heartRate" required placeholder="Enter heart rate"/>
                    </div>
                    <div id="form-info">
                        <label >Height:</label>
                        <input 
                        onChange={infoHandler}
                        type="number" name="height" id="height" required placeholder="Enter height in cm"/>
                    </div>
                    <div id="form-info">
                        <label >Weight:</label>
                        <input 
                        onChange={infoHandler}
                        type="number" name="weight" id="weight" required placeholder="Enter weight in kg"/>
                    </div>
                </div>
                <div>
                    <label>Notes: </label>
                    <textarea 
                    onChange={patientFormHandler}
                    name="Description" id="Description" cols="30" rows="10" required></textarea>
                </div>
                </div>
                <button
                className="pointer-hover"
                >Submit</button>
            </form>
        </div>
    );
}

export default PatientFormPage;