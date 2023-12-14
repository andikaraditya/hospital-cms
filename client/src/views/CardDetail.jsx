import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DoctorDetailPage() {
    const [page, setPage] = useState("")

    const url = useLocation().pathname

    useEffect(() => {
        if (url.includes('/doctors')) {
            setPage("Doctors")
        } else if (url.includes('/facilities')) {
            setPage("Facilities")
        }
    }, [])

    return (
        <>
            <h1>{page} Detail Page</h1>
        </>
    );
}

export default DoctorDetailPage;