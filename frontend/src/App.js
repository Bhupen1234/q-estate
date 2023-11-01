
import './App.css';
import { Route,Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Explore from './components/Explore/Explore';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path='/' element={<LandingPage/>}/>
       <Route path='/explore' element={<Explore/>}/>
     </Routes>
    </div>
  );
}

export default App;
