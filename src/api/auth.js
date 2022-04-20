export default instance => {
    return {
        login(payload) {
            return instance.post('api/login', payload)
        },
        register(payload) {
            return instance.post('api/register', payload)
        },
        logout(payload) {
            return instance.delete('api/logout', payload)
        },
    }
}