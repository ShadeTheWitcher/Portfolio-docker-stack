import React, { useState } from 'react';
import './Login.scss';
import { login } from '../../../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            e.preventDefault();
            handleSubmit(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!formData.usuario || !formData.password) {
            setError('Por favor completa todos los campos');
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await login(formData.usuario, formData.password);

            if (!result || !result.token) {
                throw new Error('Respuesta inválida del servidor');
            }

            setTimeout(() => {
                window.location.href = '/admin/dashboard';
            }, 500);

            return false;

        } catch (err) {
            setLoading(false);

            if (err?.response) {
                const status = err.response.status;
                const data = err.response.data;

                if (status === 401 || status === 400) {
                    setError('Usuario o contraseña incorrectos');
                } else if (status === 404) {
                    setError('Usuario no encontrado');
                } else if (status === 500) {
                    setError('Error en el servidor. Intenta más tarde.');
                } else {
                    setError(data?.message || data?.error || 'Error al iniciar sesión');
                }
            } else if (err?.request) {
                setError('No se pudo conectar con el servidor. Verifica tu conexión.');
            } else {
                setError(err?.message || 'Error inesperado. Por favor intenta de nuevo.');
            }

            return false;
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

                <form onSubmit={(e) => { e.preventDefault(); return false; }} className="login-form" noValidate>
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="usuario" className="form-label">
                            <i className="fas fa-user"></i>
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Tu usuario"
                            className="form-input"
                            disabled={loading}
                            autoComplete="username"
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
                                onKeyPress={handleKeyPress}
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
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
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