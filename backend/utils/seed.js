require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/category.model');
const Product = require('../models/product.model').default;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shop-here';

const seedDB = async () => {
  try {
    // Connect to Database
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing Categories and Products!');

    // Create Categories
    const categoriesData = [
      { name: 'Men', parent: null },
      { name: 'Women', parent: null },
      { name: 'Kids', parent: null },
      { name: 'Accessories', parent: null }
    ];

    const insertedCategories = await Category.insertMany(categoriesData);
    console.log('Inserted Categories!');

    // Helper to find category ID by name
    const getCatId = (name) => {
      const cat = insertedCategories.find(c => c.name === name);
      return cat ? cat._id : null;
    };

    // Create Products
    const productsData = [
      {
        name: "Men's Premium Jacket",
        description: "A stylish, water-resistant windbreaker perfect for casual and sporty wear. Features deep pockets, adjustable cuffs, and premium zippers.",
        price: 120,
        discountPrice: 109.99,
        stock: 50,
        category: getCatId('Men'),
        brand: 'UrbanStyle',
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "https://images.unsplash.com/photo-1551028719-00167b16eac5"],
        ratings: { average: 4.5, count: 120 }
      },
      {
        name: "Women's Elegant Summer Dress",
        description: "Flowy, breathable linen blend dress with a beautiful silhouette. Ideal for sunny afternoon walks or evening dinner dates.",
        price: 95,
        discountPrice: 85,
        stock: 35,
        category: getCatId('Women'),
        brand: 'Lumina',
        images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c", "https://images.unsplash.com/photo-1595777457583-95e059d581b8"],
        ratings: { average: 4.8, count: 98 }
      },
      {
        name: "Athletic Running Sneakers",
        description: "High-performance running shoes designed for ultimate comfort, shock absorption, and high grip durability. Mesh upper allows maximum airflow.",
        price: 150,
        discountPrice: null,
        stock: 80,
        category: getCatId('Men'), // or Accessories, we can put under Men
        brand: 'Velocity',
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff", "https://images.unsplash.com/photo-1491553895911-0055eca6402d"],
        ratings: { average: 4.7, count: 240 }
      },
      {
        name: "Classic Leather Hand Bag",
        description: "Genuine full-grain leather hand bag featuring polished brass hardware and multiple interior compartments for perfect organization.",
        price: 80,
        discountPrice: 72.50,
        stock: 20,
        category: getCatId('Accessories'),
        brand: 'Aura',
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa"],
        ratings: { average: 4.6, count: 64 }
      },
      {
        name: "Women's Comfort Knit Sweater",
        description: "Cozy oversized knitted pullover sweater. Crafted from an ultra-soft premium wool blend to keep you exceptionally warm and stylish.",
        price: 65,
        discountPrice: null,
        stock: 45,
        category: getCatId('Women'),
        brand: 'Lumina',
        images: ["https://images.unsplash.com/photo-1574164904299-3a102b110380"],
        ratings: { average: 4.4, count: 50 }
      },
      {
        name: "Unisex Streetwear Hoodie",
        description: "Thick cotton fleece hoodie with double-lined hood and spacious kangaroo pocket. Designed for ultimate streetwear vibes.",
        price: 75,
        discountPrice: 60,
        stock: 100,
        category: getCatId('Men'),
        brand: 'UrbanStyle',
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7"],
        ratings: { average: 4.3, count: 180 }
      },
      {
        name: "Minimalist Gold Wristwatch",
        description: "Elegant gold watch with a stainless steel mesh strap and scratch-resistant sapphire crystal glass face.",
        price: 180,
        discountPrice: 159,
        stock: 15,
        category: getCatId('Accessories'),
        brand: 'Chronos',
        images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"],
        ratings: { average: 4.9, count: 32 }
      },
      {
        name: "Kids Playful Denim Overalls",
        description: "Super durable and stretchable denim overalls for toddlers and kids. Featuring cute cartoon detailing and adjustable shoulder straps.",
        price: 45,
        discountPrice: null,
        stock: 30,
        category: getCatId('Kids'),
        brand: 'TinyTots',
        images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea"],
        ratings: { average: 4.7, count: 42 }
      }
    ];

    await Product.insertMany(productsData);
    console.log('Inserted Products!');
    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDB();
