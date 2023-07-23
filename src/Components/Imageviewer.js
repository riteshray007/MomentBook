import React from 'react'
import { useState , useEffect } from 'react';
import { saveAs } from 'file-saver';
export default function Imageviewer({imageurl , nextImageinIL , setimageviewer ,previousimageinIL }) {


  const downloadImage = (url , name) => {
    saveAs(url , name ) // Put your image url here.
  }
  
  return (
    <div className='imageviewermain' >
      <img src='https://cdn-icons-png.flaticon.com/128/8050/8050812.png' className='previousbutton'  onClick={()=>previousimageinIL(imageurl.index)} />
      <img src='https://cdn-icons-png.flaticon.com/128/8050/8050813.png' className='nextbutton' onClick={()=>nextImageinIL(imageurl.index)} />
      <img  className='imageviewer' src={imageurl.url} />
      <img src='https://cdn-icons-png.flaticon.com/128/753/753345.png' className='closebutton' onClick={()=>setimageviewer(false)} />
      <img  src='https://cdn-icons-png.flaticon.com/128/3677/3677179.png' alt='downloadbutton' className='downloadbutton'  onClick={()=>downloadImage(imageurl.url , imageurl.name)} />
    </div>
  )
}
