  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyASJup3TB7V1ohy2ItuOXUgKcpGJK5-Szc",
    authDomain: "skinder-e73d3.firebaseapp.com",
    projectId: "skinder-e73d3",
    storageBucket: "skinder-e73d3.firebasestorage.app",
    messagingSenderId: "519727878012",
    appId: "1:519727878012:web:2f88b40e5772991394def9",
    measurementId: "G-2RD6LR8M7G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  firebase.initializeApp(firebaseConfig);