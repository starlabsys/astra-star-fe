# Tahap 1: Pembangunan (Build)
FROM node:22.7.0 as builder

WORKDIR /app

# Menyalin file package.json dan yarn.lock
COPY package.json yarn.lock ./

# Menginstal dependensi
RUN npm i -g yarn && yarn install --frozen-lockfile

# Menyalin seluruh sumber kode aplikasi Next.js ke dalam container
COPY . .

# Membangun aplikasi Next.js
RUN yarn build

# Tahap 2: Produksi
FROM node:22.7.0 as runner

WORKDIR /app

# Menyalin built artifacts dari tahap builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Membuka port yang akan digunakan aplikasi Next.js
EXPOSE 3003

# Menjalankan aplikasi Next.js di mode produksi
CMD ["yarn", "start"]
