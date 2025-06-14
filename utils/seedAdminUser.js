// In /seeders/adminUserSeeder.js

const mongoose = require("mongoose");
const AdminUser = require("../admin/models/AdminUser");
require("dotenv").config();
const connectDB = require("../config/database");

// Connect to MongoDB
connectDB();

const seedAdminUser = async () => {
    
      try {
        console.log("🌱 Seeding MissionVision Data...");
        const existing = await AdminUser.findOne({ email: 'admin@ngo.com' });
    
        if (existing) {
          console.log('⚠️ Admin user already exists. Skipping seed.');
        } else {
          const admin = new AdminUser({
            name: 'Admin',
            email: 'admin@ngo.com',
            password: 'Pass1234',
            dob: '01/01/1991',
            phone: '1234567891',
            isSuperAdmin: false,
            isAdmin: true,
            department: 'IT',
            position: 'Head of IT',
            designation: 'Executive',
            order: 2,
          });
          
    
          await admin.save();
          console.log('✅ Admin user seeded successfully!');
        }
      } catch (err) {
        console.error('❌ Error seeding admin user:', err);
      } finally {
        mongoose.connection.close();
      }
    };

// Run the seed function
seedAdminUser();
