// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}

async function isUsernameTaken(username) {
    const db = getFirestore();
    const usersCollection = collection(db, 'users'); 
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    signUp.disabled = true;
    const password = document.getElementById('rPassword').value;
    const username = document.getElementById('fName').value;
    const email = `${username}@example.com`;

    const auth = getAuth();

    const usernameExists = await isUsernameTaken(username);
    if (usernameExists) {
        showMessage('Bu kullanıcı adı alınmış.', 'signUpMessage');
        signUp.disabled = false;
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            username: username,
            bilgiyarismasi: 1,
            klavyeyarisi: 1,
            coin: 0
        };
        showMessage('Hesabınız oluşturuldu.', 'signUpMessage');
        const docRef = doc(getFirestore(), "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Bir hata oldu: ", error);
            signUp.disabled = false;
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
            showMessage('Bu e-posta zaten kayıtlı.', 'signUpMessage');
        } else {
            showMessage('Kaydolurken bir hata oluştu.', 'signUpMessage');
        }
        signUp.disabled = false
    });
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('rEmail').value;
    const email = `${username}@example.com`;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Giriş yapıldı.', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Hatalı e-posta veya şifre.', 'signInMessage');
        } else {
            showMessage('Hesap bulunamadı.', 'signInMessage');
        }
    });
});
