import React, { useState } from 'react';
import '../styles.css'; // Asegúrate de que tu CSS esté vinculado

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Estados para el registro
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [celular, setCelular] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [contraseña, setContraseña] = useState('');

    // Estado para ingresar código
    const [codigo, setCodigo] = useState('');
    const [codigosIngresados, setCodigosIngresados] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para hacer login
        console.log("Intento de inicio de sesión");
        setShowCodeModal(true); // Muestra el modal para ingresar el código
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        if (!nombre || !fechaNacimiento || !cedula || !correo || !celular || !ciudad || !contraseña) {
            setMensaje('Faltan campos requeridos *');
        } else {
            try {
                const response = await fetch('http://localhost:5000/api/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        fechaNacimiento,
                        cedula,
                        correo,
                        celular,
                        ciudad,
                        contraseña,
                    }),
                });

                if (response.ok) {
                    setMensaje('Usuario guardado exitosamente');
                    setShowRegister(false); // Cerrar modal
                } else {
                    setMensaje('Error al crear usuario');
                }
            } catch (error) {
                console.error('Error:', error);
                setMensaje('Error al crear usuario');
            }
        }
    };

    const handleCodigoSubmit = (e) => {
        e.preventDefault();
        const nuevaFecha = new Date().toLocaleDateString();
        setCodigosIngresados([...codigosIngresados, { fecha: nuevaFecha, codigo }]);
        setCodigo(''); // Limpiar el campo de código
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Usuario:</label>
                    <input type="text" placeholder="Ingrese su usuario" required />
                    <label>Contraseña:</label>
                    <input type="password" placeholder="Ingrese su contraseña" required />
                    <button type="submit">Entrar</button>
                </form>
                <p>{mensaje}</p>
                <button onClick={() => setShowRegister(true)}>Registrarse</button>
            </div>

            {/* Modal para registro */}
            {showRegister && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowRegister(false)}>&times;</span>
                        <h2>Registro</h2>
                        <form onSubmit={handleRegistro}>
                            <label>Nombre: <span className="required">*</span></label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            
                            <label>Fecha Nacimiento: <span className="required">*</span></label>
                            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />

                            <label>Cédula: <span className="required">*</span></label>
                            <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required />

                            <label>Correo: <span className="required">*</span></label>
                            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

                            <label>Celular: <span className="required">*</span></label>
                            <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} required />

                            <label>Ciudad: <span className="required">*</span></label>
                            <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />

                            <label>Contraseña: <span className="required">*</span></label>
                            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

                            <button type="submit">Registrarse</button>
                        </form>
                        <p>{mensaje}</p>
                    </div>
                </div>
            )}

            {/* Modal para ingresar código */}
            {showCodeModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCodeModal(false)}>&times;</span>
                        <h2>Ingrese el código</h2>
                        <form onSubmit={handleCodigoSubmit}>
                            <input
                                type="text"
                                placeholder="Ingrese el código"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <button type="submit">Ingresar</button>
                        </form>

                        <h3>Códigos ingresados:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Código</th>
                                    <th>Premio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {codigosIngresados.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.fecha}</td>
                                        <td>{item.codigo}</td>
                                        <td></td> {/* Premio vacío */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;




