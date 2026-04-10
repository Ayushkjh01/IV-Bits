import express from 'express';
const app = express();

// Middleware to parse JSON bodies from the frontend
app.use(express.json());

// 1. Backend API endpoint for User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check the Database for the user
    // const user = await Database.findOne({ email });
    // const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    // Mocking a successful login check:
    if (email === "demo@referease.com" && password === "password123") {
      // Send back success and a mock authenticated user session/token
      res.json({ 
        success: true, 
        token: "mock-jwt-token-7382",
        user: { 
          id: 1, 
          name: "Alex Chen", 
          role: "employee", 
          company: "Google" 
        } 
      });
    } else {
      res.status(401).json({ error: "Invalid login credentials." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// 2. A real backend API endpoint for fetching Referease Candidates
app.get('/api/candidates', async (req, res) => {
  try {
    // We would check the Database for users matching the employee's company
    // const matchingCandidates = await Database.find({ "status": "Referral-Ready" });
    const matchingCandidates = [
      { id: 1, name: 'Alex Johnson', role: 'Frontend Engineer', score: 98 },
      { id: 2, name: 'Anonymous Candidate', role: 'Product Manager', score: 92 }
    ];
    
    // Send the data back to the React app
    res.json({ success: true, data: matchingCandidates });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.listen(3000, () => console.log('Backend server running on port 3000!'));
