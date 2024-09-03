import './App.css'
import SignupPage from './pages/SignupPage';
import SendMoney from './pages/SendMoney';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import SigninPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/send" element={<SendMoney />} />
  </Routes>
  )
}

export default App
