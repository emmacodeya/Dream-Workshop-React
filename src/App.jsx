import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MemberHome from "./pages/Member/MemberHome"; 


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/*" element={<MemberHome />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;