import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error al escribir
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.email || !formData.password) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Por favor ingresa un email válido');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Aquí iría tu llamada al servicio de autenticación
            // Ejemplo: const response = await loginService(formData);

            // Simulación de login (reemplazar con tu lógica real)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Si el login es exitoso:
            console.log('Login exitoso:', formData);

            // Redirigir al dashboard o guardar token
            // window.location.href = '/admin/dashboard';

        } catch (err) {
            console.error('Error en login:', err);
            setError('Credenciales incorrectas. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="login-card">
                <div className="login-header">
                    <div className="logo-wrapper">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h1 className="login-title">Panel de Administración</h1>
                    <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <i className="fas fa-envelope"></i>
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="admin@ejemplo.com"
                            className="form-input"
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            <i className="fas fa-lock"></i>
                            Contraseña
                        </label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="form-input"
                                disabled={loading}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="password-toggle"
                                disabled={loading}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="form-footer">
                        <label className="checkbox-wrapper">
                            <input type="checkbox" />
                            <span className="checkbox-label">Recordarme</span>
                        </label>
                        <a href="#" className="forgot-password">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Ingresando...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i>
                                Iniciar Sesión
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="security-note">
                        <i className="fas fa-lock"></i>
                        Conexión segura y encriptada
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;