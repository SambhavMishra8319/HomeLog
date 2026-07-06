import{collection,addDoc,getDocs,updateDoc,deleteDoc,doc,onSnapshot,query,orderBy,serverTimestamp,writeBatch}from'firebase/firestore';import{db}from'../firebase/config';
export const collections=['properties','rooms','tenants','payments','expenses'];
export async function addRecord(name,data){return addDoc(collection(db,name),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()})}
export async function updateRecord(name,id,data){return updateDoc(doc(db,name,id),{...data,updatedAt:serverTimestamp()})}
export async function deleteRecord(name,id){return deleteDoc(doc(db,name,id))}
export function subscribeCollection(name,cb){return onSnapshot(query(collection(db,name),orderBy('createdAt','desc')),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),e=>console.error(name,e))}
export async function getAll(name){const s=await getDocs(collection(db,name));return s.docs.map(d=>({id:d.id,...d.data()}))}
export async function seedIfEmpty(seed){for(const name of collections){const current=await getDocs(collection(db,name));if(current.empty){const batch=writeBatch(db);seed[name].forEach(item=>batch.set(doc(collection(db,name)),{...item,createdAt:serverTimestamp(),updatedAt:serverTimestamp()}));await batch.commit();}}}
