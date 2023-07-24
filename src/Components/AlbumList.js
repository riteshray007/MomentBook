import React, { useState, useEffect } from 'react';
import AlbumForm from './AlbumForm';

import { db } from '../firebaseinit';
import { query, collection, onSnapshot, setDoc, doc, orderBy, getDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AlbumList({ setimagecheck, setimagelistid }) {

      //handles albumform mount/unmount 
      const [albumform, setalbumform] = useState(false);
      //locally stores albums from db
      const [albumlist, setalbumlist] = useState([])

      //fetch all albums from db
      function fetchalldata() {
            // orderby helps in sorting documents according to the fields passed , which in my case is createdOn
            // and the order is descending
            const q = query(collection(db, 'albums'), orderBy("createdOn", "desc"));
            onSnapshot(q, (querySnapshot) => {
                  const albums = [];
                  querySnapshot.forEach((doc) => {
                        albums.push({ ...doc.data() });
                  });
                  setalbumlist(albums);
            });
      }

      //calls fetchalldata after mounting
      useEffect(() => {
            fetchalldata()
      }, [])

      async function addalbums(id) {

            //setting empty string to documnet will throw error so its important to check its not empty
            if (id) {
                  const docRef = doc(db, "albums", id);
                  const docSnap = await getDoc(docRef);

                  //document can't have same ids so we return a notify that this name is already in use
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
                  //  if everthing is alright then create a new document(album) 
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

      // sets the id of the album which is clicked and mounts the imagelist component 
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
