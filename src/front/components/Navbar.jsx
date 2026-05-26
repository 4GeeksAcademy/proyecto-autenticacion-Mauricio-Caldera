import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token"); // Verificamos si hay token

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light shadow-sm">
            <div className="container">
                <Link to="/" className="text-decoration-none">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto d-flex gap-2">
                    {/* Renderizado condicional de los botones */}
                    {!token ? (
                        <>
                            <Link to="/login">
                                <button className="btn btn-outline-success">Ingresar</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-primary">Registrarse</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/private">
                                <button className="btn btn-outline-secondary">Vista Privada</button>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-danger">
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};