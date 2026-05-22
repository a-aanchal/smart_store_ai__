#SmartStore AI

##AI-Powered E-Commerce Admin Assistant

SmartStore AI is a modern AI-powered e-commerce admin dashboard that helps store owners manage products, monitor analytics, and generate intelligent sales insights using artificial intelligence.

The platform simplifies store management by providing:

Product management
Sales analytics
Inventory monitoring
AI-powered business suggestions
Revenue tracking

##📸Project Preview

Dashboard Overview - <img width="1916" height="988" alt="Screenshot 2026-05-22 172513" src="https://github.com/user-attachments/assets/0a2e4fed-97a1-44d2-856d-bf559f1e950a" />

Product Management -  <img width="1919" height="991" alt="Screenshot 2026-05-22 172426" src="https://github.com/user-attachments/assets/257989de-8038-4ca0-97de-54d42862ec2b" />

Analytics Dashboard - <img width="1912" height="990" alt="Screenshot 2026-05-22 172453" src="https://github.com/user-attachments/assets/3d29576d-baf8-4a6c-a632-681769e2f143" />

##🎥Demo Video

▶️ [Watch SmartStore AI Demo Video](https://drive.google.com/file/d/1T5tlspsuDrMJM8kKLYj3G6O0Es6Nwds-/view) 




##🧠Features

🔐 Authentication System

User Signup
User Login
JWT Authentication
Password Encryption using bcrypt

📦 Product Management

Add Products
Edit Products
Delete Products
Product Categories
Stock Monitoring
Low Stock Alerts

🤖 AI-Powered Features

AI Sales Suggestions
Product Recommendations
Inventory Insights
Smart Business Guidance
Marketing Suggestions

📊 Analytics Dashboard

Revenue Analytics
Product Category Analysis
Top-Selling Products
Sales Performance Charts
Recent Sales Activity

🛠️ Tech Stack
Technology	Usage

React + Vite  -	Frontend
Tailwind CSS  -	UI Styling
Chart.js      - Analytics Charts
Node.js	      - Backend Runtime
Express.js	  - Backend API
MongoDB       -	Database
JWT	          - Authentication
bcrypt	      - Password Security
Gemini API	  - AI Features

🏗️ System Architecture
<img width="887" height="772" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/a873745e-ac5f-4815-aaef-76410b1d40c7" />

🗂️ Project Structure

SmartStoreAi/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── charts/
│   │   ├── services/
│   │   └── App.jsx
│
├── docs/
│   ├── screenshots/
│   ├── architecture.png
│   └── db-schema.png
│
├── README.md
└── package.json

🗄️ Database Schema

Users Collection
{
  name: String,
  email: String,
  password: String
}
Products Collection
{
  title: String,
  category: String,
  price: Number,
  stock: Number,
  description: String,
  tags: [String]
}
Sales Collection
{
  productId: ObjectId,
  quantity: Number,
  revenue: Number,
  createdAt: Date
}
🔌 API Endpoints
Authentication APIs
POST /api/auth/signup
POST /api/auth/login
Product APIs
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
Analytics APIs
GET /api/analytics/revenue
GET /api/analytics/top-products
GET /api/analytics/category-share
AI APIs
POST /api/ai/suggestions
POST /api/ai/recommendations

⚙️ Environment Variables

Create a .env file inside the backend folder.

PORT=5000
MONGO_URI=mongodb://anchalkumari7000_db_user:HGHxCnZmRIgzIdvu@ac-qk62zcb-shard-00-00.wxamyx9.mongodb.net:27017,ac-qk62zcb-shard-00-01.wxamyx9.mongodb.net:27017,ac-qk62zcb-shard-00-02.wxamyx9.mongodb.net:27017/?ssl=true&replicaSet=atlas-4i1hoo-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=smartstore_secret_key_123
GEMINI_API_KEY=AIzaSyAeDr2nJitsdMSpSDEd1UHSV9B4Su6evOk


🚀 Installation Guide

Clone Repository
git clone https://github.com/your-username/SmartStoreAi.git
Backend Setup
cd backend

npm install

npm run dev
Frontend Setup
cd frontend

npm install

npm run dev

📈 Dashboard Functionalities

Revenue Analytics
Monthly revenue graph
Revenue trends
Business growth analysis
Inventory Monitoring
Stock management
Low-stock alerts
Product availability tracking
AI Suggestions
Product recommendations
Inventory suggestions
Marketing guidance

🔒 Security Features

JWT Authentication
Protected Routes
Encrypted Passwords
Secure API Handling

🌟 Future Enhancements

AI Product Description Generator
Email Notifications
Multi-Vendor Support
Payment Gateway Integration
Advanced AI Forecasting
Cloud Deployment

📸 Screenshots Folder

Place your screenshots inside:

docs/screenshots/

Recommended screenshots:

dashboard - <img width="1916" height="988" alt="Screenshot 2026-05-22 172513" src="https://github.com/user-attachments/assets/dc64a170-941b-4a41-84dc-e08eb59f967c" />

products - <img width="1919" height="991" alt="Screenshot 2026-05-22 172426" src="https://github.com/user-attachments/assets/a065d113-f30c-4bd1-b4b8-fc224376a2d5" />

analytics - <img width="1912" height="990" alt="Screenshot 2026-05-22 172453" src="https://github.com/user-attachments/assets/6ecbcfcf-58af-4d02-957b-bb9da5c98a7f" />

login - <img width="1918" height="987" alt="Screenshot 2026-05-22 180914" src="https://github.com/user-attachments/assets/6c429148-24f5-4004-b2aa-28fd1551b5bc" />

signup - <img width="1919" height="986" alt="Screenshot 2026-05-22 180938" src="https://github.com/user-attachments/assets/1c5a07fc-696e-4e47-a77c-5feec84fb02c" />


🧪 Testing

Run backend tests:

npm test

📦 Deployment

Frontend
Vercel
Backend
Render
Database
MongoDB Atlas

👩‍💻 Author

Anchal Kumari
Web Developer
MERN Stack Developer
AI Enthusiast

🤝 Contributing

Contributions are welcome.

Fork the repository
Create a new branch
Commit changes
Push changes
Create Pull Request

⭐ GitHub Commit Suggestions

git commit -m "Initialize React and Node.js setup"

git commit -m "Implement JWT authentication"

git commit -m "Add product management APIs"

git commit -m "Design dashboard UI"

git commit -m "Integrate analytics charts"

git commit -m "Implement AI sales suggestions"

git commit -m "Update README documentation"

📄 License

This project is licensed under the MIT License.




