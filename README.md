# 🎓 **Silab Admin**  

**Silab Admin** is a practical and efficient web application designed to simplify attendance management for laboratory sessions. It provides an intuitive platform to manage, track, and analyze student attendance with ease.  

---

## ✨ **Features**  

- **QR Code Attendance**: Students can mark their attendance by scanning a QR code.  
- **Attendance Management**: Easily track, edit, and manage attendance records for each session.  
- **Session Scheduling**: Organize and manage schedules for laboratory sessions.  
- **Real-Time Dashboard**: Monitor attendance statistics and trends in real-time.  
- **Secure Access**: Role-based authentication for admins, instructors, and students.  

---

## 🚀 **Technologies**  

- **Next.js**: A powerful React framework for building dynamic, server-rendered web applications.  
- **TailwindCSS**: A modern CSS framework for creating responsive and stylish designs.  
- **TypeScript**: Ensures type safety and better code maintainability.  
- **Node.js**: Handles backend logic and API integrations.  
- **QR Code Integration**: Generates and validates QR codes for attendance tracking.  

---

## 📸 **Screenshots**  

### Dashboard Overview  
> A comprehensive view of attendance data and session schedules.  
![Silab Admin Dashboard](./public/dashboard-screenshot.png)  

### Attendance Check-In  
> Students can check in using their unique QR codes.  
![QR Attendance Screenshot](./public/qr-screenshot.png)  

### Attendance Management Panel  
> Manage attendance records with options to add, edit, or delete.  
![Attendance Management Screenshot](./public/attendance-management.png)  

---

## 🛠️ **Installation**  

Follow these steps to set up **Silab Admin** locally:  

1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd silab-admin
   ```  

2. **Install Dependencies**  
   Ensure [Node.js](https://nodejs.org/) is installed. Then run:  
   ```bash
   npm install
   ```  

3. **Run the Application**  
   Start the development server with:  
   ```bash
   npm run dev
   ```  

4. **Access the Application**  
   Open your browser and navigate to:  
   ```
   http://localhost:3000
   ```  

---

## 💡 **How to Use**  

1. **Admin Login**: Log in using administrator credentials.  
2. **Create a Session**: Set up lab sessions, including date, time, and QR code generation.  
3. **Student Attendance**:  
   - Students scan the QR code provided at the session to mark their attendance.  
   - Admins can manually update attendance if needed.  
4. **View Reports**: Access attendance reports and analyze trends.  

---

## 🎨 **Customization**  

To adapt the application to your institution's branding:  
- Update the logo and assets in the `public/` folder.  
- Modify theme colors and styles in the `tailwind.config.ts` file.  

---
