
import './App.css';
import Navbar from './Components/Navbar';
import AlbumList from './Components/AlbumList';
import ImagesList from './Components/ImagesList';
import { useState , useEffect } from 'react';


function App() {

  const [imagelistcheck , setimagecheck ] = useState(false);
  const [imagelistid , setimagelistid ] = useState();


  return (
    <div className="App">
      <Navbar/>
      
      { imagelistcheck ?  <ImagesList albumid = {imagelistid} setimagecheck={setimagecheck} /> : <AlbumList setimagecheck={setimagecheck} setimagelistid={setimagelistid} /> }
    </div>
  );
}

export default App;
