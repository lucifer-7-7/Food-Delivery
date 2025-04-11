import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Componenets/Header.js';
import Home from './Componenets/Home.jsx';
import Footer from './Componenets/Footer.jsx';
import Order from './Componenets/Order.jsx';
import Login from './Componenets/Login.jsx';
import Registration from './Componenets/Registration.jsx';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Registration />} />
        
        {}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/order"
          element={
            <MainLayout>
              <Order />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
