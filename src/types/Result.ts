export class Result<T = null>{

    constructor(

        isSuccess: boolean,
        error: string = "",
        value?: T
    ){
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        if(error) 
            this.error = error;
        if(value)
            this.value = value;
    }

    public isSuccess : boolean;
    public isFailure: boolean;
    public value?: T;
    public error?: string;

    public static ok<T>(value?: T): Result<T> {
        return new Result<T>(true, "", value);
    }

    public static fail<T>(error: string): Result<T>{
        return new Result<T>(false, error);
    }
}