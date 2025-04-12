import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Componenets/Landing/Header/Header';
import Home from './Componenets/Landing/Home';
import Footer from './Componenets/Landing/Footer/Footer';
import Order from './Componenets/OrderPage';
import Login from './Componenets/Auth/Login/Login';
import Registration from './Componenets/Auth/Register/Registration';
import CartPage from './Componenets/Landing/Cart/Cart';
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
          
              <Order />
          
          }
        />
         <Route
          path="/cart"
          element={
          
              <CartPage />
          
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
