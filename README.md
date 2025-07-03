# Real-Time Chat Application

A live chat application built with Node.js, Express, and Socket.IO for real-time communication.

## Features

- Real-time messaging
- User join/leave notifications
- Online users list
- Typing indicators
- Responsive design
- Username validation

## Technologies Used

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript
- **Real-time Communication**: WebSocket (Socket.IO)

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd ChatApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`

## How to Use

1. Enter your username
2. Click "Join Chat"
3. Start chatting with other users in real-time
4. See who's online and typing indicators

## Project Structure

```
ChatApp/
├── server.js          # Node.js server with Socket.IO
├── package.json       # Dependencies and scripts
├── README.md         # Project documentation
└── public/           # Frontend files
    ├── index.html    # Main HTML file
    ├── style.css     # Styling
    └── script.js     # Client-side JavaScript
```