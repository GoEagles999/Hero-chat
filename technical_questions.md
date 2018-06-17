### 1. ### 
Around 6 hours
### 2. ###
Functionally:
- persistence layer ie REST API for fetching: past messages, currently online users and rooms
- delete rooms
-	status info on who have entered/left room
- decouple chat into separate components
- error checking for adding multiple rooms with the same name

On the infrastructure side:
- HTTP2 support for parallel loading of assets
- Server-side rendering for faster load time for clients and SEO 
- Use WebSocket implementation instead of socket.io for better performance 
- LetsEncrypt SSL certificate for HTTPS support 
- Private messaging
- Redis for database
- Redux for state management 
- Flow types, prop-types library for props 
