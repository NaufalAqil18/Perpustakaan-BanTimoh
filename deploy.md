# Panduan Deployment Perpustakaan Ban Timoh

## Platform Deployment

### 1. Vercel (Frontend)

#### Setup Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

#### Environment Variables di Vercel
```
REACT_APP_API_URL=https://your-backend-domain.com
```

### 2. Railway (Backend)

#### Setup Railway
1. Buat akun di [Railway.app](https://railway.app)
2. Connect repository GitHub
3. Deploy otomatis

#### Environment Variables di Railway
```
PORT=5000
NODE_ENV=production
```

### 3. Heroku (Backend)

#### Setup Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

#### Environment Variables di Heroku
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
```

### 4. VPS (Manual Setup)

#### Prerequisites
- Ubuntu 20.04+
- Node.js 16+
- PM2
- Nginx

#### Setup Steps

1. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm nginx
sudo npm install -g pm2
```

2. **Clone Repository**
```bash
git clone <repository-url>
cd perpustakaan-bantimoh
npm install
```

3. **Build Frontend**
```bash
npm run build
```

4. **Setup PM2**
```bash
# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'perpustakaan-backend',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

5. **Setup Nginx**
```bash
sudo nano /etc/nginx/sites-available/perpustakaan
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/perpustakaan-bantimoh/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/perpustakaan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables

### Development
```bash
REACT_APP_API_URL=http://localhost:5000
PORT=5000
NODE_ENV=development
```

### Production
```bash
REACT_APP_API_URL=https://your-backend-domain.com
PORT=5000
NODE_ENV=production
```

## Database Setup (Optional)

### MongoDB
```bash
# Install MongoDB
sudo apt install mongodb

# Setup connection
npm install mongoose
```

### PostgreSQL
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Setup connection
npm install pg
```

## Monitoring & Logs

### PM2 Monitoring
```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit

# Restart app
pm2 restart perpustakaan-backend
```

### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Backup Strategy

### Automated Backup Script
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/perpustakaan"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup data files
cp -r /path/to/perpustakaan-bantimoh/data $BACKUP_DIR/data_$DATE

# Backup build files
cp -r /path/to/perpustakaan-bantimoh/build $BACKUP_DIR/build_$DATE

# Compress backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/data_$DATE $BACKUP_DIR/build_$DATE

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.tar.gz"
```

### Cron Job untuk Auto Backup
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
```bash
# Check what's using port 5000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

2. **Permission Denied**
```bash
# Fix file permissions
sudo chown -R $USER:$USER /path/to/app
sudo chmod -R 755 /path/to/app
```

3. **Nginx 502 Bad Gateway**
```bash
# Check if backend is running
pm2 status

# Restart backend
pm2 restart perpustakaan-backend

# Check nginx config
sudo nginx -t
```

4. **SSL Certificate Issues**
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

## Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images

### Backend
- Enable caching
- Use compression middleware
- Implement rate limiting
- Monitor memory usage

### Database (if using)
- Index optimization
- Query optimization
- Connection pooling
- Regular maintenance

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Regular backups scheduled
- [ ] Log monitoring enabled
- [ ] Firewall configured
- [ ] SSL certificate valid
- [ ] Dependencies updated
