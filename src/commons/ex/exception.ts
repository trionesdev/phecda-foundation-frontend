export class Exception extends Error {
    private code: string | number

    constructor(code: string | number, message: string) {
        super(message)
        this.code = code
    }
}
