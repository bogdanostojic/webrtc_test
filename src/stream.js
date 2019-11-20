//@ts-check

let localStream,
    remoteStream;

class Stream {
    constructor() {}
    /**
     * Returns local stream.
     * @returns {MediaStream}
     */
    static getLocal()  {
        return localStream;
    }
    /**
     * Returns remote stream.
     * @returns {MediaStream} 
     */
    static getRemote() {
        return remoteStream;
    }
    /**
     * 
     * @param {MediaStream} param 
     */
    static setLocal(param)  {
        localStream = param;
    }
    /**
     * 
     * @param {MediaStream} param 
     */
    static setRemote(param) {
        localStream = param;
    }

    static reset() {
        this.resetLocal();
        this.resetRemote() 
    }

    static resetLocal() {
        localStream = undefined;
    }

    static resetRemote() {
        remoteStream = undefined;
    }
}

export {
    Stream
}