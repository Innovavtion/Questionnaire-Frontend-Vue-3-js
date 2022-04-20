<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Login</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody v-for="(user, index) in users" :key="user.id">
                <tr>
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.login }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.email }}</td>
                    <button style="background: red" @click="deleteUser(user.id, index)"/>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from "../../api/index.js"

export default {

  data() {
    return {
      auth: this.$store.state.user,
      users: null,
    }
  },

  methods: {
    //получение постов
    async fetchUsers() {

      try {
        const users_api = (await api.users.getUsers({
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        }))

        this.users = users_api.data
        console.log(this.users)
      } catch(err) {
        console.log(err)
      }

    },

    async deleteUser(id, index) {
      try {
        const delete_poll = (await api.users.deleteUser(id,{
          headers:{
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })).data

        this.users.splice(index, 1)
      } catch(err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.fetchUsers();
  }

};
</script>

<style scoped>
  
</style>