import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");


        if (!token) {
            navigate("/login");
            return;
        }


        fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Token inválido");
                return resp.json();
            })
            .then(data => {
                setIsAuthorized(true);
            })
            .catch(error => {
                console.error(error);
                sessionStorage.removeItem("token");
                navigate("/login");
            });

    }, [navigate]);

    if (!isAuthorized) return <div>Cargando...</div>;

    return (
        <div className="container mt-5">
            <h1>Panel Privado</h1>
            <p>¡Si estás viendo esto, es porque estás autenticado correctamente!</p>
        </div>
    );
};