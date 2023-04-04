import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDpOebl5-feEAYQYUSR8dNZTzBVsRrrr-w",
  authDomain: "vanlife-d7099.firebaseapp.com",
  projectId: "vanlife-d7099",
  storageBucket: "vanlife-d7099.appspot.com",
  messagingSenderId: "520637820153",
  appId: "1:520637820153:web:68f84dce80ad2254a20628"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

//examples of how to get data from firebase below
//right now, I'm keeping this all on our mirage server
//I would need to build these collections on firebase

// export async function getVans() {
//     const querySnapshot = await getDocs(vansCollectionRef)
//     const dataArr = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     console.log(dataArr)
//     return dataArr
// }

// export async function getVan(id) {
//     const docRef = doc(db, "vans", id)
//     const vanSnapshot = getDoc(docRef)
//     return {
//         ...vanSnapshot.data(),
//         id: vanSnapshot.id
//     }
// }


export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans"
  const res = await fetch(url)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.vans
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
  const res = await fetch(url)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.vans
}

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}
