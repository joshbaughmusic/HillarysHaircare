import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/nav/NavBar.js';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  );
}

export default App;
