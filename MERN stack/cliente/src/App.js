import { Route,BrowserRouter,Routes } from 'react-router-dom';
import ListarUsuario from './usuarios/ListarUsuario';
import AgregarUsuario from './usuarios/AgregarUsuario';
import EditarUsuario from './usuarios/EditarUsuario';
import Navegacion from './Navegacion';


function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
      <Navegacion></Navegacion>
        <Routes>
          <Route exact path='/' element={<ListarUsuario/>}></Route>
          <Route exact path='/agregarusuario' element={<AgregarUsuario/>}></Route>
          <Route exact path='/editarusuario' element={<EditarUsuario/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
