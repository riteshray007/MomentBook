import React,{useRef} from 'react'

export default function AlbumForm() {
      const [albumname , albumref] = useRef();
      return (
            <div className='albumformmain' >
                  <h1 className='albumformheading' > Create an album </h1>
                  <form className='inputNbuttons' >
                        <input type='text' placeholder='Album Name' className='albumname' />
                        <button className='clearbutton' >Clear</button>
                        <button type='submit' className='createbutton' > Create </button>
                  </form>
            </div>
      )
}
