import "./PatientPage.scss"
import PatientRow from "../components/PatientRow";
import { useState } from "react";
function PatientPage() {
    const [patients, setPatients] = useState(["","","","","","","","",""])
    return (
        <div id="patient-page">
            <div id="filter">
                <p>Filter</p>
                <form>
                    <input type="text" name="name" id="name" placeholder="Search name"/>
                    <input type="text" name="illness" id="illness" placeholder="Search illness"/>
                    <div id="select-container">
                        <select name="facilities" id="facilities">
                            <option value="">select facilities</option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                        </select>
                        <select name="facilities" id="facilities">
                            <option value="">select doctor</option>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                        </select>
                    </div>
                    <button>Search</button>
                </form>
            </div>
            <div id="patient-list">
                <div id="title-row">
                    <h1>Patients</h1>
                    <button>Add Patient</button>
                </div>
                <div id="patient-container">
                    {patients.map((el, index) => {
                        return (
                            <PatientRow 
                            key={index}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default PatientPage;