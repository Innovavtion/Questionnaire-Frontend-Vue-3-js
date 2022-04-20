export default instance => {
    return {
        addQuestion(payload, headers) {
            return instance.post(`api/polls/${payload}/questions`, payload, headers)
        },
        deleteQuestion(id_poll, id_question, headers) {
            return instance.delete(`api/polls/${id_poll}/questions/${id_question}`, headers)
        },
        addVariantAnswer(payload, headers) {
            return instance.post(`api/polls/${payload.id_poll}/questions/${payload.id_question}/variant-answers`, payload, headers)
        },
        deleteVariantAnswer(payload, headers) {
            return instance.delete(`api/polls/${payload.id_poll}/questions/${payload.id_question}/variant-answers/${payload.id_variant_answer}`, headers)
        },
        updatePoll(payload, headers) {
            return instance.put(`api/polls/${payload.id_poll}`, payload, headers)
        },
        updateQuestion(payload, headers) {
            return instance.put(`api/polls/${payload.id_poll}/questions/${payload.id_question}`, payload, headers)
        },
        updateVarinatAnswer(payload, headers) {
            return instance.put(`api/polls/${payload.id_poll}/questions/${payload.id_question}/variant-answers/${payload.id_variant_answer}`, payload, headers)
        }
    }
}