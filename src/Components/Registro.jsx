import React, { useState } from 'react';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        fechaNacimiento: '',
        cedula: '',
        correo: '',
        celular: '',
        ciudad: '',
        contraseña: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            alert(data.message); // Mostrar el mensaje de respuesta
        } catch (error) {
            console.error('Error al crear usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
            <input type="date" name="fechaNacimiento" onChange={handleChange} required />
            <input type="text" name="cedula" placeholder="Cédula" onChange={handleChange} required />
            <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
            <input type="text" name="celular" placeholder="Celular" onChange={handleChange} required />
            <input type="text" name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
            <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Registro;

