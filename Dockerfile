# Gunakan image ringan Node.js Alpine
FROM node:20-alpine

# Set direktori kerja
WORKDIR /app

# Install dependencies (dan bersihkan cache untuk alpine)
COPY package*.json ./
RUN npm install --frozen-lockfile

# Salin semua file ke dalam container
COPY . .

# Buka port 3000
EXPOSE 3000

# Jalankan server Express
CMD ["node","index.js"]
