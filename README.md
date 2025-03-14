# 📧 SMTP Notification Service - Document Tracking System

This module handles email notifications for the Document Tracking System using **Postfix** as the SMTP server, integrated with **Django**. It runs as a **Docker container** for easy deployment.

---

## 🚀 Features
- Automated email notifications.
- Integrated with Django using SMTP.
- Containerized with Docker for scalability.

---

## 🛠️ Technologies Used
- **Postfix** (SMTP server)  
- **Docker** (Containerization)  
- **Django** (Backend integration)  
- **Namshi SMTP Docker Image**  

---

## ⚙️ Setup and Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-org/Document-Tracking-System.git
   cd Document-Tracking-System
   ```
2. **Start the SMTP Server:**
   ```bash
   sudo docker-compose up -d --build
   ```
3. **Configure Django (`settings.py`):**
   ```python
   EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
   EMAIL_HOST = 'smtp_server'
   EMAIL_PORT = 2525
   DEFAULT_FROM_EMAIL = 'noreply@yourdomain.com'
   ```
4. **Test Email:**
   Visit:
   ```
   http://localhost:8000/send-email/
   ```

---

## 🔄 Restarting the SMTP Server
```bash
sudo docker-compose down
sudo docker-compose up -d --build
```

---

## 🐛 Troubleshooting
- **Port Conflicts:** Stop Postfix if needed:
  ```bash
  sudo systemctl stop postfix
  ```
- **Check Logs:**
  ```bash
  docker logs smtp_server
  sudo tail -f /var/log/mail.log
  ```
- **Firewall:** Allow SMTP port:
  ```bash
  sudo ufw allow 2525
  ```

---

Let me know if you need more adjustments or details! 💪
