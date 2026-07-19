import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuaFGwNjJtV0mcXZ7Tw734R0Q4HzChs1k",
  authDomain: "dockyard-le-bistro.firebaseapp.com",
  databaseURL: "https://dockyard-le-bistro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dockyard-le-bistro",
  storageBucket: "dockyard-le-bistro.firebasestorage.app",
  messagingSenderId: "991617661975",
  appId: "1:991617661975:web:9d69822a65b19fe31a3052"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save Order Function
window.saveOrder = async function(orderData) {
  try {
    
    await push(ref(db, "orders"), orderData);
alert("Push chal gaya");
alert("DATA FIREBASE ME SAVE HO GYA");

console.log("Order Saved Successfully");
    
    window.saveOrder = async function(orderData) {
  try {
    await push(ref(db, "orders"), orderData);
    console.log("Order Saved Successfully");
    alert("Firebase me save ho gaya");
    alert(typeof saveOrder);
  } catch (error) {
    console.error("Firebase Error:", error);
  }
};
  } catch (error) {
    console.error("Firebase Error:", error);
  }
};
console.log("Firebase Loaded");
