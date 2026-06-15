 import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const handleAction = (type) => {
    console.log(`Triggering action: ${type}`);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/products");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customerRes = await axios.get("http://localhost:5000/api/users");
      setCustomers(customerRes.data);

      const countRes = await axios.get("http://localhost:5000/api/users/count");
      setCustomerCount(countRes.data.totalCustomers);

      const productRes = await axios.get("http://localhost:5000/api/products");
      setProducts(productRes.data);
    } catch (error) {
      console.log(error); 
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product Deleted");
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products/add", productData);
      alert("Product Added Successfully");
      setProductData({ name: "", description: "", price: "", image: "" });
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Product");
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, editingProduct);
      alert("Product Updated");
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  // Shared component design style blocks
  const glassCardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#120b24", // Deep purple-black background alternative
      background: "linear-gradient(135deg, #020617, #1e1b4b, #000000)",
      color: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      paddingBottom: "48px",
      margin: 0,
      boxSizing: "border-box"
    }}>
      
      {/* 1. Navbar Section */}
      <nav style={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "16px 24px",
        boxSizing: "border-box"
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "between",
          justifyContent: "space-between"
        }}>
          <span style={{
            fontSize: "20px",
            fontWeight: "800",
            letterSpacing: "1px",
            background: "linear-gradient(to right, #f472b6, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            MAHESHWARA
          </span>
          <h1 style={{
            fontSize: "18px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            color: "#e9d5ff",
            margin: 0,
          }}>
            Admin Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/login";
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "12px",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#fca5a5",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main style={{
        maxWidth: "1280px",
        margin: "32px auto 0 auto",
        padding: "0px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        boxSizing: "border-box"
      }}>
        
        {/* 2. Analytics Metric Cards Block */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px"
        }}>
          <div style={glassCardStyle}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#e9d5ff", textTransform: "uppercase", letterSpacing: "1px" }}>Total Customers</span>
            <span style={{ display: "block", fontSize: "36px", fontWeight: "800", marginTop: "8px" }}>{customerCount}</span>
          </div>
          <div style={glassCardStyle}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#e9d5ff", textTransform: "uppercase", letterSpacing: "1px" }}>Total Products</span>
            <span style={{ display: "block", fontSize: "36px", fontWeight: "800", marginTop: "8px" }}>{products.length}</span>
          </div>
          <div style={glassCardStyle}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#e9d5ff", textTransform: "uppercase", letterSpacing: "1px" }}>Services</span>
            <span style={{ display: "block", fontSize: "36px", fontWeight: "800", marginTop: "8px" }}>10</span>
          </div>
        </div>

        {/* 3. Quick Actions Segment */}
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "24px",
          borderRadius: "16px"
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 16px 0", letterSpacing: "0.5px" }}>Quick Actions</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <button 
              onClick={() => handleAction("Add Product")}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                background: "linear-gradient(to right, #ec4899, #9333ea)",
                color: "#ffffff",
                border: "none",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(147, 51, 234, 0.4)"
              }}
            >
              + Add Product
            </button>
            <button 
              onClick={() => handleAction("Add Service")}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              + Add Service
            </button>
          </div>
        </div>

        {/* Add Product Form Frame */}
        <div style={glassCardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", marginTop: "0px" }}>
            Add Product
          </h2>
          <form onSubmit={addProduct} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={productData.image}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                background: "linear-gradient(to right, #ec4899, #9333ea)",
                color: "#ffffff",
                border: "none",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Dynamic Edit Panel Component Block */}
        {editingProduct && (
          <div style={{
            backgroundColor: "rgba(234, 179, 8, 0.1)",
            border: "1px solid rgba(234, 179, 8, 0.2)",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", marginTop: "0px" }}>
              Edit Product
            </h2>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              style={{ ...inputStyle, marginBottom: "12px" }}
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              style={{ ...inputStyle, marginBottom: "16px" }}
            />
            <button
              onClick={updateProduct}
              style={{
                padding: "12px 20px",
                borderRadius: "12px",
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "none",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* 4. Recent Products Table */}
        <div style={{
          ...glassCardStyle,
          padding: 0,
          overflow: "hidden"
        }}>
          <div style={{ padding: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0, letterSpacing: "0.5px" }}>Recent Products</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "600px", textLeft: "left", textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#e9d5ff",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <th style={{ padding: "14px 24px" }}>Image</th>
                  <th style={{ padding: "14px 24px" }}>Name</th>
                  <th style={{ padding: "14px 24px" }}>Price</th>
                  <th style={{ padding: "14px 24px", textAlign: "center" }}>Edit</th>
                  <th style={{ padding: "14px 24px", textAlign: "center" }}>Delete</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {products.map((product) => (
                  <tr key={product._id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", transition: "background-color 0.2s" }}>
                    <td style={{ padding: "12px 24px" }}>
                      <img src={product.image} alt={product.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.1)" }} />
                    </td>
                    <td style={{ padding: "12px 24px", fontWeight: "500", color: "#ffffff" }}>{product.name}</td>
                    <td style={{ padding: "12px 24px", color: "#e2e8f0" }}>₹{product.price}</td>
                    <td style={{ padding: "12px 24px", textAlign: "center" }}>
                      <button
                        onClick={() => setEditingProduct(product)}
                        style={{ background: "none", border: "none", color: "#c084fc", fontWeight: "500", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Edit
                      </button>
                    </td>
                    <td style={{ padding: "12px 24px", textAlign: "center" }}>
                      <button 
                        onClick={() => handleDeleteProduct(product._id)} 
                        style={{ background: "none", border: "none", color: "#f87171", fontWeight: "500", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Customers Table Container */}
        <div style={{
          ...glassCardStyle,
          padding: 0,
          overflow: "hidden"
        }}>
          <div style={{ padding: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0, letterSpacing: "0.5px" }}>Customers</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "600px", textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#e9d5ff",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                  <th style={{ padding: "14px 24px" }}>Name</th>
                  <th style={{ padding: "14px 24px" }}>Email</th>
                  <th style={{ padding: "14px 24px" }}>Role</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px", color: "#e2e8f0" }}>
                {customers.map((customer) => (
                  <tr key={customer._id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "16px 24px", fontWeight: "500", color: "#ffffff" }}>{customer.name}</td>
                    <td style={{ padding: "16px 24px" }}>{customer.email}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: "rgba(168, 85, 247, 0.2)",
                        border: "1px solid rgba(168, 85, 247, 0.3)",
                        color: "#e9d5ff"
                      }}>
                        {customer.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;