# Ambil base image Node.js
FROM node:20-alpine

# Set folder kerja
WORKDIR /app

# Copy package.json dan install dependencies
# Ini dipisah agar layer 'node_modules' di-cache
COPY package.json package-lock.json ./
RUN npm install

# Copy sisa file source code Anda
# Ini akan ditimpa oleh 'volume' saat dijalankan
COPY . .

# --- PENTING UNTUK DEV SERVER ---
# Banyak dev server (seperti Vite) default ke port 5173
# Ganti port ini jika aplikasi Anda menggunakan port lain (misal 3000)
EXPOSE 5173

# Perintah untuk menjalankan server dev
# Flag '--host' penting agar server bisa diakses dari luar container
CMD ["npm", "run", "dev", "--", "--host"]