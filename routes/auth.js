const router = require('express').Router()
const passport = require('passport')

const CLIENT_URL = 'http://localhost:3000/'
router.get('/login/success', async (req, res) => {
    try {
        if (req.user) {
            console.log('+++++++++', req.user);
            res.status(200).json({
                success: true,
                message: "successful",
                user: req.user,
                //cookies:req.cookies
            });
        } else {
            console.log('$$$$$$$$$$ no user');
            res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }
    } catch (error) {
        console.error('Error in /login/success route:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


router.get('/login/failed', (req, res)=>{
   res.status(401).json({
    success:false,
    message:'login failed'
   });
})

router.get('/logout', (req, res)=>{
    req.logout(function(err) {
        if (err) {
            // Handle any errors that may occur during logout
            console.error(err);
        } else {
            // Redirect or display a success message
            res.redirect("http://localhost:3000/login");
        }
    });
})

//google routing
router.get('/google',passport.authenticate('google',{scope:["profile"]}))

//the callback function
router.get('/google/callback',passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect:"/login/failed"
}));

//github routing
router.get('/github',passport.authenticate('github',{scope:["profile"]}))

//the callback function
router.get('/github/callback',passport.authenticate("github",{
    successRedirect: CLIENT_URL,
    failureRedirect:"/login/failed"
}));

module.exports = router
