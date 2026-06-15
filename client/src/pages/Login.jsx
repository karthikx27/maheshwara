 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login` {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    // Canvas base color set exactly to the image workspace blue (#6592be)
    <div style={{
      backgroundColor: "#6592be",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      boxSizing: "border-box",
      margin: 0,
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      
      {/* Crisp white rounded card frame matching layout proportions exactly */}
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
        
        {/* Header Block Alignment */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ 
            fontSize: "18px", 
            fontWeight: "700", 
            color: "#444444", 
            margin: 0, 
            letterSpacing: "0.5px"
          }}>
            LOGIN
          </h1>
        </div>

        {/* Input Processing Section */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
          
          {/* Email Block */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "18px" }}>
            <label style={{ fontSize: "14px", color: "#444444", fontWeight: "500", marginBottom: "6px", textAlign: "left" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #cccccc",
                fontSize: "15px",
                color: "#333333",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
                outline: "none"
              }}
              required
            />
          </div>

          {/* Password Block */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "18px" }}>
            <label style={{ fontSize: "14px", color: "#444444", fontWeight: "500", marginBottom: "6px", textAlign: "left" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #cccccc",
                fontSize: "15px",
                color: "#333333",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
                outline: "none"
              }}
              required
            />
          </div>

          {/* Styled Remember Me checkbox layout row */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "22px" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "14px", color: "#333333", userSelect: "none" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
              />
              {/* Custom checkbox background turning to pink (#e6537d) when active */}
              <div style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                border: "1px solid #cccccc",
                backgroundColor: rememberMe ? "#e6537d" : "#ffffff",
                borderColor: rememberMe ? "#e6537d" : "#cccccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
                marginRight: "10px"
              }}>
                <svg style={{ width: "10px", height: "10px", fill: "none", stroke: "white", strokeWidth: "3.5px", display: rememberMe ? "block" : "none" }} viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              Remember me?
            </label>
          </div>

          {/* Action Trigger Elements */}
          <div style={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
            {/* Flat pink submit trigger block (#e6537d) */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "6px",
                backgroundColor: "#e6537d",
                color: "#ffffff",
                border: "none",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(230, 83, 125, 0.2)",
                marginBottom: "10px"
              }}
            >
              LOGIN
            </button>
            
            {/* Muted right-aligned assistance link placement */}
            <div style={{ textAlign: "right", marginBottom: "4px" }}>
              <button
                type="button"
                onClick={() => alert("Redirecting to password recovery route...")}
                style={{ background: "none", border: "none", padding: 0, fontSize: "13px", color: "#777777", cursor: "pointer" }}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </form>

        {/* Flat horizontal split divider box containing 'OR' badge */}
        <div style={{ position: "relative", margin: "24px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: "100%", borderTop: "1px solid #dddddd", zIndex: 1 }}></div>
          <div style={{ position: "relative", zIndex: 2, padding: "2px 10px", backgroundColor: "#ffffff", fontSize: "12px", fontWeight: "600", color: "#999999", border: "1px solid #dddddd", borderRadius: "4px" }}>
            OR
          </div>
        </div>

        {/* Pure structural single-click authentication circles */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "26px" }}>
          {/* Google Button */}
          <button 
            type="button"
            style={{
              width: "38px", height: "38px", borderRadius: "50%", border: "2px solid #ef4444",
              backgroundColor: "transparent", color: "#ef4444", fontSize: "16px", fontWeight: "700",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0
            }}
            title="Sign in with Google"
          >
            G
          </button>
          
          {/* Facebook Button */}
          <button 
            type="button"
            style={{
              width: "38px", height: "38px", borderRadius: "50%", border: "2px solid #2b5494",
              backgroundColor: "transparent", color: "#2b5494", fontSize: "16px", fontWeight: "700",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0
            }}
            title="Sign in with Facebook"
          >
            f
          </button>

          {/* LinkedIn Button */}
          <button 
            type="button"
            style={{
              width: "38px", height: "38px", borderRadius: "50%", border: "2px solid #1266b1",
              backgroundColor: "transparent", color: "#1266b1", fontSize: "14px", fontWeight: "700",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0
            }}
            title="Sign in with LinkedIn"
          >
            in
          </button>
        </div>

        {/* Underlined clean registration navigation link summary row */}
        <div style={{ textAlign: "center", fontSize: "13px", color: "#555555" }}>
          Need an account?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{ background: "none", border: "none", padding: 0, fontWeight: "700", textDecoration: "underline", color: "#222222", cursor: "pointer", marginLeft: "4px" }}
          >
            SIGN UP
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;