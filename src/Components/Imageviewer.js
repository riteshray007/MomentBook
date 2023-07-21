import React from 'react'
import { useState , useEffect } from 'react';
export default function Imageviewer({imageurl , nextImageinIL , setimageviewer ,previousimageinIL }) {

  
  return (
    <div className='imageviewermain' >
      <img src='https://cdn-icons-png.flaticon.com/128/318/318477.png' className='previousbutton'  onClick={()=>previousimageinIL(imageurl.index)} />
      <img src='https://cdn-icons-png.flaticon.com/128/318/318476.png' className='nextbutton' onClick={()=>nextImageinIL(imageurl.index)} />
      <img  className='imageviewer' src={imageurl.url} />
      <img src='https://cdn-icons-png.flaticon.com/128/3416/3416079.png' className='closebutton' onClick={()=>setimageviewer(false)} />

    </div>
  )
}
