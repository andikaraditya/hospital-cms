import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function DoctorPage() {
    const [page, setPage] = useState("")

    const url = useLocation().pathname

    useEffect(() => {
        console.log(url)
        if (url === '/doctors') {
            setPage("Doctors")
        } else if (url === '/facilities') {
            setPage("Facilities")
        }
    }, [page])
    
    return (
        <>
            <h1>{page} Page</h1>
        </>
    );
}

export default DoctorPage;