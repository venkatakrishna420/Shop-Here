import React from "react";

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: "Men's Jacket",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      id: 2,
      name: "Women's Dress",
      price: "$95",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
    {
      id: 3,
      name: "Sneakers",
      price: "$150",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 4,
      name: "Hand Bag",
      price: "$80",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">FASHION HUB</h1>

        <ul className="nav-links">
          <li>Home</li>
          <li>Shop</li>
          <li>Men</li>
          <li>Women</li>
          <li>Contact</li>
        </ul>

        <button className="cart-btn">Cart</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>New Fashion Collection 2026</h1>
          <p>Discover trendy outfits and premium fashion styles.</p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="category-container">
          <div className="category-card">Men</div>
          <div className="category-card">Women</div>
          <div className="category-card">Kids</div>
          <div className="category-card">Accessories</div>
        </div>
      </section>

      {/* Products */}
      <section className="products">
        <h2>Trending Products</h2>

        <div className="product-container">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="product-info">
                <h3>{item.name}</h3>
                <p>{item.price}</p>

                <button>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="banner">
        <div className="banner-content">
          <h1>Summer Sale</h1>
          <p>Up to 50% Off on Selected Items</p>
          <button>Explore Deals</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2>FASHION HUB</h2>
        <p>© 2026 All Rights Reserved</p>
      </footer>

      {/* CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #f5f5f5;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          color: #ff4d6d;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 30px;
          font-size: 18px;
          cursor: pointer;
        }

        .nav-links li:hover {
          color: #ff4d6d;
        }

        .cart-btn {
          padding: 10px 20px;
          border: none;
          background: #ff4d6d;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }

        .hero {
          height: 90vh;
          background-image: url("https://images.unsplash.com/photo-1441986300917-64674bd600d8");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .hero-content p {
          font-size: 22px;
          margin-bottom: 20px;
        }

        .hero-content button {
          padding: 15px 30px;
          border: none;
          background: #ff4d6d;
          color: white;
          font-size: 18px;
          cursor: pointer;
          border-radius: 5px;
        }

        .categories {
          padding: 60px 50px;
          text-align: center;
        }

        .categories h2 {
          margin-bottom: 40px;
          font-size: 35px;
        }

        .category-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .category-card {
          background: white;
          padding: 50px;
          border-radius: 10px;
          font-size: 24px;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .category-card:hover {
          transform: translateY(-10px);
          background: #ff4d6d;
          color: white;
        }

        .products {
          padding: 60px 50px;
        }

        .products h2 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 35px;
        }

        .product-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .product-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .product-card:hover {
          transform: scale(1.03);
        }

        .product-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .product-info {
          padding: 20px;
          text-align: center;
        }

        .product-info h3 {
          margin-bottom: 10px;
        }

        .product-info p {
          color: #ff4d6d;
          font-size: 20px;
          margin-bottom: 15px;
        }

        .product-info button {
          padding: 10px 20px;
          border: none;
          background: black;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }

        .banner {
          height: 400px;
          background-image: url("https://images.unsplash.com/photo-1483985988355-763728e1935b");
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          margin-top: 50px;
        }

        .banner-content h1 {
          font-size: 55px;
          margin-bottom: 15px;
        }

        .banner-content p {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .banner-content button {
          padding: 15px 30px;
          border: none;
          background: #ff4d6d;
          color: white;
          font-size: 18px;
          border-radius: 5px;
          cursor: pointer;
        }

        .footer {
          background: black;
          color: white;
          text-align: center;
          padding: 30px;
          margin-top: 50px;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 20px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }

          .hero-content h1 {
            font-size: 40px;
          }

          .banner-content h1 {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}