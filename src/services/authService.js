import{signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile}from'firebase/auth';import{doc,setDoc,getDoc,serverTimestamp}from'firebase/firestore';import{auth,db}from'../firebase/config';
export async function register({name,email,password,role='owner'}){const res=await createUserWithEmailAndPassword(auth,email,password);await updateProfile(res.user,{displayName:name});await setDoc(doc(db,'users',res.user.uid),{name,email,role,createdAt:serverTimestamp()});return res.user}
export const login=(email,password)=>signInWithEmailAndPassword(auth,email,password);
export const logout=()=>signOut(auth);
export async function getUserRole(uid){const snap=await getDoc(doc(db,'users',uid));return snap.exists()?snap.data():{role:'owner'}}
