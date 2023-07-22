import React,{useRef , useEffect} from 'react'

export default function AlbumForm({addalbums}) {

      const albumref = useRef();

      useEffect(()=>{
            albumref.current.focus();
      },[])
      
      return (
            <div className='albumformmain' >
                  <h1 className='albumformheading' > Create an album </h1>
                  <div className='inputNbuttons' >
                        <input type='text' ref={albumref}   placeholder='Album Name' className='albumname' />
                        <button className='clearbutton' >Clear</button>
                        <button  onClick={()=>{
                              addalbums(albumref.current.value); 
                              albumref.current.value = '';
                        }}  className='createbutton' > Create </button>
                  </div>
            </div>
      )
}
