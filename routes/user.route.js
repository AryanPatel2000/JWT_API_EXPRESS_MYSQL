
const auth = require('../middleware/auth.js');

module.exports = function(app)
{
    const users = require('../controller/user.controller');

    //Retrive all user
    app.get('/api/users', auth, users.findAll);

    // Retrieve a single User by Id
    app.get('/api/users/:userId', users.findByPk);
 
    // Update a User with Id
    app.put('/api/users/:userId',auth, users.update);
 
    // Delete a User with Id
    app.delete('/api/users/:userId',auth, users.delete);
 
    // User signup
    app.post('/api/user/signup', users.signup);
    
    // User signin
    app.post('/api/user/signin', users.signin);
}
