
import './App.css';
import Navbar from './Components/Navbar';
import AlbumForm from './Components/AlbumForm';
import AlbumList from './Components/AlbumList';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <AlbumForm/>
      <AlbumList/>
    </div>
  );
}

export default App;
