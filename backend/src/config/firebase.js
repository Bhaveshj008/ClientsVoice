const admin = require('firebase-admin');
require('dotenv').config();
// Read and decode the Firebase credentials from the environment variable
const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK_BASE64;
console.log("FIREBASE_ADMIN_SDK_BASE64:", process.env.FIREBASE_ADMIN_SDK_BASE64 ? "Loaded ✅" : "Missing ❌");

if (!serviceAccountBase64) {
    throw new Error("Missing FIREBASE_ADMIN_SDK_BASE64 in environment variables.");
}

const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf-8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
