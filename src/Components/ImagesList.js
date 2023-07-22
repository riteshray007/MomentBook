import React, { useRef, useState, useEffect } from 'react';
import Imageform from './Imageform';
import Imageviewer from './Imageviewer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from '../firebaseinit';
import { updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';

const Defaultsrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYMIg4H1MKoEBPkF1kWQ7ENkm2gXsgF8bsg&usqp=CAU';

export default function ImagesList({ albumid, setimagecheck }) {

      const [searchbar, setsearchbar] = useState(false)
      const [imageformcheck, setimageformcheck] = useState(false);
      const searchref = useRef();
      const [imagelist, setimagelist] = useState([])
      const [hoveron, sethoveron] = useState(null);
      const [editform, seteditform] = useState(false);
      const [formlistdata, setformlistdata] = useState({})
      const [imageviewercheck, setimageviewer] = useState(false);
      const [imageviewerdata, setimageviewerdata] = useState('');

      useEffect(() => {
            onSnapshot(doc(db, "albums", albumid), (doc) => {
                  // console.log(doc.data().album);
                  setimagelist(doc.data().album);
            });
      }, [])

      useEffect(() => {
            let allimages = document.querySelectorAll('img');
            for (let image of allimages) {
                  image.addEventListener('error', function handleError() {
                        image.src = Defaultsrc;
                        console.log(image.src);
                  });
            }
      }, [imagelist])

      function sethoverid(id) {
            sethoveron(id);
      }


      function addimage(name, url, index) {
            if (name && url) {
                  let templist;
                  if (editform) {
                        templist = [...imagelist]
                        templist[index].name = name;
                        templist[index].url = url;

                        toast.success('Images updated succesfully👌👌', {
                              position: "top-right",
                              autoClose: 4000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });

                        setformlistdata({})
                        seteditform(false);

                  }
                  else {
                        if (imagelist) {
                              templist = [{ name, url, id: Date.now() }, ...imagelist];
                        }
                        else {
                              templist = [{ name, url, id: Date.now() }];
                        }
                        toast.success('Image added successfully! ', {
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
                  handleupdate(templist);


            }
      }

      function setviewerdata(index) {
            setimageviewer(true);
            setimageviewerdata({ url: imagelist[index].url, index });
      }

      function imageformchecker() {
            setimageformcheck(true);
            seteditform(false);
      }

      function handleedit(e, id, index) {
            e.stopPropagation();
            setimageformcheck(true);
            seteditform(true);
            setformlistdata({ id, index, name: imagelist[index].name, url: imagelist[index].url })
      }

      async function handleupdate(arr) {
            const albumRef = doc(db, "albums", albumid);
            await updateDoc(albumRef, {
                  album: arr
            });

      }

      function handledelete(e, id) {
            e.stopPropagation();
            let templist = imagelist.filter((img) => img.id !== id)
            // console.log(templist)
            handleupdate(templist);
            toast.error(' Image deleted succesfully👋👋 ', {
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

      function nextImageinIL(index) {
            if (index >= imagelist.length - 1) {
                  index = 0;
                  setimageviewerdata({ url: imagelist[index].url, index });
            }
            else {
                  index++;
                  setimageviewerdata({ url: imagelist[index].url, index });
            }
      }

      function previousimageinIL(index) {
            if (index <= 0) {
                  index = imagelist.length - 1;
                  setimageviewerdata({ url: imagelist[index].url, index });
            } else {
                  index--;
                  setimageviewerdata({ url: imagelist[index].url, index });
            }
      }



      return (
            <div className='imagelistmain' >
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



                  {imageformcheck ? <Imageform addimage={addimage} editform={editform} seteditform={seteditform} formlistdata={formlistdata} /> : null}

                  {imageviewercheck ? <Imageviewer imageurl={imageviewerdata} setimageviewer={setimageviewer} nextImageinIL={nextImageinIL} previousimageinIL={previousimageinIL} /> : null}

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
                                          onClick={imageformchecker}
                                    > Add Image </button>
                        }
                  </div>

                  <ul className='albumlist' >
                        {
                              imagelist && imagelist.length > 0 ?
                                    imagelist.map((alb, i) => {
                                          return (

                                                <li key={alb.id} className={` imageitem  ${hoveron == alb.id ? 'hoveredimageitem' : ''}   `}
                                                      onMouseEnter={() => sethoverid(alb.id)}
                                                      onMouseLeave={() => sethoveron('')}
                                                      onClick={() => setviewerdata(i)}
                                                >
                                                      <img src='https://cdn-icons-png.flaticon.com/128/4203/4203813.png' alt='editicon' onClick={(e) => handleedit(e, alb.id, i)} />
                                                      <img src='https://cdn-icons-png.flaticon.com/128/6711/6711573.png' alt='deleteicon' onClick={(e) => handledelete(e, alb.id, i)} />
                                                      <div className='imagedisplay' style={{ backgroundImage: `url('${alb.url}')` }} ></div>
                                                      <h3 className='imagetitle' > {alb.name} </h3>
                                                </li>

                                          )
                                    }) :
                                    <h2> no images found in {albumid} </h2>
                        }


                  </ul>
            </div>
      )
}
