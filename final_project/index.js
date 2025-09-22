const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// Protect authenticated routes
app.use("/customer/auth/*", (req, res, next) => {
    if (req.session && req.session.authorization) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

// Mount routers
app.use("/customer", customer_routes);  // login, review routes
app.use("/", genl_routes);              // public routes like /register

const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));