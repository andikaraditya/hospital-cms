import { useEffect, useState } from "react";
import "./PatientFormPage.scss"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function PatientFormPage() {
    const [facilities, setFacilities] = useState([])
    const [doctors, setDoctors] = useState([])

    const {id} = useParams()

    const [patient, setPatient] = useState({
        name: "",
        illness: "",
        DoctorId: 0,
        WardId: 0,
        Description: ""
    })

    const [info, setInfo] = useState({
        bloodPressure: undefined,
        heartRate: undefined,
        weight: undefined,
        height: undefined
    })

    const navigate = useNavigate()

    function infoHandler(e) {
        let { name, value } = e.target
        if (name === "insurance") {
            value = (value === "true")
        }
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
            let method = "post"
            let url = "http://localhost:3000/Patients"

            if (id) {
                method = "put"
                url += `/${id}`
            }

            await axios({
                method: method,
                url: url,
                data: {
                    name: name,
                    WardId: WardId,
                    DoctorId: DoctorId,
                    illness: illness,
                    Description: Description,
                    info: info
                }
            })

            toast.success(id ? "Patient has been updated" : "Patient has been added")
            navigate(id ? `/patients/${id}` : "/patients")
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPatient() {
        try {
            const {data} = await axios({
                method: "get",
                url: `http://localhost:3000/Patients/${id}`
            })

            setPatient(data)
            setInfo(data.info)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete() {
        try {
            await axios({
                method: "delete",
                url: `http://localhost:3000/Patients/${id}`
            })

            toast.success("Patient has been deleted")
            navigate("/patients")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        if (id) {
            fetchPatient()
        }
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
                    <h1>{id ? "Edit" : "Add"} Patient</h1>
                </div>
                <div>
                    {id ? (
                        <button
                            className="pointer-hover"
                            onClick={handleDelete}
                        >Delete</button>
                    ) : ""}
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <div id="form">
                <div>
                    <label htmlFor="">Name: </label>
                    <input 
                        id="name" 
                        defaultValue={patient.name}
                        type="text" 
                        name="name" 
                        placeholder="Enter patient name" 
                        required
                        onChange={patientFormHandler}
                    />
                    <label htmlFor="">Diagnose: </label>
                    <input 
                        id="illness" 
                        defaultValue={patient.illness}
                        type="text" 
                        name="illness" 
                        placeholder="Enter diagnose" 
                        required
                        onChange={patientFormHandler}
                    />
                    <div className="form-column-container">
                        <select 
                            id="WardId" 
                            name="WardId" 
                            required
                            onChange={patientFormHandler}
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
                            onChange={patientFormHandler}
                            name="DoctorId" 
                            required
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
                    <label>Info:</label>
                    <div id="form-info">
                        <label >Age:</label>
                        <input 
                            id="age" 
                            defaultValue={info.age}
                            type="number" 
                            name="age" 
                            required 
                            placeholder="Enter blood pressure"
                            onChange={infoHandler}
                        />
                    </div>
                    <div id="form-info">
                        <label >Blood Pressure:</label>
                        <input 
                            id="bloodPressure" 
                            defaultValue={info.bloodPressure}
                            type="number" 
                            name="bloodPressure" 
                            required 
                            placeholder="Enter blood pressure"
                            onChange={infoHandler}
                        />
                    </div>
                    <div id="form-info">
                        <label >Heart Rate:</label>
                        <input 
                            id="heartRate" 
                            defaultValue={info.heartRate}
                            type="number" 
                            name="heartRate" 
                            required 
                            placeholder="Enter heart rate"
                            onChange={infoHandler}
                        />
                    </div>
                    <div id="form-info">
                        <label >Height:</label>
                        <input 
                            id="height" 
                            defaultValue={info.height}
                            type="number" 
                            name="height" 
                            required 
                            placeholder="Enter height in cm"
                            onChange={infoHandler}
                        />
                    </div>
                    <div id="form-info">
                        <label >Weight:</label>
                        <input 
                            id="weight" 
                            defaultValue={info.weight}
                            type="number" 
                            name="weight" 
                            required 
                            placeholder="Enter weight in kg"
                            onChange={infoHandler}
                        />
                    </div>
                    <div id="form-info">
                        <label >Risk:</label>
                        <select 
                            id="risk" 
                            name="risk" 
                            required
                            onChange={infoHandler}
                        >
                            <option value="" >Select Risk</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <div id="form-info">
                        <label >Insurance:</label>
                        <div id="radio">
                            <div className="radio-item">
                            <label htmlFor="insuranceTrue">Yes</label> 
                            <input 
                                id="insuranceTrue" 
                                type="radio" 
                                name="insurance" 
                                value={true} 
                                required
                                onChange={infoHandler}
                            />
                            </div>
                            <div className="radio-item">
                            <label htmlFor="insuranceFalse">No</label> 
                            <input 
                                id="insuranceFalse" 
                                type="radio" 
                                name="insurance" 
                                value={false} 
                                required
                                onChange={infoHandler}
                            />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Notes: </label>
                    <textarea 
                    id="Description" 
                    defaultValue={patient.Description}
                    name="Description" 
                    cols="30" 
                    rows="10" 
                    required
                    onChange={patientFormHandler}
                    ></textarea>
                </div>
                </div>
                <button
                    className="pointer-hover"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PatientFormPage;