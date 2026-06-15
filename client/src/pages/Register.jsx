 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
         `${API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(response.data.message);
      navigate("/login");

    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (  
    <div style={{
      backgroundColor: "#6592be",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      boxSizing: "border-box",
      margin: 0,
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "45px 40px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1A1A1A", margin: 0, letterSpacing: "0.5px" }}>MAHESHWARA</h1>
          <p style={{ fontSize: "13px", fontWeight: "500", color: "#666666", margin: "4px 0 0 0" }}>Product Management System</p>
        </div>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#4A4A4A", margin: 0 }}>Create Account</h2>
          <p style={{ fontSize: "13px", color: "#777777", margin: "4px 0 0 0" }}>Get started with your free account today</p>
        </div>

        {error && (
          <div style={{ marginBottom: "16px", padding: "10px", borderRadius: "6px", backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b", fontSize: "13px", textAlign: "center", fontWeight: "500" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
          
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
            <label style={{ fontSize: "14px", color: "#444444", fontWeight: "500", marginBottom: "6px", textAlign: "left" }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #cccccc", fontSize: "15px", color: "#333333", backgroundColor: "#ffffff", boxSizing: "border-box", outline: "none" }}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
            <label style={{ fontSize: "14px", color: "#444444", fontWeight: "500", marginBottom: "6px", textAlign: "left" }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #cccccc", fontSize: "15px", color: "#333333", backgroundColor: "#ffffff", boxSizing: "border-box", outline: "none" }}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
            <label style={{ fontSize: "14px", color: "#444444", fontWeight: "500", marginBottom: "6px", textAlign: "left" }}>Password</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{ width: "100%", padding: "10px 40px 10px 12px", borderRadius: "6px", border: "1px solid #cccccc", fontSize: "15px", color: "#333333", backgroundColor: "#ffffff", boxSizing: "border-box", outline: "none" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", background: "none", border: "none", padding: 0, color: "#999999", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
            <label style={{ fontSize: "14px", color: "#444444", fontWeight: "500", marginBottom: "6px", textAlign: "left" }}>Confirm Password</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                style={{ width: "100%", padding: "10px 40px 10px 12px", borderRadius: "6px", border: "1px solid #cccccc", fontSize: "15px", color: "#333333", backgroundColor: "#ffffff", boxSizing: "border-box", outline: "none" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", background: "none", border: "none", padding: 0, color: "#999999", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "#777777", lineHeight: "1.4", margin: "4px 0 8px 0", textAlign: "left" }}>
            By registering, you agree to our <a href="#terms" style={{ color: "#333333", textDecoration: "underline", fontWeight: 500 }}>Terms of Service</a> and <a href="#privacy" style={{ color: "#333333", textDecoration: "underline", fontWeight: 500 }}>Privacy Policy</a>.
          </p>

          <button type="submit" style={{
            width: "100%", padding: "13px", borderRadius: "6px", backgroundColor: "#e6537d", color: "#ffffff",
            border: "none", fontSize: "14px", fontWeight: "700", letterSpacing: "0.5px", cursor: "pointer",
            boxShadow: "0 4px 12px rgba(230, 83, 125, 0.2)", marginTop: "12px"
          }}>
            Register Account
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#555555", marginTop: "24px" }}>
          Already have an account?
          <button type="button" onClick={() => navigate("/login")} style={{ background: "none", border: "none", padding: 0, fontWeight: "700", textDecoration: "underline", color: "#222222", cursor: "pointer", marginLeft: "4px" }}>
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;