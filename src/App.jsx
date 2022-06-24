import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'

const App = () => {
	return (
		<Router>
			<Suspense fallback={<p>loading...</p>}>
				<Switch>
					<Route exact path='/' name='Login' render={() => <Login />} />
					<Route exact path='/app' name='Layout' render={() => <Layout />} />
				</Switch>
			</Suspense>
		</Router>
	)
}

export default App
