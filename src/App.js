import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Auth/AuthUI/login.component";
import SignUp from "./Auth/AuthUI/signup.component";
import { WireFrameContainer } from "./WireFrame/WireFrameContainer";
import { Account } from "./Auth/Account";
import { GlobalProvider } from "./Store/GlobalStore";
import { Homepage } from "./Homepage/Homepage";
import useWindowDimensions from "./Utils/useWindowSize.hook";
function App() {
	const windowDimensions = useWindowDimensions();

	return (
		<Router>
			<div className='App'>
				<GlobalProvider>
					<Account>
						<Routes>
							<Route path='/Dashboard' element={<WireFrameContainer />}></Route>
							<Route path='/sign-in' element={<Login />} />
							<Route path='/Home' element={<Homepage />} />
							<Route path='/sign-up' element={<SignUp />} />
						</Routes>
					</Account>
				</GlobalProvider>
			</div>
		</Router>
	);
}
export default App;
