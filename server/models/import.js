var User = require('./user.js').User;

function createUser(email, fullname, pass) {
    var user = new User();

    user.email = email;
    user.fullname = fullname;
    user.set('password', pass);

    user.save(function(err) {
      if(err){
          console.log(err);
          process.exit(1);
      }
        process.exit(0);
    });
}

createUser('maria@m', 'maria shyn', '111');