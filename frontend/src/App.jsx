import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AuthProvider } from './contexts/AuthContext';

// Themes
import adminTheme from './theme/adminTheme';

// Components
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Views
import Home from './views/Home/Home';
import About from './views/About/About';
import Contacto from './views/Contacto/Contacto';
import Proyectos from './views/Proyectos/Proyectos';
import ProjectDetails from './views/Proyectos/ProjectDetails';

// Admin Views
import Login from './views/Admin/Login/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './views/Admin/Dashboard/Dashboard';
import Projects from './views/Admin/Projects/Projects';
import Categories from './views/Admin/Categories/Categories';
import Technologies from './views/Admin/Technologies/Technologies';
import Education from './views/Admin/Education/Education';
import Profile from './views/Admin/Profile/Profile';

// Styles
import './styles/global.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/proyectos" element={<Proyectos />} />
                  <Route path="/proyecto/:id" element={<ProjectDetails />} />
                </Routes>
              </>
            }
          />

          {/* Admin Login (with Navbar) */}
          <Route
            path="/admin/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          {/* Admin Routes (Protected with Material-UI) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <ThemeProvider theme={adminTheme}>
                  <CssBaseline />
                  <AdminLayout />
                </ThemeProvider>
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="categories" element={<Categories />} />
            <Route path="technologies" element={<Technologies />} />
            <Route path="education" element={<Education />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>

        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
