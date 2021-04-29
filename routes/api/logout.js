const router = require("express").Router();

router.post('/', (req, res) => {
    console.log("in logout route");
    if(req.user) {
      req.logout();
      res.send({ msg: 'logging out'});
    } else {
      res.send({ msg: 'no user to log out'});
    }
  })
 
 module.exports = router;