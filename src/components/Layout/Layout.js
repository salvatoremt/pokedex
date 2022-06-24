import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, CssBaseline, IconButton, Typography, Button, Drawer, Paper, Divider, Container, Card, CardActionArea, CardContent, CardMedia, Grid } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import Logo from './icon.jpg'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'


const useStyles = makeStyles(theme => ({
	paper: {
		width: 240
	},
	div: {
		padding: 20,
		display: 'flex',
		alignItems: 'center'
	},
	logo: {
		height: 60,
		marginLeft: 30,
		marginRight: 'auto'
	},
	footer: {
		bottom: 0,
		position: 'fixed',
		width: '100%'
	},
	container: {
		marginTop: theme.spacing(15)
	},
	card: {
		maxWidth: 350,
		background: 'linear-gradient(45deg, #AE64F3 20%, #0C00FF 90%)'
	},
	imagePoke: {
		height: 250
	}
}))

const Layout = () => {
	const classes = useStyles()
	const history = useHistory()
	const [open, setOpen] = useState(false)
	const [pokemon, setPokemon] = useState([])

	const loadData = () => {
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
			.then(resp => {
				for (let i = 0; i < resp.data.results.length; i++) {
					axios.get(resp.data.results[i].url)
						.then(result => {
							setPokemon(prevArray => [...prevArray, result.data])
						})
				}
			})
	}


	useEffect(loadData, [])

	return (
		<>
			<CssBaseline />
			<AppBar color='secondary'>
				<Toolbar>
					<IconButton edge='start' color='inherit' onClick={() => setOpen(true)}>
						<MenuIcon />
					</IconButton>
					<Typography style={{ flexGrow: 1 }}>Samus App</Typography>
					<Button variant='text' color='inherit' onClick={() => history.push('/')}>Log out</Button>
				</Toolbar>
			</AppBar>
			<Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
				<Paper className={classes.paper} elevation={0}>
					<div className={classes.div}>
						<IconButton edge='start' color='inherit' onClick={() => setOpen(false)}>
							<MenuIcon />
						</IconButton>
						<img src={Logo} alt='...' className={classes.logo} />
					</div>
					<Divider />
				</Paper>
			</Drawer>
			<Container maxWidth='lg' component={Paper} elevattion={4} className={classes.container}>
				<Grid container spacing={2}>
					{pokemon.map((poke, index) => (
						<Grid key={index} item xs={12} sm={4}>
							<Card className={classes.card} raised={true}>
								<CardActionArea>
									<CardContent>
										<CardMedia
											image={poke.sprites.front_default}
											className={classes.imagePoke}
										/>
										<Typography align='center' variant='h4'>{poke.name}</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
			<footer className={classes.footer}>
				<Container maxWidth='sm'>
					<Typography align='center'>Samus © {new Date().getFullYear()}</Typography>
				</Container>
			</footer>
		</>
	)
}

export default Layout