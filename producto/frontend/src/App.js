import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Productos from './pages/Productos';
import Añadir from './pages/Añadir';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Productos/>}/>
          <Route path='/añadir' element={<Añadir/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
