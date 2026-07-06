import{useEffect,useState}from'react';import{subscribeCollection}from'../services/firestoreService';
export function useCollection(name){const[items,setItems]=useState([]);const[loading,setLoading]=useState(true);useEffect(()=>{const unsub=subscribeCollection(name,d=>{setItems(d);setLoading(false)});return unsub},[name]);return{items,loading}}
