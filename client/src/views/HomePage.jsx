import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [facilityData, setFacilityData] = useState([])
    const [illnessData, setIllnessData] = useState({})
    const [insuranceData, setInsuranceData] = useState({})
    const [riskData, setRiskData] = useState({})

    async function fetchData() {
        setLoading(true)
        try {
            const {data} = await axios({
                method: "get",
                url: "http://localhost:3000/Patients",
                params: {
                    "_expand": "Ward"
                }
            })
            facility(data)
            illness(data)
            insurance(data)
            risk(data)
            setData(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    function facility(data) {
        let obj = {}
        let result = []

        for (const item of data) {
            if (!obj[item.Ward.name]) {
                obj[item.Ward.name] = 0
            }
            obj[item.Ward.name] += 1
        }

        for (const [key, value] of Object.entries(obj)) {
            result.push({
                name: key,
                count: value
            })
        }

        setFacilityData(result)
    }

    function illness(data) {
        let result = {}

        for (const item of data) {
            if (!result[item.illness]) {
                result[item.illness] = 0
            }
            result[item.illness] += 1
        }

        setIllnessData(result)
    }

    function insurance(data) {
        let result = {
            yes: 0,
            no: 0
        }

        for (const item of data) {
            if (item.info.insurance) {
                result.yes += 1
            } else {
                result.no += 1
            }
        }

        setInsuranceData(result)
    }

    function risk(data) {
        let result = {}

        for (const item of data) {
            if (!result[item.info.risk]) {
                result[item.info.risk] = 0
            }
            result[item.info.risk] += 1
        }

        setRiskData(result)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <LoadingScreen 
            name="Dashboard"
            />
        )
    }

    return (
        <>
            <h1>Home Page</h1>
            <Pie
            data={{
                labels: facilityData.map((el) => {
                    return el.name
                }),
                datasets: [
                    {
                        label: facilityData.map((el) => {
                            return el.name
                        }),
                        data: facilityData.map((el) => {
                            return el.count
                        })
                    }
                ]
            }}
            />
        </>
    );
}

export default HomePage;