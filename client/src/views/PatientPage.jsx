import "./PatientPage.scss"
import PatientRow from "../components/PatientRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PatientPage() {
    const [patients, setPatients] = useState([])
    const [facilities, setFacilities] = useState([])
    const [doctors, setDoctors] = useState([])

    const [searchForm, setSearchForm] = useState({
        name: "",
        illness: "",
        WardId: 0,
        DoctorId: 0
    })

    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    function searchFormHandler(e) {
        const {name, value} = e.target
        setSearchForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function fetchPatient() {
        try {
            const {name, illness, WardId, DoctorId} = searchForm
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
            if (WardId) {
                params.WardId = WardId
                setPage(1)
            }
            if (DoctorId) {
                params.DoctorId = DoctorId
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
                        id="name" 
                        type="text" 
                        name="name" 
                        placeholder="Search name"
                        onChange={searchFormHandler}
                    />
                    <input 
                        id="illness" 
                        type="text" 
                        name="illness" 
                        placeholder="Search illness"
                        onChange={searchFormHandler}
                    />
                    <div className="form-column-container">
                        <select 
                            id="WardId"
                            name="WardId" 
                            onChange={searchFormHandler}
                        >
                            <option value="">select facilities</option>
                            {facilities.map((el) => {
                                return (
                                    <option 
                                        key={el.id}
                                        value={el.id}
                                    >
                                        {el.name}
                                    </option>
                                )
                            })}
                        </select>
                        <select
                        id="DoctorId"
                        name="DoctorId" 
                        onChange={searchFormHandler}
                        >
                            <option value="">select doctor</option>
                            {doctors.map((el) => {
                                return (
                                    <option 
                                        key={el.id}
                                        value={el.id}
                                    >
                                        {el.name}
                                    </option>
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
                            >
                                Previous
                            </button>
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
                            >
                                Next
                            </button>) : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPage;