class ApiResponse {
    constructor(status,message) {
        this.status;
        this.message;
        this.datetime = new Date().toISOString();
    }
}

module.exports = ApiResponse;