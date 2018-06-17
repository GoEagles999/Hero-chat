import React, { Component } from 'react'
import logo from './logo.svg'
import './style.css'
import Chat from '../Chat'
import { Button } from 'react-bootstrap'

class App extends Component {
	constructor() {
		super()
		this.state = {
			userName: null
		}	
	}
	render() {
		const { userName } = this.state
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Chat</h1>
				</header>
				{ userName 
					? 
					<Chat userName={userName}/> 
					: 
					(
						<div>
							<p className="App-intro">
								To enter the chat, please enter your name below:
							</p>
							<input id='userNameInput' placeholder='Your name' />
							<div id='enterAction'>
								<Button bsStyle='primary' id='enterBtn' onClick={() => this.initChat()}>Enter</Button>
							</div>
						</div>
					)
				}
			</div>
		)
	}
	initChat() {
		const userName = document.getElementById('userNameInput').value
		userName ? this.setState({userName: userName}) : false
	}
}

export default App
