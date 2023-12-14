import "./PatientRow.scss"

function PatientRow(props) {
    const {patient} = props
    return (
        <div className="patient-row">
            <img src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png" alt="" />
            <p>{patient.name}</p>
            <p>{patient.illness}</p>
            <p>{patient.Doctor.name}</p>
            <button>Details</button>
        </div>
    )
}

export default PatientRow
