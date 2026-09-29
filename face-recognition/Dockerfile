# Menggunakan base image Python resmi yang bersih
FROM python:3.10-slim

# Menentukan direktori kerja
WORKDIR /app

# Menyalin daftar kebutuhan pustaka
COPY requirements.txt .

# Menginstal pustaka Python secara langsung tanpa lewat apt-get
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode program ke dalam container
COPY . .

# Membuka port layanan
EXPOSE 8000

# Menjalankan server Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]