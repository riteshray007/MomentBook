import React, { useRef, useEffect } from 'react'

export default function AlbumForm({ addalbums }) {

      // used for focusing input and get its value 
      const albumref = useRef();

      //focus the input on mount
      useEffect(() => {
            albumref.current.focus();
      }, [])

      return (
            <div className='albumformmain' >
                  <h1 className='albumformheading' > Create an album </h1>
                  <div className='inputNbuttons' >
                        <input type='text' ref={albumref} placeholder='Album Name' className='albumname' />
                        <div><button className='clearbutton' >Clear</button>
                              <button onClick={() => {
                                    addalbums(albumref.current.value);
                                    albumref.current.value = '';
                              }} className='createbutton' > Create </button></div>
                  </div>
            </div>
      )
}
