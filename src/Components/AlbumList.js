import React, { useState, useEffect } from 'react';
import AlbumForm from './AlbumForm';
import { db  } from '../firebaseinit';
import { query  , collection , onSnapshot } from 'firebase/firestore';

export default function AlbumList() {

      const [albumform, setalbumform] = useState(false);
      const [albumlist, setalbumlist] = useState([])

      function fetchalldata() {
            const q =  (collection(db, "albums"));
            const unsubscribe =  onSnapshot(q, (querySnapshot) => {
                  const albums = [];
                  querySnapshot.forEach((doc) => {
                        albums.push({...doc.data()});
                  });
                  // console.log("Current cities in CA: ", cities.join(", "));
                  // console.log(albums , albumform);
                  setalbumlist(albums);
            });

      }
      useEffect(() => {
            fetchalldata()
      }, [])

      async function addalbums(id){

      }

      return (
            <>
                  {albumform ? <AlbumForm /> : null}


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
                                                      <li className='albums' >
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
