 import { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Common Reusable Style Blocks
  const glassCardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    boxSizing: "border-box"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020617, #1e1b4b, #000000)",
      color: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      paddingBottom: "48px",
      margin: 0,
      boxSizing: "border-box"
    }}>
      
      {/* Navbar Section */}
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
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            <a href="#dashboard" style={{ color: "#e2e8f0", textDecoration: "none", transition: "color 0.2s" }}>Dashboard</a>
            <a href="#products" style={{ color: "#ffffff", textDecoration: "none", borderBottom: "2px solid #ec4899", paddingBottom: "4px" }}>Products</a>
            <a href="#orders" style={{ color: "#e2e8f0", textDecoration: "none", transition: "color 0.2s" }}>Orders</a>
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard Container */}
      <main style={{
        maxWidth: "1280px",
        margin: "32px auto 0 auto",
        padding: "0 24px",
        boxSizing: "border-box"
      }}>
        
        {/* Search Input Card */}
        <div style={{
          ...glassCardStyle,
          maxWidth: "440px",
          marginBottom: "32px"
        }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#e9d5ff", marginBottom: "8px" }}>
            Search Product
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type product name or feature..."
              style={{
                width: "100%",
                padding: "12px 48px 12px 12px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
            <div style={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Column Product Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px"
          }}>
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box"
                }}
              >
                {/* Product Image Box */}
                <div style={{ height: "192px", width: "100%", backgroundColor: "rgba(46, 16, 101, 0.4)", overflow: "hidden" }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Content Area */}
                <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#ffffff", margin: 0 }}>
                      {product.name}
                    </h3>
                    <p style={{
                      fontSize: "13px",
                      color: "#cbd5e1",
                      marginTop: "8px",
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {product.description}
                    </p>
                  </div>

                  <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "16px" }}>
                    <span style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      style={{
                        padding: "6px 14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "8px",
                        background: "linear-gradient(to right, #ec4899, #9333ea)",
                        color: "#ffffff",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            width: "100%",
            textAlign: "center",
            padding: "64px 0",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
            borderRadius: "16px"
          }}>
            <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>No products match your search criteria.</p>
          </div>
        )}

      </main>

      {/* Modal View Layout Component */}
      {selectedProduct && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: "16px"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "16px",
            padding: "24px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box"
          }}>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px" }}
            />

            <h2 style={{ fontSize: "24px", fontWeight: "700", marginTop: "16px", marginBottom: 0 }}>
              {selectedProduct.name}
            </h2>

            <p style={{ marginTop: "8px", color: "#475569", fontSize: "14px", lineHeight: "1.5" }}>
              {selectedProduct.description}
            </p>

            <p style={{ fontSize: "24px", fontWeight: "700", marginTop: "16px", marginBottom: 0, color: "#6b21a8" }}>
              ₹{selectedProduct.price}
            </p>

            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "10px 0",
                borderRadius: "12px",
                backgroundColor: "#ef4444",
                color: "#ffffff",
                fontWeight: "600",
                border: "none",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;