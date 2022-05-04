import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';




function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  
  return (
    <div className="App">
     <Router>
        <Routes>
          {/* <PrivateRoute isAuthenticated={ isAuthenticated} exact path="/profile/:username" component={Profile} /> */}
          <Route exact path="/profile/:username"  
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } 
          />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

function RequireAuth({ children }) {
  let auth = localStorage.getItem("isAuthenticated");
  let location = useLocation();

  if (auth == null || auth == "false") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}


export default App;
