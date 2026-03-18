# DEPLOYMENT ANALYSIS
## Print Marks Graphics: Vercel to Hostinger VPS Transition

### 1. Containerization Strategy

#### A. Multi-stage Builds
To deploy a React SPA built with Vite efficiently, we will utilize a multi-stage Dockerfile. 
- **Stage 1 (Build):** We use a Node.js image to install dependencies and run the `vite build` command. This stage contains all necessary development dependencies (like Tailwind CSS and Vite plugins) which are not needed in production.
- **Stage 2 (Serve):** We use a lightweight Nginx web server image. We copy only the compiled static assets from the `dist` folder generated in Stage 1. This ensures our final production image is exceptionally small and contains no Node.js runtime or toolchain, significantly minimizing the attack surface.

#### B. Image Optimization
For both stages, we will use Alpine Linux variants (e.g., `node:20-alpine`, `nginx:alpine`).
- **Reduced Footprint:** Alpine images are typically under 5MB, making the final Docker image pull and startup times extremely fast.
- **Enhanced Security:** A minimal base image means fewer underlying packages, which translates to fewer potential vulnerabilities.

#### C. SPA Routing (Nginx Configuration)
Since React Router handles routing on the client side, a direct request to a non-root path (e.g., `/contact`) will hit the Nginx server directly. If Nginx looks for a file named `contact` and doesn't find it locally, it returns a 404 error.
We will configure Nginx with a `try_files` directive to prevent this:
```nginx
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
}
```
This tells Nginx to first check if the requested file or directory exists. If it does not, it will fall back to serving `index.html`, allowing React Router to take over and render the correct view for the requested path.

### 2. VPS Infrastructure & Security

#### A. Reverse Proxy Strategy
We will employ a Reverse Proxy architecture on the Hostinger VPS to manage traffic routing and SSL termination safely.
- **Traefik (Recommended):** Traefik integrates seamlessly with Docker. It automatically detects new containers and routes traffic to them based on labels. Crucially, it handles Let's Encrypt SSL certificate generation and renewal automatically without manual intervention.
- **Alternative (Nginx Proxy Manager):** If a visual UI is preferred, Nginx Proxy Manager is a robust alternative that also automates Let's Encrypt certificates via a web dashboard.

#### B. Resource Management
To ensure project stability and prevent a single container from starving the Hostinger VPS of resources, we will define resource limits inside our `docker-compose.yml`.
```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 256M
    reservations:
      cpus: '0.1'
      memory: 128M
```
React SPAs served statically via Nginx have negligible resource requirements. Setting explicit limits ensures predictability on a shared or resource-constrained VPS environment.

#### C. Data Persistence
For a purely static React frontend, persistent volumes are generally **not required** for application data. 
- **Logs:** We will rely on Docker's default JSON file logging driver with size limits configured to prevent disk exhaustion. Long-term logs aren't critically necessary for a static frontend unless auditing access logs.
- **Static Assets/Uploads:** Our current SPA doesn't take user file uploads. If this changes in the future, uploads should be pushed directly to an external object storage service (like AWS S3 or Cloudflare R2) rather than written to the local VPS disk. This preserves the statelessness of our containers.

### 3. Workflow Definition

#### A. The Deployment Cycle
- **Initial Phase (Manual `docker-compose`):** For immediate migration, a manual deployment workflow via SSH is pragmatic. We pull the code to the server, run `docker compose build --pull`, and up the stack with `docker compose up -d`.
- **Target Phase (CI/CD via GitHub Actions):** For long-term maintainability, deployment must be fully automated. 
  1. A push to the `main` branch triggers a GitHub Action.
  2. The Action builds the Docker image.
  3. The Action pushes the image to a container registry (e.g., GitHub Container Registry).
  4. The Action connects to the Hostinger VPS via SSH to pull the new updated image and restart the container seamlessly. This eliminates human error and standardizes how code reaches production.

#### B. Environment Variables
React/Vite environment variables (e.g., public API endpoints, defined with the `VITE_` prefix) are bundled into the static JavaScript files **at build time**, not runtime.
- **Build-Time Injection:** We must provide the `.env` file or export secrets during the CI/CD Docker `build` stage.
- **Security:** Since `VITE_` variables are executed client-side, they are inherently public. However, strict server-side variables (such as Let's Encrypt emails, Docker configuration details, database passwords) belong exclusively on the VPS inside the `docker-compose.yml` environment block or a local `.env` file on the server. They must never enter version control.
