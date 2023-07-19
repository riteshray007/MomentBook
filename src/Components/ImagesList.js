import React, { useRef, useState, useEffect } from 'react';
import Imageform from './Imageform';
import { db } from '../firebaseinit';
import { updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';

export default function ImagesList({ albumid, setimagecheck }) {

      const [searchbar, setsearchbar] = useState(false)
      const [imageformcheck, setimageformcheck] = useState(false);
      const searchref = useRef();
      const [imagelist, setimagelist] = useState([])


      useEffect(() => {
            onSnapshot(doc(db, "albums", albumid), (doc) => {
                  console.log(doc.data().album);
                  setimagelist(doc.data().album);
            });
      }, [])

      async function addimage(name, url) {
            if (name && url) {
                  let templist;
                  if (imagelist) {
                        templist = [{ name, url }, ...imagelist];
                  }
                  else {
                        templist = [{ name, url }];
                  }
                  // console.log(templist);
                  const albumRef = doc(db, "albums", albumid);
                  await updateDoc(albumRef, {
                        album: templist
                  });
            }

      }



      return (
            <div className='imagelistmain' >

                  {imageformcheck ? <Imageform addimage={addimage} /> : null}

                  <div className='imagelistheading'>

                        <img src='https://cdn-icons-png.flaticon.com/128/4155/4155120.png' className='backbutton'
                              onClick={() => setimagecheck(false)} alt='one step back button ' />
                        <h2>Images in {albumid}</h2>
                        {
                              searchbar ? <input placeholder=' search... ' className='searchbar' ref={searchref} /> : null
                        }
                        {
                              searchbar ?
                                    <img src='https://cdn-icons-png.flaticon.com/128/391/391247.png' alt='canelbutton'
                                          className='searchbutton' onClick={() => setsearchbar(false)}
                                    /> :
                                    <img src='https://cdn-icons-png.flaticon.com/128/1296/1296902.png' className='searchbutton'
                                          alt='searchbutton' onClick={() => setsearchbar(true)} />
                        }

                        {
                              imageformcheck ?
                                    <button className='cancelimagebutton'
                                          onClick={() => setimageformcheck(false)}
                                    > cancel </button> :
                                    <button className='addimagebutton'
                                          onClick={() => setimageformcheck(true)}
                                    > Add Image </button>
                        }
                  </div>

                  <ul className='albumlist' >
                        {
                              imagelist ?
                                    imagelist.map((alb) => {
                                          return (
                                                <>
                                                      <li className='imageitem' o >
                                                            <div className='imagedisplay' style={{ backgroundImage: `url('${alb.url}')` }} >
                                                            </div>
                                                            <h3 className='imagetitle' > {alb.name} </h3>
                                                      </li>
                                                </>
                                          )
                                    }) :
                                    <h2> no images found in {albumid} </h2>
                        }


                  </ul>
            </div>
      )
}
