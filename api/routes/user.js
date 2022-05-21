
const router = require('express').Router();

// User requires
const UserService = require("../services/UserService");
const UserController = require("../controllers/UserController");

// User instances
const UserServiceInstance = new UserService();

const UserControllerInstance = new UserController(
    UserServiceInstance
);

// Routes
router.post('/login', (req, res) =>
    UserControllerInstance.login(req, res)
);

router.post('/register', (req, res) =>
    UserControllerInstance.register(req, res)
);


module.exports = router;

