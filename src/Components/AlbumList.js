import React, { useState, useEffect } from 'react';
import AlbumForm from './AlbumForm';
import { db  } from '../firebaseinit';
import { query  , collection , onSnapshot , setDoc , doc  ,limit , orderBy } from 'firebase/firestore';

export default function AlbumList({setimagecheck , setimagelistid }) {

      const [albumform, setalbumform] = useState(false);
      const [albumlist, setalbumlist] = useState([])

      function fetchalldata() {
            const q =  query(collection(db , 'albums' ), orderBy("createdOn", "desc"));
            onSnapshot(q, (querySnapshot) => {
                  const albums = [];
                  querySnapshot.forEach((doc) => {
                        albums.push({...doc.data()});
                  });
                  setalbumlist(albums);
            });
            // const qa = query(collection(db , 'albums' ), orderBy("id", "desc"));
            // console.log("qa - " , qa);
      }

      useEffect(() => {
            fetchalldata()
      }, [])

      async function addalbums(id){
            await setDoc(doc(db, "albums", id), {id , createdOn : Date.now() });
      }

      function albumclicklistener(id){
            setimagelistid(id);
            setimagecheck(true);
      }


      return (
            <>
                  {albumform ? <AlbumForm  addalbums={addalbums} /> : null}


                  <div className='albumlistmain' >
                        <div className='listbuttons' >
                              <h2>Your albums </h2>
                              {albumform ? <button onClick={() => setalbumform(false)} className='cancelbutton' > cancel </button>
                                    : <button className='addalbum' onClick={() => setalbumform(true)} > Add album </button>}
                        </div>
                        <ul className='albumlist' >
                              {
                                    albumlist.map((alb) => {
                                          return (
                                                <>
                                                      <li className='albums' onClick={()=>albumclicklistener(alb.id)} >
                                                            <div>
                                                                  <img src='https://cdn-icons-png.flaticon.com/128/3342/3342207.png' className='albumicon' />
                                                            </div>
                                                            <h3 className='albumtitle' > {alb.id} </h3>
                                                      </li>
                                                </>
                                          )
                                    })
                              }


                        </ul>
                  </div>
            </>
      )
}
