import Home from '../home/Home';
import './layout.scss';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    
    <div className="layout">
      <Outlet />
      {/* <Home /> */}

    </div>
    
  )
}
