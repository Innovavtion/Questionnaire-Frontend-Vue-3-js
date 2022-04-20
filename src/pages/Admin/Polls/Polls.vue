<template>
  <!-- <div class="container-fluid">
    <div class="row row-conformity">
      <div v-for="poll in polls" :key="poll.id" class="card col-lg-2 mt-3 me-5 text-center">
        <div class="card-body gx-1">
          <h5 class="card-title">{{ poll.name_poll }}</h5>
          <p class="card-text">{{ poll.description_poll }}</p>
          <a class="btn btn-primary">Пройти опрос</a>
        </div>
      </div>
    </div>
  </div> -->
  <div id="container" class="mt-3 mb-4">

    <div class="row">
      <div class="col-md-3 mt-3">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Найти">
          <button class="btn btn-outline-primary" type="button">Найти</button>
        </div>
      </div>

      <div class="col-md-3 offset-md-6 mt-3">
        <select class="form-select" aria-label="Пример выбора по умолчанию">
          <option selected>Откройте это</option>
          <option value="1">Один</option>
          <option value="2">Два</option>
          <option value="3">Три</option>
        </select>
      </div>
    </div>

  </div>

  <div id="container">

    <div id="row">

      <div v-for="(poll, index) in polls" :key="poll.id" id="item" @click="$router.push(`/polls/${poll.id}`)" class="card-item">

        <div class="color-bacground">
          <div class="delete-button" @click="deletePoll(poll.id, index)" onclick="event.stopPropagation()"/>
        </div>
        <div class="content-item">
          <h5 class="card-title">{{ poll.name_poll }}</h5>
          <p class="card-title">{{ poll.created_at }}</p>
        </div>

      </div>

      <button class="button" @click="addPoll">+</button>

    </div>

  </div>

  <router-view></router-view>
</template>

<script>
import api from "../../../api/index.js"

export default {

  data() {
    return {
      auth: this.$store.state.user,
      polls: null,
    }
  },

  methods: {
    //получение постов
    async fetchPolls() {

      try {
        const polls_api = (await api.polls.getPolls({
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        }))

        this.polls = polls_api.data
        // console.log(this.polls)
      } catch(err) {
        console.log(err.response.polls_api)
      }

    },

    async addPoll() {
      try {

        let body = {
          'id_who_created': this.auth.user.user.id
        }

        let headers = {
          'Authorization': `Bearer ${this.auth.user.token}`
        }
        
        const add_poll = (await api.polls.addPoll(body, {headers})).data

        console.log(add_poll);
        this.polls.push(add_poll.data);

      } catch (err) {
        console.log(err.response.addPoll)
        console.log(this.auth.user.token)
        console.log(this.auth.user.user.id)
      }
    },

    async deletePoll(id, index) {
      try {
        const delete_poll = (await api.polls.deletePoll(id,{
          headers:{
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        this.polls.splice(index, 1)
      } catch(err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.fetchPolls();
  }

};
</script>

<style scoped>
  #container {
    max-width: 1570px;
    margin: 0 auto;
    padding: 0 15px;
  }

  #row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -14px;
  }

  #item {
    box-sizing: border-box;
    text-align: center;
    width: calc(80% / 12 * 3 - 30px);
    margin: 15px;

    background: #FFFFFF;
    /* Elevation/8 */

    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  .card-item:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: transform .2s;
  }

  .card-item:hover .delete-button{
    opacity: 1;
  }

  .color-bacground {
    display:inline-block;
    width: 100%;
    height: 135px;
    background: rgb(182, 204, 81);
  }

  .delete-button {
    opacity: 0;
    width: 15%;
    height: 35px;
    margin-top: 10px;
    margin-right: 10px;
    float: right;
    background: rgb(228, 86, 67);
  }

  .content-item {
    width: 97%;
  }

  .card-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;  
    
    overflow: hidden;
    text-overflow:ellipsis;
  }

  .button {
    border: none;
    color: rgb(99, 102, 105);
    font-size: 100px;
    padding-bottom: 10px;

    box-sizing: border-box;
    text-align: center;
    height: 216px;
    width: calc(80% / 12 * 3 - 30px);
    margin: 15px;

    background: #FFFFFF;
    /* Elevation/8 */

    box-shadow: 0px 2px 2px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  .button:hover {
    color: rgb(18, 139, 238);
    transform: scale(1.01);
    transition: transform .2s;
  }

  @media screen and (max-width: 1115px){
    #item {
      width: calc(100% / 12 * 4 - 30px);
    }

    .button {
      width: calc(100% / 12 * 4 - 30px);
    }
  }

  @media screen and (max-width: 991px){
    #item {
      width: calc(100% / 12 * 6 - 30px);
    }
    .button {
      width: calc(100% / 12 * 6 - 30px);
    }
  }

  @media screen and (max-width: 720px){
    #item {
      width: calc(100% - 30px);
    }

    .button {
      width: calc(100% - 30px);
    }
  }

  /* .add-question {cursor: pointer; margin-left: 135px; margin-top: 135px;}
  .add-question:before, .add-question:after {content: ""; position: absolute; width: 45px; height: 5px; background: gray;}
  .add-question:hover:before, .add-question:hover:after{background: rgb(100, 153, 231);}
  .add-question:before {transform: rotate(90deg);}
  .add-question:after {transform: rotate(180deg);} */
</style>