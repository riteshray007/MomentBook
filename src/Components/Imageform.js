import React, { useEffect, useRef, useState } from 'react'

export default function Imageform({ addimage, editform, formlistdata }) {

      // refs image and url input field 
      const imagename = useRef();
      const imageurl = useRef();

      //send input values to parent component imagelist
      function imageadder() {
            if (editform) {
                  addimage(imagename.current.value, imageurl.current.value, formlistdata.index);
            }
            else {
                  addimage(imagename.current.value, imageurl.current.value);
            }
            imagename.current.value = '';
            imageurl.current.value = '';
      }

      // focuses imagename input after mounting 
      useEffect(()=>{
            imagename.current.focus();
      },[])

      // set values of the image to be edited to the imageform component
      useEffect(() => {
            if (editform && formlistdata) {
                  imagename.current.value = formlistdata.name;
                  imageurl.current.value = formlistdata.url;
            }
      }, [editform, formlistdata])

      return (
            <div className='imageformmain' >
                  <h1 className='albumformheading' > { editform? ' Update image ' :  'Add image'}  </h1>
                  <div className='imageinputNbuttons' >
                        <input type='text' ref={imagename} placeholder=' image Name' className='imagename' />
                        <input type='text' ref={imageurl} placeholder=' image url' className='imageurl' />
                        <button className='imageclearbutton' onClick={() => {
                              imagename.current.value = '';
                              imageurl.current.value = '';
                        }} >Clear</button>
                        <button onClick={imageadder} className=' imagecreatebutton' > {editform ? 'Update' : 'Create'} </button>
                  </div>
            </div>
      )
}
