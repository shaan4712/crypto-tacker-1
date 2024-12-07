import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import CoinPage from './pages/CoinPage';
import ComparePage from './pages/ComparePage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
