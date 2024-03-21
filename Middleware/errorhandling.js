const Constant = require('../Constant')
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case Constant.VALIDATION_ERROR:
            res.json({
              title: 'Valiadtion error' ,
              message:  err.message,
              stackTrace: err.stack
            });
            break;
    
            case Constant.UNAUTHORIZED:
            res.json({
              title: 'User unauthoized' ,
              message:  err.message,
              stackTrace: err.stack
            });
            break;

            case Constant.RESTRICTED:
            res.json({
              title: 'Restricted' ,
              message:  err.message,
              stackTrace: err.stack
            });
            break;

            case Constant.NOT_FOUND:
            res.json({
              title: 'Not Found' ,
              message:  err.message,
              stackTrace: err.stack
            });
            break;

            case Constant.SERVER_ERROR:
            res.json({
              title: 'Server Error' ,
              message:  err.message,
              stackTrace: err.stack
            });
            break;
            
        default:
            console.log('No Error')
            break;
    }
}

module.exports = errorHandler;