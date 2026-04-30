import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

    const firebaseConfig = {
    apiKey: "AIzaSyB3jnaQoa62Zh_JxVtmmVoBgp0CxVp54gg",
    authDomain: "cs571-s26-p76.firebaseapp.com",
    projectId: "cs571-s26-p76",
    storageBucket: "cs571-s26-p76.firebasestorage.app",
    messagingSenderId: "911352098692",
    appId: "1:911352098692:web:88ff952b3ba069e76937d1"
    };

    const app = initializeApp(firebaseConfig);
    export const gameDatabase = getFirestore(app);