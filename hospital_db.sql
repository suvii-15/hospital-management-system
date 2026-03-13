USE hospital_db;-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

------------------------------------------------
-- USERS TABLE (LOGIN)
------------------------------------------------

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO users (username,password) VALUES
('admin','admin123');


------------------------------------------------
-- PATIENTS TABLE
------------------------------------------------

CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    disease VARCHAR(100),
    phone VARCHAR(20),
    admission_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO patients (name,age,gender,disease,phone) VALUES
('Kumar',40,'Male','Cancer','8789900765'),
('Rani',30,'Female','Fever','9080706050'),
('Ravi Kumar',35,'Male','Fever','9876543210'),
('Naveen',28,'Male','Cold','9876798988');


------------------------------------------------
-- DOCTORS TABLE
------------------------------------------------

CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100),
    phone VARCHAR(20),
    experience INT
);

INSERT INTO doctors (name,specialization,phone,experience) VALUES
('Dr. Raj','Cardiologist','9876543211',10),
('Dr. Meena','Dermatologist','9876543212',7),
('Dr. Arun','Orthopedic','9876543213',12),
('Dr. Priya','Neurologist','9876543214',8);


------------------------------------------------
-- APPOINTMENTS TABLE
------------------------------------------------

CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100),
    doctor_name VARCHAR(100),
    appointment_date DATE,
    status VARCHAR(20)
);

INSERT INTO appointments (patient_name,doctor_name,appointment_date,status) VALUES
('Kumar','Dr. Raj','2026-03-14','Scheduled'),
('Rani','Dr. Priya','2026-03-15','Completed');


------------------------------------------------
-- BILLING TABLE
------------------------------------------------

CREATE TABLE billing (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100),
    treatment VARCHAR(100),
    amount DECIMAL(10,2),
    payment_date DATE DEFAULT CURRENT_DATE
);

INSERT INTO billing (patient_name,treatment,amount) VALUES
('Kumar','Cancer Treatment',1200),
('Rani','Fever Treatment',350),
('Ravi Kumar','General Checkup',200),
('Naveen','Cold Treatment',210);


------------------------------------------------
-- DASHBOARD QUICK STATS VIEW
------------------------------------------------

CREATE VIEW dashboard_stats AS
SELECT
(SELECT COUNT(*) FROM patients) AS patients,
(SELECT COUNT(*) FROM doctors) AS doctors,
(SELECT COUNT(*) FROM appointments) AS appointments,
(SELECT SUM(amount) FROM billing) AS revenue;