import "./PatientRow.scss"
import { useNavigate } from "react-router-dom";

const DUMMY_IMAGE = "https://cdn-icons-png.flaticon.com/512/1430/1430453.png";

/**
 * Generate patient table row
 * @param patient - patient data object
 * @returns Pie Component
 */
function PatientRow({patient}) {
    const navigate = useNavigate()
    return (
        <div className="patient-row">
            <img src={DUMMY_IMAGE} alt="" />
            <p>{patient.name}</p>
            <p>{patient.illness}</p>
            <p>Dr. {patient.Doctor.name}</p>
            <button
                className="pointer-hover"
                onClick={(e) => {
                    navigate(`/patients/${patient.id}`)
                }}
            >
                Details
            </button>
        </div>
    )
}

export default PatientRow
