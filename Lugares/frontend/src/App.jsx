import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Lugares from './pages/Lugares';
import Add from './pages/Add';
import Update from './pages/Update';
import Lugar from './pages/Lugar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Lugares/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path = 'lugar/:id' element={<Lugar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
