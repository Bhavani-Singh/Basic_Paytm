import './App.css'
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/send" element={<SendMoney />} />
  </Routes>
  )
}

export default App
