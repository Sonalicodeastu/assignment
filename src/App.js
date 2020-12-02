
import './App.css';
import Searchtabs from './component/search/Searchtabs';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
       <h3>Flight Search App</h3> 
      
       <div className="row">
          <Searchtabs/>
         
          <div className="col-8 border">search result</div>
        </div>
        </div>
      </header>
    </div>
  );
}
export default App;
