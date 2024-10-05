#!/bin/sh
# Memuat variabel dari file .env ke dalam environment
set -a # Menyalakan mode ekspor otomatis
. .env # Mengambil variabel dari file .env
set +a # Menonaktifkan mode ekspor otomatis
