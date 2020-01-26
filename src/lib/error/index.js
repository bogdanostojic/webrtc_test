import Device from './lib/device';
const list = [
    Device,
]
class Error {
    constructor() {}

    static show(err, type) {
        let res = list.find( x => {
            console.log(x.name())
            return x.name().toLowerCase() === type
        });
        console.log( res)
        res.message(err)
    }
}

export {
    Error
}