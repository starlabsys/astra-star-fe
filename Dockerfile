# Tahap 1: Pembangunan (Build)
FROM node:18.17.1 as builder

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin file `package.json` dan `package-lock.json` (jika ada)
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin sumber kode aplikasi Next.js ke dalam container
COPY . .

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

# Menentukan variabel lingkungan untuk mode produksi
ENV NODE_ENV production

# Membuka port yang akan digunakan aplikasi Next.js (3000 default)
EXPOSE 8086

# Menjalankan aplikasi Next.js di mode produksi
CMD ["npm", "start"]
