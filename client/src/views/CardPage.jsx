import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function DoctorPage() {
    const [page, setPage] = useState("")

    const url = useLocation().pathname

    useEffect(() => {
        if (url === '/doctors') {
            setPage("Doctors")
        } else if (url === '/facilities') {
            setPage("Facilities")
        }
    }, [])
    
    return (
        <>
            <h1>{page} Page</h1>
        </>
    );
}

export default DoctorPage;