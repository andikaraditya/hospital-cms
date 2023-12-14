import "./PatientRow.scss"

function PatientRow() {
    return (
        <div className="patient-row">
            <img src="https://placehold.co/400" alt="" />
            <p>Name</p>
            <p>Illness</p>
            <p>Doctor</p>
            <button>Details</button>
        </div>
    )
}

export default PatientRow
