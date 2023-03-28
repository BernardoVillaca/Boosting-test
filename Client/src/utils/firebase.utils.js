import { initializeApp } from 'firebase/app'
import {
  getAuth,
  getIdToken,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { containsOnlyNumbers } from '../helpers/containOnlyNumbers';

const firebaseConfig = {
  apiKey: "AIzaSyCi5HnZq79RANca_Hw5-pFyZRlH5sred9Y",
  authDomain: "noname-c54d3.firebaseapp.com",
  projectId: "noname-c54d3",
  storageBucket: "noname-c54d3.appspot.com",
  messagingSenderId: "877726298582",
  appId: "1:877726298582:web:da3caba99df4451a89f477",
  measurementId: "G-YH684VBB8Q"
};

initializeApp(firebaseConfig);

const Googleprovider = new GoogleAuthProvider();

export const auth = getAuth();

export const db = getFirestore();

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const sendUserVerificationEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser)

  } catch (error) {
    console.log(error.message)
  }
}

export const sendUserPasswordResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: 'email has been sent' }

  } catch (error) {
    if (error.message === 'Firebase: Error (auth/invalid-email).') return { emailError: 'invalid email' }
    if (error.message === 'Firebase: Error (auth/missing-email).') return { emailError: 'email required' }
    return { emailError: error.message }
  }
}

export const reauthenticateUser = async () => {
  const user = auth.currentUser
  user.reload()
}

export const getUserIdToken = async () => {
  const user = auth.currentUser
  if (!user) return
  const token = await getIdToken(user);
  return token
}

export const signInWithGooglePoppup = async () => {
  try {
    const { user } = await signInWithPopup(auth, Googleprovider);
    return { success: user }
  } catch (error) {
    console.log(error.message)
  }
}

export const createUserhWithEmailAndPassword = async (formFields) => {
  const { displayName, email, password, confirmPassword, discord } = formFields;
  let missingFields = {}
  if (!displayName) { missingFields = { ...missingFields, nameError: 'name required!' } }
  if (!discord) { missingFields = { ...missingFields, discordError: 'discord required!' } }
  if (!email) { missingFields = { ...missingFields, emailError: 'email required!' } }
  if (!password) { missingFields = { ...missingFields, passwordError: 'password required!' } }
  if (!confirmPassword) { missingFields = { ...missingFields, confirmPasswordError: 'password confirmation required!' } }
  if ((Object.keys(missingFields)).length !== 0) return missingFields
  if (discord.includes('#') === false) return { discordError: 'Invalid Discord tag' }
  if (containsOnlyNumbers(discord.split('#')[1]) === false) return { discordError: 'only numbers allowed after the #' }
  if (password !== confirmPassword) return { confirmPasswordError: `passwords don't match` }

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return { success: user }
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/email-already-in-use).') return { emailError: 'email already in use' }
    if (error.message === 'Firebase: Error (auth/invalid-email).') return { emailError: 'invalid email' }
    if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') return { passwordError: 'password should be at least 6 characters' }
    return { error: error.message }
  }
};

export const signInUserhWithEmailAndPassword = async (email, password) => {
  let missingFields = {}
  if (!email) { missingFields = { ...missingFields, emailError: 'email required!' } }
  if (!password) {
    missingFields = { ...missingFields, passwordError: 'password required!' }
    return missingFields
  }
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { success: 'User successfully logged in' }
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/user-not-found).') return { emailError: 'user not found!' }
    if (error.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') return { emailError: 'too many login attempts. Try again later!' }
    if (error.message === 'Firebase: Error (auth/wrong-password).') return { passwordError: 'wrong password!' }
    return { error: error.message }
  }
};

export const confirmOldPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { success: 'Corrent Password' }
  } catch (error) {
    return { error: error.message }
  }
};

export const updateUserName = async (newName) => {
  try {
    if (newName === '') return { error: 'Name field can not be empty' }
    if (newName.length < 4) return { error: 'Name needs to have at least 4 characters' }
    await updateProfile(auth.currentUser, {
      displayName: newName
    })
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, {
      displayName: newName
    });
    return { success: "Name has been updated" }
  } catch (error) {
    return { error: error.message }
  }
}

