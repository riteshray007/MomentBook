
import './App.css';
import Navbar from './Components/Navbar';
import AlbumList from './Components/AlbumList';
import ImagesList from './Components/ImagesList';
import { useState } from 'react';

function App() {

  //helps dynamically render Imagelist or Albumlist component
  const [imagelistcheck , setimagecheck ] = useState(false);
  //sends albums id to imagelist component to fetch data 
  const [imagelistid , setimagelistid ] = useState();

  return (
    <div className="App">
      <Navbar/>
      
      { imagelistcheck ?  <ImagesList albumid = {imagelistid} setimagecheck={setimagecheck} /> : <AlbumList setimagecheck={setimagecheck} setimagelistid={setimagelistid} /> }
    </div>
  );
}

export default App;
