# 🌱 Greenfield Student Connect – Student Management System

A full-stack student management platform designed for colleges to manage students, teachers, classes, attendance, and administration workflows.  
Built using **React + TailwindCSS (Frontend)** and **Spring Boot + PostgreSQL (Backend)**.

---

## 🚀 Features

### 🔹 **Admin Features**
- Manage Students (CRUD)
- Manage Teachers (CRUD)
- Manage Classes (CRUD)
- Assign Teachers to Classes
- Assign Students to Classes
- View & manage attendance
- View analytics (students, classes, attendance)

### 🔹 **Teacher Features**
- View assigned classes
- Mark attendance for students
- Update attendance
- View student list in each class

### 🔹 **Student Features**
- View personal profile
- View attendance percentage
- View class details
- View teachers assigned

### 🔹 **System Features**
- JWT Authentication (Login/Register)
- Secure role-based access control (Admin / Teacher / Student)
- PostgreSQL persistent storage
- Soft delete for entities (via BaseEntity)
- Automatic auditing (createdAt, updatedAt, createdBy, updatedBy)

---

# 🛠️ Tech Stack

### **Frontend**
- React.js
- TailwindCSS
- Storybook
- Axios
- React Router

### **Backend**
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL
- Lombok

### **Dev Tools**
- Maven
- Postman / ThunderClient
- Git + GitHub

---

# 📁 Project Structure

## **Frontend Structure**
```
sms_frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── stories/        # Storybook stories
│   ├── styles/
│   ├── redux/
│   ├── App.jsx
│── main.jsx
│── index.css
│── app.css
├── package.json
└── vite.config.js
```

---

## **Backend Structure**
```
backend/
└── src/main/java/com/example/studentmanagement/
    ├── config/
    ├── controller/
    ├── dto/
    ├── entity/
    ├── exception/
    ├── mapper/
    ├── payload/
    ├── repository/
    ├── security/
    ├── service/
    ├── StudentManagementApplication.java
```

---

# 🗄️ Database Schema

### **User**
```
id, username, password, firstName, lastName,
email, gender, phone, address,
department, semester, admissionNumber,
role_id, class_id
```

### **Role**
```
id, name (ADMIN | TEACHER | STUDENT)
```

### **ClassEntity**
```
id, className, department, teacher_id
```

### **Attendance**
```
id, student_id, class_id, date, present, remarks
```

### **BaseEntity (Inherited by all entities)**
```
createdAt, updatedAt, createdBy, updatedBy, deleted, deletedAt
```

---

# 🔐 Authentication Flow (JWT)

1. User logs in → receives JWT token  
2. Token is attached to all protected requests  
3. Spring Security validates & authorizes based on role  
4. Access granted to matching role routes  

---

# 🌐 API Documentation

## **AUTH**
- `POST /api/auth/login`
- `POST /api/auth/register`

---

## **ADMIN APIs**

### **User Management**
- `GET /api/admin/users`
- `GET /api/admin/users/{id}`
- `POST /api/admin/users`
- `PUT /api/admin/users/{id}`
- `DELETE /api/admin/users/{id}`
- `GET /api/admin/users/search?q=keyword`

### **Teacher Management**
- `POST /api/admin/teachers`
- `PUT /api/admin/teachers/{id}`
- `DELETE /api/admin/teachers/{id}`
- `GET /api/admin/teachers`
- `GET /api/admin/teachers/{id}`

### **Student Management**
- `POST /api/admin/students`
- `GET /api/admin/students`
- `GET /api/admin/students/{id}`
- `PUT /api/admin/students/{id}`
- `DELETE /api/admin/students/{id}`
- `GET /api/admin/attendance/search?from=...&to=...`
 

### **Class Management**
- `POST /api/admin/classes`
- `GET /api/admin/classes`
- `GET /api/admin/classes/{id}`
- `PUT /api/admin/classes/{id}`
- `DELETE /api/admin/classes/{id}`

### **Assigning**
- `POST /api/admin/classes/{classId}/assign-teacher/{teacherId}`
- `POST /api/admin/classes/{classId}/assign-student/{studentId}`

---

## **TEACHER APIs**

### **Class & Student View**
- `GET /api/teacher/classes`
- `GET /api/teacher/classes/{classId}/students`

### **Attendance**
- `GET /api/teacher/classes/{classId}/attendance`
- `POST /api/teacher/classes/{classId}/attendance`
- `PUT /api/teacher/classes/{classId}/attendance/{attendanceId}`

---

## **STUDENT APIs**
- `GET /api/student/profile`
- `PUT /api/student/profile/update`
- `GET /api/student/attendance`
- `GET /api/student/class`
- `GET /api/student/attendance/search?from&to`
  
---

# ⚙️ Installation & Setup

## **Backend Setup**
```bash
cd backend
mvn spring-boot:run
```

### **Environment Variables (`application.properties`)**
```
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=postgres
spring.datasource.password=yourpassword

jwt.secret=your_jwt_secret
```

---

## **Frontend Setup**
```bash
cd sms_frontend
npm install
npm run dev
```

---

# 🚀 Production Deployment

### Backend

- Enable CORS for production
- Use environment variables for JWT & DB

### Frontend
- Build with:
  ```bash
  npm run build

# 📸 Screenshots (Add Later)
```
/screenshots
  login.png
  dashboard.png
  admin_manage_students.png
  attendance_marking.png
```

---

# 🤝 Contributing
1. Fork the repo  
2. Create a feature branch  
3. Commit your updates  
4. Create a pull request  

---
