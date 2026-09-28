const pool = require('../db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedData() {
  try {
    console.log('🌱 Seeding database...');

    // Create demo admin
    const adminHashedPassword = await bcrypt.hash('admin123', 10);
    const adminResult = await pool.query(
      'INSERT INTO users (email, password_hash, role, first_name, last_name, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      ['admin@wemarket.com', adminHashedPassword, 'admin', 'Admin', 'User', 'active']
    );
    console.log('✓ Admin created');

    // Create demo sellers
    const sellerHashedPassword = await bcrypt.hash('seller123', 10);
    const sellers = [
      { email: 'nordic@wemarket.com', company: 'Nordic Home Goods' },
      { email: 'china@wemarket.com', company: 'China Manufacturing' },
      { email: 'europe@wemarket.com', company: 'European Supplies' }
    ];

    const sellerIds = [];
    for (const seller of sellers) {
      const result = await pool.query(
        'INSERT INTO users (email, password_hash, role, first_name, last_name, company_name, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [seller.email, sellerHashedPassword, 'seller', seller.company.split(' ')[0], seller.company.split(' ')[1], seller.company, 'active']
      );
      sellerIds.push(result.rows[0].id);

      // Create seller profile
      await pool.query(
        'INSERT INTO seller_profiles (user_id, company_name, country, verified, rating, total_sales) VALUES ($1, $2, $3, $4, $5, $6)',
        [result.rows[0].id, seller.company, 'Global', true, 4.5, 150]
      );
    }
    console.log('✓ Sellers created');

    // Create demo products
    const products = [
      { seller_id: sellerIds[0], name: 'Nordic Ceramic Mugs', category: 'Home & Kitchen', price: 15.99, stock: 100 },
      { seller_id: sellerIds[0], name: 'Minimalist Coffee Set', category: 'Home & Kitchen', price: 49.99, stock: 50 },
      { seller_id: sellerIds[1], name: 'Electric Power Drill', category: 'Tools', price: 89.99, stock: 30 },
      { seller_id: sellerIds[1], name: 'LED Lighting System', category: 'Electronics', price: 129.99, stock: 20 },
      { seller_id: sellerIds[2], name: 'Premium Leather Bag', category: 'Fashion', price: 199.99, stock: 15 },
      { seller_id: sellerIds[2], name: 'Organic Cotton T-Shirt', category: 'Fashion', price: 24.99, stock: 200 }
    ];

    for (const product of products) {
      await pool.query(
        'INSERT INTO products (seller_id, name, description, category, price, stock_quantity, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [product.seller_id, product.name, `High-quality ${product.name}`, product.category, product.price, product.stock, 'active']
      );
    }
    console.log('✓ Products created');

    // Create demo buyers
    const buyerHashedPassword = await bcrypt.hash('buyer123', 10);
    const buyers = [
      { email: 'buyer1@wemarket.com', name: 'John Smith' },
      { email: 'buyer2@wemarket.com', name: 'Sarah Johnson' }
    ];

    const buyerIds = [];
    for (const buyer of buyers) {
      const nameParts = buyer.name.split(' ');
      const result = await pool.query(
        'INSERT INTO users (email, password_hash, role, first_name, last_name, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [buyer.email, buyerHashedPassword, 'buyer', nameParts[0], nameParts[1], 'active']
      );
      buyerIds.push(result.rows[0].id);
    }
    console.log('✓ Buyers created');

    // Create sample orders
    await pool.query(
      'INSERT INTO orders (buyer_id, seller_id, total_amount, status) VALUES ($1, $2, $3, $4)',
      [buyerIds[0], sellerIds[0], 65.97, 'delivered']
    );
    await pool.query(
      'INSERT INTO orders (buyer_id, seller_id, total_amount, status) VALUES ($1, $2, $3, $4)',
      [buyerIds[1], sellerIds[1], 219.98, 'confirmed']
    );
    console.log('✓ Sample orders created');

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('Admin:  admin@wemarket.com / admin123');
    console.log('Seller: nordic@wemarket.com / seller123');
    console.log('Buyer:  buyer1@wemarket.com / buyer123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedData();
