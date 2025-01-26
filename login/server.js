const express = require('express');
const { connectDB } = require('./db');
const User = require('./models/User');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; //backend's localhost

// Google OAuth client setup
const client = new OAuth2Client('130657548367-ed7m7p61u5nk9n4o9k9ps06jrpcbr6uc.apps.googleusercontent.com');

// Middleware keep the limit; giving me a hard time
app.use(express.json({ limit: '10mb' }));

// check if server is running
app.get('/', (req, res) => {
  res.send('Hello World from Express and MongoDB!');
});


// Handles the Google login
app.post('/google-login', async (req, res) => {
  const { token } = req.body; // Get the token from the request body

  try {
    // Verifies the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '130657548367-ed7m7p61u5nk9n4o9k9ps06jrpcbr6uc.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload(); // Extract user data from the token
    const { sub: googleId, name, email } = payload; // Map token fields to database fields

    console.log('Decoded Google user:', { googleId, name, email });

    //Checks if entry exists
    let user = await User.findOne({ googleId });

    // If the user doesn't exist, create a new user
    if (!user) {      
      user = new User({ googleId, name, email });
      await user.save();
      console.log('New user saved:', user);
    } else {
      console.log('User already exists:', user);
    }

    res.status(200).json({ message: 'User authenticated successfully', user });
    // res.redirect('/welcome');
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
});

// app.get('/welcome', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
//   });

// Serve React static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Connects to MongoDB, then starts the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
  });
});
