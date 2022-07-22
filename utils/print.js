const util= require('util')
function print(object) {
    console.log(util.inspect(object,false,12,true));
    
}
module.exports= print;