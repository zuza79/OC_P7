const passwordValidator = require('password-validator');

let passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)                                    
    .is().max(20)                                  
    .has().uppercase(1)                              
    .has().lowercase()                              
    .has().digits(3)                                
    .has().not().spaces()                           
    .is().not().oneOf(['Pass123word', 'Password123']) 



module.exports = passwordSchema; 