export const updateUserPassword = async (email, oldPassword, newPassword, confirmPassword) => {
  if (!email || !oldPassword || !newPassword) return;
  try {
    if (newPassword !== confirmPassword) return { error: 'Passwords dont match' }
    await signInWithEmailAndPassword(auth, email, oldPassword)
    await updatePassword(auth.currentUser, newPassword)
    return { success: 'Password has been changed' }
  } catch (error) {
    return { error: error.message }
  }
}
export const updateUserDiscord = async (newDiscord) => {
  try {
    if (newDiscord === '') return { error: 'Discord field can not be empty' }
    if (newDiscord.includes('#') === false) return { error: 'Invalid Discord tag' }
    if (containsOnlyNumbers(newDiscord.split('#')[1]) === false) return { error: 'Only numbers allowed after the #' }
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, {
      discord: newDiscord
    });
    return { success: "Discord has been updated" }
  } catch (error) {
    return { error: error.message }
  }
}

export const updateUserEmail = async (newEmail) => {
  try {
    if (newEmail === '') return { error: 'Email field can not be empty' }
    await updateEmail(auth.currentUser, newEmail)
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userDocRef, {
      email: newEmail
    });
    return { success: "Email has been updated" }
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/invalid-email).') return { error: 'Invalid email' }
    if (error.message === 'Firebase: Error (auth/requires-recent-login).') return { error: 'Please sign out and sign in again to change the email' }
    if (error.message === 'Firebase: Error (auth/email-already-in-use).') return { error: 'Email already in use' }
    return { error: error.message }
  }
}


export const getCollectionDocuments = async (collectionName) => {
  const serviceRef = collection(db, `${collectionName}`)
  const services = []

  const serviceSnapShot = await getDocs(serviceRef)

  serviceSnapShot.docs.forEach((service) => {
    services.push({ ...service.data(), id: service.id })
  });

  return services;
};

export const getDocumentsOrderedByField = async ({ collectionName, fieldName, descendant }) => {
  const colectionRef = collection(db, collectionName)
  const q = descendant ? query(colectionRef, orderBy(fieldName, 'desc')) : query(colectionRef, orderBy(fieldName))
  const documents = []
  const documentSnapShot = await getDocs(q)

  documentSnapShot.docs.forEach((document) => {
    documents.push({ ...document.data() })
  });
  return documents;
};

export const getSubCollectionOrderedByfield = async ({ collectionName, id, subCollectionName, fieldName, descendant }) => {
  const subColRef = collection(db, collectionName, id, subCollectionName);
  const q = descendant ? query(subColRef, orderBy(fieldName, 'desc')) : query(subColRef, orderBy(fieldName))
  const items = []
  const serviceSnapShot = await getDocs(q)

  serviceSnapShot.docs.forEach((item) => {
    items.push({ ...item.data() })
  });
  return items
}

export const getUserByEmail = async (email) => {
  try {
    const documentRef = collection(db, 'users')
    const q = query(documentRef, where('email', '==', email))
    const documents = []
    const documentSnapShot = await getDocs(q)
    documentSnapShot.docs.forEach((document) => {
      documents.push({ ...document.data(), id: document.id })
    });
    if(!documents[0]) return {error: 'user not found'}
    return {success: documents[0]};
  } catch (error) {
    return {error: error.message}
  }
}

export const getDocumentsByField = async (collectionName, fieldName, fieldValue) => {
  const documentRef = collection(db, `${collectionName}`)
  const q = query(documentRef, where(fieldName, '==', fieldValue))
  const documents = []
  const documentSnapShot = await getDocs(q)

  documentSnapShot.docs.forEach((document) => {
    documents.push({ ...document.data(), id: document.id })
  });
  return documents;
};

export const getDocumentById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnapshot = await getDoc(docRef)
    const document = docSnapshot.data()
    if (document === undefined) return { error: 'document not found' }
    return { success: { ...document, id: docSnapshot.id } }
  } catch (error) {
    return { error: error.message }
  }
};

export const getDocumentSubCollection = async (collectionName, id, subCollection) => {
  try {
    const collectionRef = collection(db, collectionName, id, subCollection)
    const collectionSnapshot = await getDocs(collectionRef)
    const items = []
    collectionSnapshot.docs.forEach((item) => {
      items.push({ ...item.data() })
    });
    return { success: items }
  } catch (error) {
    return { error: error.message }

  }
}

export const getUserByUid = async (uid) => {
  const documentRef = doc(db, 'users', uid)
  const documentSnapShot = await getDoc(documentRef)
  return documentSnapShot.data();
}



