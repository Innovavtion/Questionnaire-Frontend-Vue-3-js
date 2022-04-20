export default instance => {
    return {
        getUsers(payload) {
            return instance.get('api/users', payload)
        },
        deleteUser(id, payload) {
            return instance.delete(`api/users/${id}`, payload)
        }
    }
}