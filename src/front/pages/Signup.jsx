import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert("Usuario registrado. Por favor, inicia sesión.");
                navigate("/login");
            } else {
                const data = await response.json();
                alert(data.msg);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body p-4">
                    <h2 className="text-center mb-4">Crear Cuenta</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="email" placeholder="Correo electrónico" className="form-control"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="password" placeholder="Contraseña" className="form-control"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                    </form>
                    <div className="text-center mt-3">
                        <span className="text-muted">¿Ya tienes cuenta? </span>
                        <Link to="/login" className="text-decoration-none">Inicia sesión aquí</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};