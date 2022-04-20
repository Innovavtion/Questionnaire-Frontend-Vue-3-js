<script>
import { mapGetters, mapActions } from 'vuex'
import api from "../api/index.js"

export default {
  data() {
    return {
      auth: this.$store.state.user
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    }),
  },
  created() {
    this.setUser(JSON.parse(localStorage.getItem('user')))
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser'
    }),
    logout() {

      if(this.getUser) {

        api.auth.logout({
          headers: {
            'Authorization': `Bearer ${this.auth.user.token}`
          }
        })

        localStorage.removeItem('user')
        this.deleteUser()
        this.$router.push({ name: 'main' })

      }

      this.checkAuth()

    },
    checkAuth() {

      if(JSON.parse(localStorage.getItem('user')) !== null) {

        return false

      }

      return true
    }
  },
}
</script>

<template>
  <nav class="tyuiyui">
    <input type="checkbox" id="check">
    <label for="check" class="checkbutton">
      <i class="fas fa-bars"></i>
    </label>
    <label class="logo" @click="$router.push({ name: 'main' })">SystemBrifs</label>
    <ul v-if="auth.user != null && auth.user.user.id_role === 2">
      <li><a @click="$router.push(`/polls`)">Опросы</a></li>
      <li><a @click.prevent="logout">Выйти</a></li>
    </ul>
    <ul v-else-if="auth.user != null && auth.user.user.id_role === 1">
      <li><a @click="$router.push(`/polls`)">Опросы</a></li>
      <li><a @click="$router.push(`/editUsers`)">Пользователи</a></li>
      <li><a @click="$router.push(`/polls`)">Справочник</a></li>
      <li><a @click.prevent="logout">Выйти</a></li>
    </ul>
    <ul v-else>
      <li><a href="/login" @click="$router.push({ name: 'login' })">Вход</a></li>
      <li><a href="/register" @click="$router.push({ name: 'register'} )">Регистрация</a></li>
    </ul>
  </nav>
</template>

<style scoped>

    * {
      padding: 0;
      margin: 0;
      text-decoration: none;
      list-style: none;
    }

    nav {
      height: 80px;
      width: 100%;
      background: rgb(253, 253, 253);

      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
    }

    label.logo {
      color: rgb(64, 67, 77);
      font-size: 35px;
      line-height: 80px;
      padding: 0 27px;
      font-weight: bold;
    }

    nav ul {
      float: right;
      margin-right: 20px;
      font-weight: bold;
    }

    nav ul li {
      display: inline-block;
      line-height: 80px;
      margin: 0 5px;
    }

    nav ul li a {
      color: rgb(64, 67, 77);
      font-size: 17px;
      padding: 7px 13px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    a.active, a:hover {
      background: rgb(196, 193, 201);
      transition: .5s;
      cursor: pointer;
    }

    .checkbutton {
      font-size: 30px;
      color: rgb(64, 67, 77);
      float: right;
      line-height: 80px;
      margin-right: 27px;
      cursor: pointer;
      display: none;
    }

    #check {
      display: none;
    }

    @media (max-width: 952px) {
      label.logo {
        font-size: 30px;
        padding-left: 20px;
      }
      nav ul li a {
        font-size: 16px;
      }
    }

    @media (max-width: 991px) {
      .checkbutton {
        display: block;
      }
      ul {
        position: fixed;
        width: 100%;
        height: 100vh;
        background: rgb(64, 67, 77);
        top: 80px;
        left: -100%;
        text-align: center;
        transition: all .5s;
      }
      nav ul li {
        display: block;
        margin: 50px 0;
        line-height: 30px;
      }
      nav ul li a {
        font-size: 20px;
        color: rgb(255, 255, 255);
      }
      a:hover, a:active {
        background: none;
        color: #719fe6;
      }
      #check:checked ~ ul {
        left: 0;
      }
    }
</style>