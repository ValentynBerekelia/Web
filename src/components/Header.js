import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Якщо стилі окремо, інакше прибери

function Header() {
  return (
    <header>
      <div className="logo">Senior Cursor</div>
      <nav>
        <Link to="/admin">Особистий кабінет</Link>
        <Link to="/news">Новини</Link>
        <Link to="/support">Підтримка</Link>
      </nav>
      <div className="download">Download</div>
    </header>
  );
}

export default Header;
