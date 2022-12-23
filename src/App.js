import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import Movie from './components/Movie';
function App() {
  return (
    <div>
       <nav className="navbar navbar-light bg-primary">
        <a className="navbar-brand text-white" href="#">MovieHub</a>
        </nav>
      <Movie></Movie>
    </div>
  );
}

export default App;
