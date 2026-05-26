import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

export const Private = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); 

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            setErrorMsg("Acceso denegado. Debes iniciar sesión para ver esta página.");
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
                setErrorMsg("Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.");
            });

    }, []);

    if (errorMsg) {
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card shadow-sm text-center border-danger" style={{ maxWidth: "500px", width: "100%" }}>
                    <div className="card-body p-5">
                        <h2 className="card-title text-danger mb-3">⚠️ Error de Acceso</h2>
                        <p className="card-text text-muted">{errorMsg}</p>
                        <Link to="/login" className="btn btn-outline-danger mt-3">
                            Ir a Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm text-center border-success" style={{ maxWidth: "600px", width: "100%" }}>
                <div className="card-body p-5">
                    <h1 className="card-title text-success mb-3">Panel Privado</h1>
                    <hr />
                    
                    {/* Aquí está el texto que solicitaste */}
                    <h4 className="text-dark mt-4 mb-3">Usted está en la vista privada</h4>
                    
                    <p className="card-text text-muted">
                        ¡Felicidades! Si estás viendo este mensaje, es porque estás autenticado correctamente y tu token es válido.
                    </p>
                </div>
            </div>
        </div>
    );
};