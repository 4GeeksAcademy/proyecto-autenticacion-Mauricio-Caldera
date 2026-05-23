import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" className="form-control mb-3" 
                       value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" className="form-control mb-3" 
                       value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="btn btn-success">Ingresar</button>
            </form>
        </div>
    );
};