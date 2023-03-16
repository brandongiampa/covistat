import './App.css';
import { ApiProvider } from './context/ApiContext.js'
import Hero from './components/layout/Hero'

function App() {
  return (
    <ApiProvider>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Hero />
      </div>
    </ApiProvider>
  );
}

export default App;
