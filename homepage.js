// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwGjXpliOsOlmZGiXNNP17RHKzBvYJC2U",
    authDomain: "mert-409.firebaseapp.com",
    projectId: "mert-409",
    storageBucket: "mert-409.appspot.com",
    messagingSenderId: "813586117280",
    appId: "1:813586117280:web:3ee3eeecfc5d0db3b94fc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    localStorage.setItem('loggedInUserId', user.uid);
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.username;
                    document.getElementById('loggedUserCoin').innerText = userData.coin
                }
                else {
                    console.log("Bu ID'ye sahip bir hesap yok.")
                }
            })
            .catch((error) => {
                console.log("Bizden kaynaklanan bir hata oldu.");
            })
    }
    else {
        console.log("Yerel depolamada bir hesap ID'si yok.")
    }
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Çıkış yaparken bir hata oldu: ', error);
        })
})
