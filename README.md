🏥 Hospital Management System
A web-based Hospital Management System developed using HTML, CSS, JavaScript, Node.js, and MySQL to manage hospital operations such as patients, doctors, appointments, and billing.
This project helps hospital staff efficiently manage records and operations through a simple web interface.
📌 Features
🔐 Admin Login System
👨‍⚕️ Doctor Management
🧑‍🤝‍🧑 Patient Management
📅 Appointment Scheduling
💳 Billing System
📊 Dashboard Overview
🗑️ Add / Delete Records
🛠️ Technologies Used
  Frontend
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Database
MySQL
Deployment
GitHub
Render
📂 Project Structure
Copy code

hospital-management-system
│
├── backend
│   ├── server.js
│   ├── package.json
│
├── frontend
│   ├── index.html
│   ├── dashboard.html
│   ├── patients.html
│   ├── doctors.html
│   ├── appointments.html
│   ├── bills.html
│   ├── css
│   └── js
│
├── hospital_db.sql
├── report.txt
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
Bash
  git clone https://github.com/YOUR_USERNAME/hospital-management-system.git
2️⃣ Install Node Modules
Bash
 cd backend
 npm install
3️⃣ Setup MySQL Database
Open MySQL and run:
SQL
   SOURCE hospital_db.sql;
This will create the database and tables.
4️⃣ Start Backend Server
Bash
  node server.js
Server will start at:
   http://localhost:3000
5️⃣ Open Frontend
Open:
  index.html
in your browser.
🔑 Default Login
   Username: admin
   Password: admin
📊 Modules
Dashboard
Shows overview of hospital system.
Patients
Add, view, and delete patient records.
Doctors
Manage doctor information.
Appointments
Schedule patient appointments.
Billing
Generate and manage billing records.
🚀 Future Improvements
Online database hosting
Authentication with JWT
Role-based login
Patient portal
Appointment reminders
Report generation
👩‍💻 Author
S.Suveetha 
B.E (Artificial Intelligence & Data Science)
📜 License
This project is developed for educational purposes.
