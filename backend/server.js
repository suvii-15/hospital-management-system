
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path=require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extented: true}));
app.use(express.static(path.join(__dirname,"../frontend")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@1525",
    database: "hospital_db"
});

db.connect(err => {
    if(err) console.log("DB Error", err);
    else console.log("MySQL Connected");
});


// ===================== LOGIN =====================

// LOGIN API
app.post("/login", (req,res)=>{

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username,password], (err,result)=>{

        if(err){
            console.log(err);
            return res.json({token:null});
        }

        if(result.length > 0){
            // login success
            res.json({
                token: "hospital-login-success"
            });
        }
        else{
            res.json({token:null});
        }

    });
});

// ================= PATIENT APIs =================

// GET all patients
app.get("/patients", (req, res) => {
    db.query("SELECT * FROM patients ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log(err);
            res.json([]);
        } else {
        res.json(result);
        }
    });
});

// ADD patient

    app.post("/patients", (req, res) => {

    console.log("DATA RECEIVED:", req.body);

    const { name, age, gender, disease, phone } = req.body;

    const sql = "INSERT INTO patients (name, age, gender, disease, phone) VALUES (?,?,?,?,?)";

    db.query(sql, [name, age, gender, disease, phone], (err, result) => {
        if (err) return res.send(err);
        res.json({ message: "Patient Added" });
    });
});

// ================= DOCTOR APIs =================

// GET all doctors
app.get("/doctors", (req, res) => {
    db.query("SELECT * FROM doctors", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

// ADD doctor
app.post("/doctors", (req, res) => {
    const { name, specialization, experience, phone, room } = req.body;

    const sql = "INSERT INTO doctors (name, specialization, experience, phone, room) VALUES (?,?,?,?,?)";
    db.query(sql, [name, specialization, experience, phone, room], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Doctor Added" });
    });
});

// DELETE doctor
app.delete("/doctors/:id", (req, res) => {
    db.query("DELETE FROM doctors WHERE id=?", [req.params.id], (err) => {
        if (err) return res.send(err);
        res.json({ message: "Doctor Deleted" });
    });
});

// ================= APPOINTMENT APIs =================
// GET Patients
app.get("/patients", (req, res) => {
    db.query("SELECT id, name FROM patients", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// GET Doctors
app.get("/doctors", (req, res) => {
    db.query("SELECT id, name FROM doctors", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// GET Appointments
app.get("/appointments", (req, res) => {

    const sql = `
        SELECT 
            a.appointment_id AS id,
            p.name AS patient_name,
            d.name AS doctor_name,
            a.appointment_date,
            a.appointment_time,
            a.reason,
            a.status
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.doctor_id
        ORDER BY a.appointment_id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);
    });
});
// ADD Appointment
app.post("/appointments", (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time, reason } = req.body;

    const sql = `
        INSERT INTO appointments 
        (patient_id, doctor_id, appointment_date, appointment_time, reason, status)
        VALUES (?, ?, ?, ?, ?, 'Booked')
    `;

    db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time, reason], 
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Appointment Added" });
    });
});



// DELETE
app.delete("/appointments/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM appointments WHERE appointment_id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Appointment deleted" });
        }
    );
});



// ================= BILLING APIs =================

// GET bills
app.get("/bills", (req, res) => {
    const sql = `
        SELECT b.id, p.name, b.doctor_charge, b.medicine_charge, b.room_charge, b.total, b.bill_date
        FROM bills b
        JOIN patients p ON b.patient_id = p.id
        ORDER BY b.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

// ADD bill
app.post("/bills", (req, res) => {
    const { patient_id, doctor_charge, medicine_charge, room_charge } = req.body;
    const total = Number(doctor_charge) + Number(medicine_charge) + Number(room_charge);

    const sql = `
        INSERT INTO bills (patient_id, doctor_charge, medicine_charge, room_charge, total)
        VALUES (?,?,?,?,?)
    `;

    db.query(sql, [patient_id, doctor_charge, medicine_charge, room_charge, total], (err, result) => {
        if (err) return res.send(err);
        res.json({ message: "Bill Generated" });
    });
});

// DELETE bill
app.delete("/bills/:id", (req, res) => {
    db.query("DELETE FROM bills WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.send(err);
        res.json({ message: "Bill Deleted" });
    });
});

// ================= DASHBOARD ANALYTICS =================
app.get("/dashboard", (req, res) => {

    const dashboard = {};

    db.query("SELECT COUNT(*) AS patients FROM patients", (err, result) => {
        dashboard.patients = result[0].patients;

        db.query("SELECT COUNT(*) AS doctors FROM doctors", (err, result) => {
            dashboard.doctors = result[0].doctors;

            db.query("SELECT COUNT(*) AS appointments FROM appointments", (err, result) => {
                dashboard.appointments = result[0].appointments;

                db.query("SELECT COUNT(*) AS today FROM appointments WHERE DATE(appointment_date)=CURDATE()", (err, result) => {
                    dashboard.todayAppointments = result[0].today;

                    db.query("SELECT IFNULL(SUM(total),0) AS revenue FROM bills", (err, result) => {
                        dashboard.revenue = result[0].revenue;

                        res.json(dashboard);
                    });
                });
            });
        });
    });
});

app.listen(3000,()=>console.log("Server running on port 3000"));
