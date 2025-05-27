import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Workouts } from './workouts';
import { Home } from './home';
import { Navbar } from './Navbar';
import { WorkoutContextProvider } from './WorkoutContext';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <WorkoutContextProvider>
            <Navbar />
            <Routes>
              <Route exact path='/' element={ <Home /> } > </Route>
              <Route exact path='/workouts' element={ <Workouts/> } > </Route>
            </Routes>
          </WorkoutContextProvider>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
