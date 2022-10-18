import './App.css';
import Caroussel from './components/Caroussel';
import { SliderData } from './components/SliderData';

function App() {
  return (
    <div className="App">
      <div className='topContent'>
        <h2>Places to meet</h2>
        <p>After you Like &amp; Subscribe!</p>
      </div>
      <Caroussel images={SliderData}/>
    </div>
  );
}

export default App;
