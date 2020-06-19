//@ts-ignore
import React from 'react'
import { Router, Switch, Route } from 'react-router'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import ProfileEdit from './components/Profile/Edit'
import history from './utils/browserHistory'

const App = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/profile" exact component={Profile} />
				<Route path="/profile/edit" exact component={ProfileEdit} />
			</Switch>
		</Router>
	)
}

export default App
