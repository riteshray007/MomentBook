import React from 'react'

export default function AlbumForm() {
      return (
            <div className='albumformmain' >
                  <h1 className='albumformheading' > Create an album </h1>
                  <div className='inputNbuttons' >

                        <input type='text' placeholder='Album Name' className='albumname' />
                        <button className='clearbutton' >Clear</button>
                        <button className='createbutton' > Create </button>
                  </div>
            </div>
      )
}
