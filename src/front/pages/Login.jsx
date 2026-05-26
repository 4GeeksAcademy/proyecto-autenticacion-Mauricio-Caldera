import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem("token", data.access_token);
                navigate("/private");
            } else {
                alert("Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body p-4">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" placeholder="Correo electrónico" className="form-control" 
                                   value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="password" placeholder="Contraseña" className="form-control" 
                                   value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Ingresar</button>
                    </form>
                    <div className="text-center mt-3">
                        <span className="text-muted">¿No tienes cuenta? </span>
                        <Link to="/signup" className="text-decoration-none">Regístrate ahora</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};