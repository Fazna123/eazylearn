class ErrorHandler extends Error {
    statusCode: number;

    constructor(message:string,statusCode:number){
        super(message || 'An error occurred');
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor)
    }
}

export default ErrorHandler