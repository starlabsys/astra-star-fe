# Tahap 1: Pembangunan (Build)
FROM node:18.17.1 as builder

WORKDIR /app

# Menyalin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin seluruh sumber kode aplikasi Next.js ke dalam container
COPY . .

# Menyalin skrip load-env.sh
COPY load-env.sh ./

# Menjalankan skrip untuk memuat variabel lingkungan
RUN chmod +x load-env.sh && ./load-env.sh

# Membangun aplikasi Next.js
RUN npm run build

# Tahap 2: Produksi
FROM node:18.17.1 as runner

WORKDIR /app

# Menyalin built artifacts dari tahap builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Membuka port yang akan digunakan aplikasi Next.js
EXPOSE 8086

# Menjalankan aplikasi Next.js di mode produksi
CMD ["npm", "start"]
