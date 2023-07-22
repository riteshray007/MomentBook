import React, { useState, useEffect } from 'react';
import AlbumForm from './AlbumForm';
import { db } from '../firebaseinit';
import { query, collection, onSnapshot, setDoc, doc, limit, orderBy, getDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AlbumList({ setimagecheck, setimagelistid }) {

      const [albumform, setalbumform] = useState(false);
      const [albumlist, setalbumlist] = useState([])

      function fetchalldata() {
            const q = query(collection(db, 'albums'), orderBy("createdOn", "desc"));
            onSnapshot(q, (querySnapshot) => {
                  const albums = [];
                  querySnapshot.forEach((doc) => {
                        albums.push({ ...doc.data() });
                  });
                  setalbumlist(albums);
            });
            // const qa = query(collection(db , 'albums' ), orderBy("id", "desc"));
            // console.log("qa - " , qa);
      }

      useEffect(() => {
            fetchalldata()
      }, [])

      async function addalbums(id) {

            if (id) {

                  const docRef = doc(db, "albums", id);
                  const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                        toast.warn('Album already exists ☹️☹️ ', {
                              position: "top-right",
                              autoClose: 4000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        return
                  }

                  toast.success(' New album created 😊👍 ', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                  });

                  await setDoc(docRef, { id, createdOn: Date.now() });
            }else{
                  toast.warn('album name cant be empty ☹️', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                  });
            }




      }

      function albumclicklistener(id) {
            setimagelistid(id);
            setimagecheck(true);
      }


      return (
            <>
                  {albumform ? <AlbumForm addalbums={addalbums} /> : null}

                  <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="colored"
                  />

                  <div className='albumlistmain' >
                        <div className='listbuttons' >
                              <h2>Your albums </h2>
                              {albumform ? <button onClick={() => setalbumform(false)} className='cancelbutton' > cancel </button>
                                    : <button className='addalbum' onClick={() => setalbumform(true)} > Add album </button>}
                        </div>
                        <ul className='albumlist' >
                              {
                                    albumlist.map((alb, i) => {
                                          return (

                                                <li key={alb.createdOn} className='albums' onClick={() => albumclicklistener(alb.id)} >
                                                      <div>
                                                            <img src='https://cdn-icons-png.flaticon.com/128/3342/3342207.png' className='albumicon' />
                                                      </div>
                                                      <h3 className='albumtitle' > {alb.id} </h3>
                                                </li>

                                          )
                                    })
                              }


                        </ul>
                  </div>
            </>
      )
}
