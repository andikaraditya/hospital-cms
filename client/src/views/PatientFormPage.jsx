import { useEffect, useState } from "react";
import "./PatientFormPage.scss"
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PatientFormPage() {
    const [facilities, setFacilities] = useState([])
    const [doctors, setDoctors] = useState([])

    const [name, setName] = useState("")
    const [illness, setIllness] = useState("")
    const [facilityId, setFacilityId] = useState("")
    const [doctorId, setDoctorId] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()

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
            console.log({
                name,
                illness,
                facilityId,
                doctorId,
                description
            })
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
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    type="text" name="name" id="name" placeholder="Enter patient name" required/>
                    <label htmlFor="">Diagnose: </label>
                    <input 
                    onChange={(e) => {
                        setIllness(e.target.value)
                    }}
                    type="text" name="illness" id="illness" placeholder="Enter diagnose" required/>
                    <div className="form-column-container">
                        <select 
                        onChange={(e) => {
                            setFacilityId(e.target.value)
                        }}
                        name="facilities" id="facilities" required>
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
                        onChange={(e) => {
                            setDoctorId(e.target.value)
                        }}
                        name="doctor" id="doctor" required>
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
                </div>
                <div>
                    <label>Notes: </label>
                    <textarea 
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    name="description" id="" cols="30" rows="10" required></textarea>
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