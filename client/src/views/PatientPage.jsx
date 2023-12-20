import "./PatientPage.scss"
import PatientRow from "../components/PatientRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PatientPage() {
    const [patients, setPatients] = useState([])
    const [facilities, setFacilities] = useState([])
    const [doctors, setDoctors] = useState([])

    const [name, setName] = useState("")
    const [illness, setIllness] = useState("")
    const [facilityId, setFacilityId] = useState("")
    const [doctorId, setDoctorId] = useState("")

    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    async function fetchPatient() {
        try {
            const params = {
                "_expand": "Doctor",
                "_page": page,
                "_limit": 5
            }

            if (name) {
                params.name = name
                setPage(1)
            }
            if (illness) {
                params.illness = illness
                setPage(1)
            }
            if (facilityId) {
                params.WardId = facilityId
                setPage(1)
            }
            if (doctorId) {
                params.DoctorId = doctorId
                setPage(1)
            }
            
            const {data} = await axios({
                method: "get",
                url: "http://localhost:3000/Patients",
                params: params
            })
            setPatients(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchDoctor() {
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

    async function fetchFacilities() {
        try {
            const {data} = await axios({
                method: "get",
                url: "http://localhost:3000/Wards"
            })
            setFacilities(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPatient()
        fetchDoctor()
        fetchFacilities()
    }, [])

    useEffect(() => {
        fetchPatient()
    },[page])
    return (
        <div id="patient-page">
            <div id="filter">
                <p>Filter</p>
                <form
                onSubmit={(e) => {
                    e.preventDefault()
                    fetchPatient()
                }}
                >
                    <input 
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    type="text" name="name" id="name" placeholder="Search name"/>
                    <input 
                    onChange={(e) => {
                        setIllness(e.target.value)
                    }}
                    type="text" name="illness" id="illness" placeholder="Search illness"/>
                    <div className="form-column-container">
                        <select 
                        onChange={(e) => {
                            setFacilityId(e.target.value)
                        }}
                        name="facilities" id="facilities">
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
                        name="doctor" id="doctor">
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
                    <button className="pointer-hover">Search</button>
                </form>
            </div>
            <div id="patient-list">
                <div id="title-row">
                    <h1>Patients</h1>
                    <button
                    className="pointer-hover"
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/create")
                    }}
                    >Add Patient</button>
                </div>
                <div id="patient-container">
                    <div id="table-head">
                        <div>
                        </div>
                        <div>
                            Name
                        </div>
                        <div>
                            Diagnose
                        </div>
                        <div>
                            Assigned Physician
                        </div>
                        <div>
                        </div>
                    </div>
                    {patients.length === 0 ? (
                        <div style={{
                            margin: "2rem auto",
                            fontSize: "3rem"
                        }}>End of patient list</div>
                    ) : ""}
                    {patients.map((el) => {
                        return (
                            <PatientRow 
                            patient={el}
                            key={el.id}
                            />
                        )
                    })}
                    <div id="page-row">
                        <div>
                        {page === 1 ? "" : (
                            <button
                            className="pointer-hover"
                            onClick={(e) => {
                                setPage((prev) => {
                                    return prev -1
                                })
                            }}
                            >Previous</button>
                        )}
                        </div>
                        <p>page: {page}</p>
                        <div>
                        {patients.length === 5 ? (
                            <button
                            className="pointer-hover"
                            onClick={(e) => {
                                setPage((prev) => {
                                    return prev +1
                                })
                            }}
                            >Next</button>) : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPage;