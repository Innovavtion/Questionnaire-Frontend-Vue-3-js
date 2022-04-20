<template>
  <div>

    <div class="container" v-if="isPollLoading">

      <div class="row h-poll">

        <div class="h-color"/>
        <h2><input type="text" v-model="this.poll.data.name_poll" @change="updatePoll(poll.data)"></h2>
        <p><input type="text" v-model="this.poll.data.description_poll" @change="updatePoll(poll.data)"></p>

      </div>

      <div v-for="(question, index) in poll.data.questions" :key="question.id" class="row" @click="questionVisibleFunctional(question.id)">
        <div class="q-poll">
          <div style="width:97%; margin: 0 auto; margin-top: 20px;">

            <h4><input type="text" v-model="question.text_question" @change="updateQuestion(question.id, index)"></h4>

            <div v-for="(answer, index_answer) in question.variant_answers" :key="answer.id" class="a-poll">
              <input :type="answer.value.type" v-model="answer.value.answer" @change="updateVariantAnswer(question.id, answer.id, index, index_answer)">
              <div v-show="question.visible" @click="deleteVariantAnswer(question.id, answer.id, index, index_answer)"></div>
            </div>

            <div class="add-answer" v-show="question.visible" @click="addVariantAnswer(question.id, index)"></div>

            <div class="function-poll" v-show="question.visible">
              <div class="delete_question" @click="deleteQuestion(question.id, index)"/>
            </div>

          </div>
        </div>
      </div>

      <div class="add-question" @click="addQuestion"></div>

      <!-- <button type="button" class="btn btn-secondary position-absolute start-50 translate-middle" style="margin-top:60px">Сохранить изменения</button> -->

    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import api from "../../../api/index.js"

export default {
  name: "Poll",

  data() {
    return {
      auth: this.$store.state.user,
      poll: null,
      isPollLoading: false,
    };
  },

  methods: {
    async fetchPoll() {

      try {

        const poll_api = (await api.polls.getPoll(this.$route.params.id,{
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        }))

        this.poll = poll_api.data

      } catch(err) {

        console.log(err.response)

      } finally {

        this.isPollLoading = true

      }

    },

    async addQuestion() {
      try {

        const add_question = (await api.poll.addQuestion(this.$route.params.id,{
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        this.poll.data.questions.push(add_question.data);

      } catch(err) {
        console.log(err)
      }
    },

    async deleteQuestion(id_question, index) {
      try {

        const delete_question = (await api.poll.deleteQuestion(this.$route.params.id, id_question, {
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        }))

        this.poll.data.questions.splice(index, 1)

      } catch(err) {

        console.log(err)

      }
    },

    async addVariantAnswer(id_question, index) {

      try {

        let data = {
          id_poll: this.$route.params.id,
          id_question: id_question
        }

        const add_variant_answer = (await api.poll.addVariantAnswer(data, {
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        this.poll.data.questions[index].variant_answers.push(add_variant_answer)
      } catch(err) {
        console.log(err)
      }

    },

    async deleteVariantAnswer(id_question, id_variant_answer, index, index_answer) {
      try {

        let data = {
          id_poll: this.$route.params.id,
          id_question: id_question,
          id_variant_answer: id_variant_answer
        }

        const delete_variant_answer = (await api.poll.deleteVariantAnswer(data, {
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        console.log(delete_variant_answer.data)
        console.log(index)

        this.poll.data.questions[index].variant_answers.splice(index_answer, 1)
      } catch(err) {
        console.log(err)
      }
    },

    async updatePoll(data_poll) {
      try {
        let data = {
          id_poll: this.$route.params.id,
          id_who_created: this.auth.user.user.id,
          name_poll: data_poll.name_poll,
          description_poll: data_poll.description_poll
        }

        const update_poll = (await api.poll.updatePoll(data, {
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        // console.log(update_poll.data)
      } catch(err) {
        console.log(err)
      }
    },

    async updateQuestion(id_question, index) {
      try {

        let data = {
          id_poll: this.$route.params.id,
          id_question: id_question,
          id_type_question: this.poll.data.questions[index].id_type_question,
          text_question: this.poll.data.questions[index].text_question,
          required: this.poll.data.questions[index].required
        }
        
        const update_question = (await api.poll.updateQuestion(data, {
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        // console.log(update_question.data)
      } catch(err) {
        console.log(err)
      }
    },

    async updateVariantAnswer(id_question, id_variant_answer, index,index_question) {
      try {
        let value = {
          type: this.poll.data.questions[index].variant_answers[index_question].value.type,
          answer: this.poll.data.questions[index].variant_answers[index_question].value.answer
        }

        value = JSON.stringify(value)

        let data = {
          id_poll: this.$route.params.id,
          id_question: id_question,
          id_variant_answer: id_variant_answer,
          value: value
        }

        // console.log(value)

        const update_variant_answer = (await api.poll.updateVarinatAnswer(data, {
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        // console.log(update_variant_answer.data)
      } catch(err) {
        console.log(err.response)
      }
    },

    questionVisibleFunctional(id) {
      this.poll.data.questions.forEach(element => {

        if(element.visible == true) element.visible = false

        if (element.id == id) element.visible = true

      });
    }
  },

  mounted() {
    this.fetchPoll();
  }
}
</script>

<style scoped>
  
  .row {
    --bs-gutter-x: 0;
  }

  .container {
    max-width: 1050px;
  }

  .h-poll {
    display:inline-block;
    width: 100%;
    background: #FFFFFF;

    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  .h-color {
    width: 100%;
    height: 20px;
    background: rgb(182, 204, 81);
  }

  .h-poll > h2 {
    width: 100%;
    height: 49px;
    text-align: center;
    margin-top: 15px;
  }

  .h-poll > p {
    width: 100%;
    height: 27px;
    text-align: center;
    margin-top: 7px;
  }

  .h-poll > p > input, .h-poll > h2 > input {
    width: 95%;
    text-align: center;

    border: none;
  }

  .h-poll > p > input:focus, .h-poll > h2 > input:focus, .q-poll > div > h4 > input:focus {
    outline:none;

    border-bottom: 1px dashed grey;
  }

  .q-poll {
    width: 100%;
    background: #FFFFFF;

    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;

    margin-top: 15px;
  }

  .q-poll > div > h4 {
    width: 100%;
    height: 35px;
    margin-top: 40px;
  }

  .q-poll > div > h4 > input {
    width: 90%;
    border: none;
  }

  .a-poll {
    margin-bottom: 20px;
  }

  .a-poll > input {
    width: 90%;

    border: none;
    border-bottom: 1px dashed grey;

    outline:none;
  }

  .a-poll > div {
    display: none;
    cursor: pointer;
    width: 15px;
    height: 15px;
    background: rgb(189, 67, 67);
  }

  .a-poll:hover > div {
    display: inline-block;
    vertical-align: bottom;
    margin-left: 10px;
  }

  .function-poll {
    width: 100%;
    height: 50px;

    background: #FFFFFF;

    border-top: 2px solid;
    margin: 0 auto;
  }

  .delete_question {
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: rgb(189, 67, 67);

    margin-top: 10px;
  }

  .add-answer {
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: rgb(98, 214, 51);

    margin-bottom: 10px;
  }

  .add-question {cursor: pointer; margin-left: 48.7%; margin-top: 40px;}
  .add-question:before, .add-question:after {content: ""; position: absolute; width: 35px; height: 4px; background: gray;}
  .add-question:hover:before, .add-question:hover:after{background: rgb(100, 153, 231);}
  .add-question:before {transform: rotate(90deg);}
  .add-question:after {transform: rotate(180deg);}
</style>