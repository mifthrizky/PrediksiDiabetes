# --- TAHAP 1: BUILD ---
# Ambil base image Node.js untuk proses build
FROM node:18-alpine AS build

# Set folder kerja
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy sisa file frontend dan jalankan build
COPY . .
RUN npm run build

# --- TAHAP 2: SERVE ---
# Ambil base image Nginx yang ringan
FROM nginx:1.25-alpine

# Copy hasil build dari tahap 'build' ke folder web Nginx
# (Vite build output ada di folder 'dist')
# BENAR
COPY --from=build /app/dist /usr/share/nginx/html

# Hapus config default nginx
# RUN rm /etc/nginx/conf.d/default.conf

# (Opsional tapi disarankan) Copy file konfigurasi Nginx kustom
# COPY nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Perintah untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]