
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, OptionBar } from './page/Navbar';
import { Auth, Profile } from './page/auth';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import { GoogleAuth } from './page/GoogleAuth';
import { PageNotFound } from './page/PageNotFound';
import { Socket } from "./page/socket";
import { Test } from "./page/test";

function App() {
	const { user } = useContext( AuthContext );
	//console.log(user);

  	return (
		<div className="App">
			<BrowserRouter>
				{ user && <Navbar /> }
				
				<Routes>
					<Route exact path='/auth' element={ user ? <Navigate to="/" /> : <Auth /> } >  </Route>
					<Route exact path='/google-auth' element={ user ? <Navigate to="/" /> : <GoogleAuth /> } >  </Route>
					
					<Route exact path='/profile' element={ user? <Profile /> : <Navigate to="/auth" /> } >  </Route>
					<Route exact path='/test' element={<Test />} >  </Route>
					<Route exact path='/chat' element={ user ? <Socket /> : <Navigate to="/auth" /> } ></Route>
					<Route path='*' element={ <PageNotFound/> } ></Route>
				</Routes>


				
				
			</BrowserRouter>
		</div>
  	);

}

export default App;
