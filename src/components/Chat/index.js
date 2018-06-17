import React, { Component } from 'react'
import './style.css'
import { Grid, Row, Col, Button } from 'react-bootstrap'

class Chat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [[{message:'welcome to lobby 1'}],[{message:'welcome to lobby 2'}]],
			rooms: ['lobby1', 'lobby2'],
			userName: this.props.userName,
			inRoom: 'lobby1',
			onlineUsers: []
		}	
	}
	render() {
		const { onlineUsers, rooms, messages, userName, inRoom } = this.state
		return (
			<Grid>
				<h5>Hello {userName}</h5>
				<Row>
					<Col xs={12} sm={6}>
						<div id='messageContainer'>
							{
								rooms.map((room, index) => {
									return inRoom == room ? 
										messages[index].map(messageObj => {
											return (
												<div key={index}>
													{messageObj.user+' '} 
													({new Date(messageObj.timestamp).toString()+' '}):  
													{' '+messageObj.message}
												</div>
											)
										}) : false
								})
							}
						</div>
					</Col>
					<Col xs={12} sm={3}>
						<div id='onlineContainer'>
							<h5>Users currently online:</h5>
							{
								onlineUsers.map((user, index) => {
									return (
										<div key={index}>
											{user}
										</div>
									)
								})
							}
						</div>
					</Col>
					<Col xs={12} sm={3}>
						<div id='roomContainer'>
							<h5>Rooms:</h5>
							{
								rooms.map((room, index) => {
									return (
										<div key={index}>
											<Button 
												id={room} 
												className='room' 
												onClick={e => this.switchRoomTo(room, e)}
											 >
												{room}
										 	</Button>
									 	</div>
									)
								})
							}
							<div id='newRoomContainer'>
								<input 
									id='newRoomName'
									placeholder='Enter new room name'
								/>
								<Button 
									onClick={() => this.createNewRoom()}
								>
									Add
								</Button>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col xs={12} sm={10}>
						<input 
							id='messageText' 
							placeholder='Enter your message here' 
						/>
					</Col>
					<Col xs={12} sm={2}>
						<Button 
							bsStyle='primary' 
							id='sendMessageTextBtn' 
							onClick={() => this.sendMessage()}
						>
							Send
						</Button>
					</Col>
				</Row>
			</Grid>
		)
	}
	sendMessage() {
		const message = document.getElementById('messageText')
		window
			.socket
			.emit('message', {
				timestamp: Date.now(),
				user: this.state.userName,
				room: this.state.inRoom,
				message: message.value
			})
		message.value = ''
	}
	switchRoomTo(room) {
		let rooms = document.getElementsByClassName('room')
		for (const room of rooms) {
			room.classList.remove('activeRoom')	
		}
		document.getElementById(room).classList.add('activeRoom')
		document.getElementById(room).blur()
		this.setState({
			inRoom: room	
		})
	}
	createNewRoom() {
		const name = document.getElementById('newRoomName')
		window
			.socket
			.emit('create-room', name.value)
		name.value = ''
	}
	componentWillMount() {

		window
			.socket
			.emit('new-user', this.state.userName)

		window
			.socket
			.on('user-left', user => {
				console.log(user)	
			})

		window
			.socket
			.on('new-user', user => {
				this.setState(prevState => ({
					onlineUsers: [...prevState.onlineUsers, user]
				}))
			})
		
		window
			.socket
			.on('message', message => {
				this.state.rooms.forEach((elem, index) => {
					if (elem	== this.state.inRoom) {
						this.setState({
							messages: Object.assign(this.state.messages, {
								[index]: this.state.messages[index].concat(message)
							})
						})
					}
				})
			})
		
		window
			.socket
			.on('room-created', room => {
				this.setState({
					rooms: this.state.rooms.concat(room),
					messages: this.state.messages.concat([[{message: 'Welcome to '+room}]])
				})
				console.log(this.state.messages)
			})
	}
	componentWillUnmount() {
		window
			.socket
			.emit('user-left', this.state.userName)
	}
}

export default Chat
