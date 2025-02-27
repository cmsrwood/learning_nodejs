import React from 'react'
import { Link} from 'react-router-dom'

export default function Navigate() {


  function changeTheme(){
    var index = document.getElementById('html');
    var icon = document.getElementById('botont');
        if (index.getAttribute("data-bs-theme") === "light") {
          index.setAttribute("data-bs-theme", "dark");
          icon.setAttribute("class","bi bi-moon-fill")
        }
        else {
          index.setAttribute("data-bs-theme", "light");
          icon.setAttribute("class","bi bi-sun-fill")
        }
      }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container-fluid">
          <Link className='navbar-brand' to='/'>ByMySelf</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className='nav-link' to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/signin'>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/signup'>Sign Up</Link>
              </li>
            </ul>
          <button className='btn justify-content-end' onClick={changeTheme}><i id="botont" className='bi bi-moon-fill'></i></button>
          </div>
        </div>
      </nav>
    </div>
  )
}
