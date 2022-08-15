import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={""} />  
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
