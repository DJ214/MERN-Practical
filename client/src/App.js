import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/form-elements.css'
import './stylesheets/theme.css'
import './stylesheets/custom.css'

function App() {
  const {loading} = useSelector((state)=>state.loaders)
  return (
    <div>
      {loading && (
      <div className="loader-parent">
        <div className="loader"></div>
      </div>
    )}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
                        <ProtectedRoute>
                          <Home/>
                        </ProtectedRoute>
        }/>
        <Route path='/profile' element={
                        <ProtectedRoute>
                          <Profile/>
                        </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

      </Routes>
  
    </BrowserRouter>
    </div>
  );
}

export default App;
