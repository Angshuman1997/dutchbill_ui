import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Main from './pages/Main/Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;


// <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>
//       </nav>