import React, { useRef, useState, useEffect } from 'react';
import Imageform from './Imageform';
import Imageviewer from './Imageviewer';

import { ThreeDots } from 'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from '../firebaseinit';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

const Defaultsrc = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

export default function ImagesList({ albumid, setimagecheck }) {


      // the reason i have not used reducer hook because all the below states are simple id setting states or boolean states
      // imagelist is the only state which would have gone through crud operations , hence required reducer.
      // but using realtime updates database updates changes automatically to the local state, hence elimates the requirment of crud operation on local states .

      //helps focusing searchbar and getting its value 
      const searchref = useRef();
      //used to get the hovered images details and dynamically add classnames 
      const [hoveron, sethoveron] = useState(null);
      //used to switch loading component on and off 
      const [loader, setloader] = useState(true);
      // used to store data fetched from db 
      const [imagelist, setimagelist] = useState([]);
      // used to choose whether to add a new image or update the existing one
      const [editform, seteditform] = useState(false);
      //used to open and close searchbar
      const [searchbar, setsearchbar] = useState(false);
      //used to send data about a certain image to the imageform component
      const [formlistdata, setformlistdata] = useState({});
      //used to open and close image form component 
      const [imageformcheck, setimageformcheck] = useState(false);
      //used to open/close imageViewer component(Carousel component) 
      const [imageviewercheck, setimageviewer] = useState(false);
      //used to send image data to imageViewer component
      const [imageviewerdata, setimageviewerdata] = useState('');
      //used to store searchbar value
      const [charinsearchbar, setcharinsearchbar] = useState('');

      // this helps in featching all the images of a album when imagelist component is mounted
      useEffect(() => {
            setloader(true)
            getimagesfromdb();
      }, [])


      // this helps in focusing the searchbar input field when ever it is mounted
      useEffect(() => {
            if (searchbar) {
                  searchref.current.focus();
            }
      }, [searchbar])

      //it fetches all the images associated with the album
      function getimagesfromdb() {
            onSnapshot(doc(db, "albums", albumid), (doc) => {
                  // console.log(doc.data().album);
                  setimagelist(doc.data().album);
            });
      }

      // whenever a user adds or updates the images this function check for invalid image urls and switches it with a default src 
      useEffect(() => {
            let allimages = document.querySelectorAll('.realimage');
            console.log('imagelist is updataed');
            for (let image of allimages) {
                  image.addEventListener('error', function handleError() {
                        image.src = Defaultsrc;
                        console.log(image.src);
                  });
            }
            setloader(false);
      }, [imagelist])

      //sets the id of the image currently hovering on
      function sethoverid(id) {
            sethoveron(id);
      }


      //helps adding images into db 
      function addimage(name, url, index) {
            //this condition checks whether name and url are not empty else give a notification to fill them
            if (name && url) {
                  setloader(true)
                  let templist;
                  //this condition choose whether to add a new image or to update the existing one
                  if (editform) {
                        templist = [...imagelist]
                        templist[index].name = name;
                        templist[index].url = url;

                        toast.success('Images updated succesfully👌', {
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
                        //spreading a empty array could throw error so this condition checks whether the array is not empty
                        if (imagelist) {
                              templist = [{ name, url, id: Date.now() }, ...imagelist];
                        }
                        else {
                              templist = [{ name, url, id: Date.now() }];
                        }
                        //toast notification emitter
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

      //switches imageViewer on/off and send all the required data to imageviewer
      function setviewerdata(index) {
            setimageviewer(true);
            setimageviewerdata({ url: imagelist[index].url, index });
      }

      //switches form component on and off 
      function imageformchecker() {
            setimageformcheck(true);
            seteditform(false);
      }

      function handleedit(e, id, index) {
            
            //as the parent component also have click events propagation can trigger its parents click events too 
            // hence stoppropagation stop the events listener to tigger further events
            e.stopPropagation();
            setimageformcheck(true);
            seteditform(true);
            setformlistdata({ id, index, name: imagelist[index].name, url: imagelist[index].url })
            // opens image form and add the required data into the inputs 
      }

      async function handleupdate(arr) {

            //this updates the album array in db
            const albumRef = doc(db, "albums", albumid);
            await updateDoc(albumRef, {
                  album: arr
            });
            setloader(false);
            //and switches the loader off
      }

      // deletes single images from imagelist 
      function handledelete(e, id) {
            setloader(true);
            e.stopPropagation();
            let templist = imagelist.filter((img) => img.id !== id)
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
            seteditform(false);
            setformlistdata({});
            setimageformcheck(false);
      }

      //clear value of searchbar and unmounts it 
      function closesearchbar() {
            setcharinsearchbar('');
            setsearchbar(false);
      }

      //this helps increment the index of the imagelist array by 1, so the next image will get renderend in the carousel
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

      //this decrements the image carousel index by 1
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

                  {/* react-toastify notifications component */}
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

                  {/* loader component (loading wheel) */}
                  {loader? <ThreeDots
                        className="threedots"
                        height="100"
                        width="90"
                        radius="10"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                  />: null }

                  {/* imageform */}
                  {imageformcheck ? <Imageform addimage={addimage} editform={editform} seteditform={seteditform} formlistdata={formlistdata} /> : null}

                        {/* image carousel comnponent */}
                  {imageviewercheck ? <Imageviewer imageurl={imageviewerdata} setimageviewer={setimageviewer} nextImageinIL={nextImageinIL} previousimageinIL={previousimageinIL} /> : null}

                  <div className='imagelistheading'>

                        <img src='https://cdn-icons-png.flaticon.com/128/4155/4155120.png' className='backbutton'
                              onClick={() => setimagecheck(false)} alt='one step back button ' />
                        <h2>Images in {albumid}</h2>
                        {
                              searchbar ? <input placeholder=' search... ' className='searchbar' ref={searchref} onChange={(e) => setcharinsearchbar(e.target.value)} /> : null
                        }

                        {
                              searchbar ?
                                    <img src='https://cdn-icons-png.flaticon.com/128/391/391247.png' alt='canelbutton'
                                          className='searchbutton' onClick={closesearchbar}
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
                              // a empty array is a truthy value so checking its length is also neccessary before mapping
                              imagelist && imagelist.length > 0 ?
                                    imagelist.map((alb, i) => {
                                          if (alb.name.includes(charinsearchbar)) {

                                                return (

                                                      <li key={alb.id} className={` imageitem  ${hoveron == alb.id ? 'hoveredimageitem' : ''}   `}
                                                            onMouseEnter={() => sethoverid(alb.id)}
                                                            onMouseLeave={() => sethoveron('')}
                                                            onClick={() => setviewerdata(i)}
                                                      >
                                                            <img src='https://cdn-icons-png.flaticon.com/128/4203/4203813.png' alt='editicon' className='editicon' onClick={(e) => handleedit(e, alb.id, i)} />
                                                            <img src='https://cdn-icons-png.flaticon.com/128/6711/6711573.png' alt='deleteicon' className='deleteicon' onClick={(e) => handledelete(e, alb.id, i)} />
                                                            <div className='imagedisplay'  >
                                                                  <img className='realimage' src={alb.url} />
                                                            </div>
                                                            <h3 className='imagetitle' > {alb.name} </h3>
                                                      </li>

                                                )
                                          }
                                    }) :
                                    <h2> no images found in {albumid} </h2>
                        }


                  </ul>
            </div>
      )
}
