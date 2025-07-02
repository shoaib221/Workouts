
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Workouts } from './page/workouts';
import { Home } from './page/home';
import { Navbar, OptionBar } from './page/Navbar';
import { Auth, Profile } from './page/auth';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import { GoogleAuth } from './page/GoogleAuth';
import { PageNotFound } from './page/PageNotFound';
import { Products } from './page/product';
import { Cart } from './page/cart';
import { Restaurant } from './page/restaurant';
import { MyOrders } from './page/FoodOrders';
import { Amazon } from "./page/Amazon";
import { Footer1, Footer2, Footer3, Footer4, Footer5 } from "./page/Navbar";
import { Socket } from "./page/socket";

function App() {
	const { user } = useContext( AuthContext );
	//console.log(user);

  	return (
		<div className="App">
			<BrowserRouter>
				{ user && <Navbar /> }
				
				<Routes>
					<Route exact path='/' element={user? <Home /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/workout' element={user ? <Workouts/> : <Navigate to="/auth" />  } >  </Route>
					<Route exact path='/auth' element={ user ? <Navigate to="/" /> : <Auth /> } >  </Route>
					<Route exact path='/google-auth' element={ user ? <Navigate to="/" /> : <GoogleAuth /> } >  </Route>
					<Route exact path='/product' element={ user ? <Products /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/cart' element={ user ? <Cart /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/restaurant/:_id' element={ user ? <Restaurant /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/orders' element={ user? <MyOrders /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/profile' element={ user? <Profile /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/style' element={ <Amazon /> } ></Route>
					<Route exact path='/chat' element={ user ? <Socket /> : <Navigate to="/auth" /> } ></Route>
					<Route path='*' element={ <PageNotFound/> } ></Route>
				</Routes>


				
				
			</BrowserRouter>
		</div>
  	);

}

export default App;
