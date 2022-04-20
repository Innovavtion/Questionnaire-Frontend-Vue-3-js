export default instance => {
    return {
        getPolls(payload) {
            return instance.get('api/polls', payload)
        },
        getPoll(id, payload) {
            return instance.get(`api/polls/${id}`, payload)
        },
        addPoll(payload, headers) {
            return instance.post('api/polls', payload, headers)
        },
        deletePoll(id, headers) {
            return instance.delete(`api/polls/${id}`, headers)
        }
    }
}