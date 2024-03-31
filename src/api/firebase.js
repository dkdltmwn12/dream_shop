import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged   } from "firebase/auth";
import {getDatabase, ref, get, set, remove,} from 'firebase/database';
import {v4 as uuidv4} from 'uuid'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
   signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
    signOut(auth).catch(console.error);
 }

export function onUserStateChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await inspectAdmin(user) : null;
        callback(updatedUser);
    });
}

async function inspectAdmin(user) {
    return get(ref(database, 'admin'))
    .then((snapshot) => {
        if(snapshot.exists()) {
            const admin = snapshot.val();
            const isAdmin = admin.includes(user.uid)
            return {...user, isAdmin}
        }
        return user
    })
}

export async function uploadProduct(product, url) {
    const id = uuidv4()
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image: url,
        options: product.options.split(','),
    });
}

export async function getProducts() {
    return get(ref(database, 'products'))
    .then(snapshot => {
        if(snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    })
}

export async function getCarts(userId) {
    return get(ref(database, `carts/${userId}`))
    .then(snapshot => {
        if(snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    })
}

export async function addCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function deleteCarts(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`))
}


