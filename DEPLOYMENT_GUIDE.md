# BMad PHASE 11: VPS DEPLOYMENT RUNBOOK

## 1. Server Preparation

Connect to your standard Hostinger VPS (Ubuntu/Debian) via SSH:
```bash
ssh user@your_vps_ip
# If Hostinger provided a root password, log in as root or run commands with sudo
```

Update packages and install dependencies:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg lsb-release git ufw
```

Install Docker and Docker Compose (using the official repository):
```bash
# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository (For Debian, replace 'ubuntu' with 'debian')
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
sudo docker --version
sudo docker compose version
```

## 2. File Transfer

To transfer your project files (`Dockerfile`, `docker-compose.yml`, `nginx.conf`, and your source code) to the VPS.

**Option A: Git Clone (Recommended for automation later)**
```bash
# On the VPS, clone your repository
git clone https://github.com/yourusername/print_marks_graphics.git
cd print_marks_graphics
```

**Option B: Secure Copy (SCP) from Local Machine**
```bash
# On your local macOS terminal, run:
scp -r docker-compose.yml Dockerfile nginx.conf src public package.json package-lock.json vite.config.js index.html user@your_vps_ip:/home/user/print_marks_graphics/
```

## 3. Environment Setup

Never commit your `.env` file to source control. Create it directly on the server.

```bash
# On the VPS, inside the project directory:
cd print_marks_graphics

# Create and edit the .env file
nano .env
```
Populate `.env` with necessary values:
```env
NODE_ENV=production
# Add any other required backend/frontend variables here
```
Save and exit the text editor (in nano: `Ctrl+O`, `Enter`, `Ctrl+X`).

## 4. Execution

Build the Docker image and start the container as defined in your `docker-compose.yml` in detached mode:

```bash
sudo docker compose up --build -d
```
*(If the VPS has an older version installed, it might be `docker-compose up --build -d`)*

## 5. Post-Deployment Verification

Check the container status to ensure it's "Up":
```bash
sudo docker ps
```

View the live logs to ensure the build completed and Nginx started without issues:
```bash
sudo docker compose logs -f
```

Test the response locally on the VPS:
```bash
curl http://localhost
# The app is now mapped to port 80 as defined in docker-compose.yml
```

## 6. Bonus: SSL/HTTPS Setup (Nginx Proxy Manager)

To securely serve traffic via HTTPS without manually configuring Let's Encrypt certificates every time:

1. **DNS Setup:** Go to your domain registrar (Hostinger) and point the A Record for `printmarks.com` and `www.printmarks.com` to your VPS IP address.
2. **Firewall:** Open web ports on the VPS:
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```
3. **Nginx Proxy Manager (NPM):** Deploy NPM in a separate Docker container on the VPS to handle routing and SSL.
   ```yaml
   # docker-compose.npm.yml
   version: '3.8'
   services:
     app:
       image: 'jc21/nginx-proxy-manager:latest'
       restart: unless-stopped
       ports:
         - '80:80'
         - '81:81'
         - '443:443'
       volumes:
         - ./data:/data
         - ./letsencrypt:/etc/letsencrypt
   ```
   Start it: `sudo docker compose -f docker-compose.npm.yml up -d`
4. **Configuration:**
   - Go to `http://your_vps_ip:81` and log into NPM (Default: `admin@example.com` / `changeme`).
   - Add a "Proxy Host" pointing `printmarks.com` to the internal IP or Docker network name of your `print_marks_graphics` container.
   - Go to the SSL tab, select "Request a new SSL Certificate" and tick "Force SSL".
   - Save, and your site now successfully runs on HTTPS!
