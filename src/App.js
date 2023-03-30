import './App.css';
import { CountriesProvider } from './context/CountriesContext.js'
import { WorldStatsProvider } from './context/WorldStatsContext.js'
import { SelectedCountryProvider } from './context/SelectedCountryContext.js'
import Home from './pages/Home'
import CountryInfo from './pages/CountryInfo'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <SelectedCountryProvider>
      <WorldStatsProvider>
        <CountriesProvider>
          <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/countries/:country" element={<CountryInfo />} />
            </Routes>
            <Footer />
          </Router>
        </CountriesProvider>
      </WorldStatsProvider>
    </SelectedCountryProvider>
  );
}

export default App;
