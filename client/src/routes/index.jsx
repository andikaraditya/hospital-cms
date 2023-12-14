import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage";
import PatientPage from "../views/PatientPage";
import PatientDetailPage from "../views/PatientDetailPage";
import CardPage from "../views/CardPage";
import CardDetailPage from "../views/CardDetail";
import PatientFormPage from "../views/PatientFormPage";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/patients",
                children: [
                    {
                        index: true,
                        element: <PatientPage />
                    },
                    {
                        path: ":id",
                        element: <PatientDetailPage />
                    }
                ]
            },
            {
                path: "/doctors",
                children: [
                    {
                        index: true,
                        element: <CardPage />
                    },
                    {
                        path: ":id",
                        element: <CardDetailPage />
                    }
                ]
            },
            {
                path: "/facilities",
                children: [
                    {
                        index: true,
                        element: <CardPage />
                    },
                    {
                        path: ":id",
                        element: <CardDetailPage />
                    }
                ]
            },
            {
                path: "/create",
                element: <PatientFormPage />
            },
            {
                path: "/edit/:id",
                element: <PatientFormPage />
            },
        ]
    }
])