function loadNavbar() {
    document.getElementById("navbar").innerHTML = `
    <div class="nav">
        <h2 class="logo">🏥 CarePlus Hospital</h2>

        <div class="links">
            <a href="dashboard.html">Dashboard</a>
            <a href="patients.html">Patients</a>
            <a href="doctors.html">Doctors</a>
            <a href="appointments.html">Appointments</a>
            <a href="billing.html">Billing</a>
            <button onclick="logout()" class="logout">Logout</button>
        </div>
    </div>
    `;
}
