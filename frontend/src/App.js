

import './constants/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Workouts } from './page/workouts';
import { Home } from './page/home';
import { Navbar } from './page/Navbar';
import { ProductProvider } from './context/ProductContext';
import { WorkoutContextProvider } from './context/WorkoutContext';
import { Product } from './page/Product';



function App() {
  return (
    <div className="App">
      <ProductProvider>
        <WorkoutContextProvider>
      <header className="App-header">
        <BrowserRouter>
          <ProductProvider>
            <Navbar />
            <Routes>
              <Route exact path='/' element={ <Home /> } > </Route>
              <Route exact path='/workouts' element={ <Workouts/> } > </Route>
              <Route exact path="/product" element={ <Product /> } ></Route>
            </Routes>
          </ProductProvider>
        </BrowserRouter>
      </header>
      </WorkoutContextProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
