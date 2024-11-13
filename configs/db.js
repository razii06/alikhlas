// server/configs/db.js
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // Pastikan dotenv di-load di sini

// Mengambil variabel dari .env
const dbURI = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE;

// Membuat MongoClient untuk menghubungkan ke database
const client = new MongoClient(dbURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const connectToDB = async () => {
    try {
        await client.connect();  // Menghubungkan ke MongoDB
        await client.db().command({ ping: 1 });  // Mengecek apakah koneksi berhasil
        console.log("Koneksi ke database berhasil");
    } catch (error) {
        console.error("Koneksi ke database gagal", error);
    }
};

connectToDB(); // Menjalankan koneksi ke DB

export const db = client.db(databaseName); // Mengekspor database untuk digunakan di file lain