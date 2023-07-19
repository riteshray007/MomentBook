import React,{useRef , useState } from 'react'

export default function Imageform({addimage  }) {
      
      const imagename = useRef();
      const imageurl = useRef();

      
      
      return (
            <div className='imageformmain' >
                  <h1 className='albumformheading' > Add image  </h1>
                  <div className='imageinputNbuttons' >
                        <input type='text' ref={imagename} placeholder=' image Name' className='imagename' />
                        <input type='text' ref={imageurl} placeholder=' image url'  className='imageurl' />
                        <button className='imageclearbutton' onClick={()=>{
                              imagename.current.value = '';
                              imageurl.current.value = '';
                        }} >Clear</button>
                        <button onClick={() => {
                              addimage(imagename.current.value,imageurl.current.value);
                              imagename.current.value = '';
                              imageurl.current.value = '';
                        }} className=' imagecreatebutton' > Create </button>
                  </div>
            </div>
      )
}
