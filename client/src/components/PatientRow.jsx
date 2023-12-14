import "./PatientRow.scss"
import { useNavigate } from "react-router-dom";

function PatientRow(props) {
    const {patient} = props
    const navigate = useNavigate()
    return (
        <div className="patient-row">
            <img src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png" alt="" />
            <p>{patient.name}</p>
            <p>{patient.illness}</p>
            <p>{patient.Doctor.name}</p>
            <button
            className="pointer-hover"
            onClick={(e) => {
                navigate(`/patients/${patient.id}`)
            }}
            >Details</button>
        </div>
    )
}

export default PatientRow
