import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Journal from "./Pages/Journal/Journal";
const App = () => {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route path='/login' component={Login} />
				<Route path='/journal' component={Journal} />
			</Switch>
		</div>
	);
};
export default App;
