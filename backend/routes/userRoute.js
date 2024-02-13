const express = require("express");
const router = express.Router();
const { registerUser, authUser, allUsers } = require('../controller/userController');

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/', allUsers);

router.get('/', (req, res) => {
    res.send("arrived at user !");
});
module.exports = router;