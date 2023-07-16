
import './App.css';
import Navbar from './Components/Navbar';
import AlbumList from './Components/AlbumList';
import {db} from "./firebaseinit";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <AlbumList/>
    </div>
  );
}

export default App;
