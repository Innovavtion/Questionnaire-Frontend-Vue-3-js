<template>
    <!-- <label class="text-field__label" for="text">Логин</label>
        <div class="row gy-1"> 
        <input class="col col-lg-12">
    </div> -->
    
    <div class="container">

        <div class="row justify-content-md-center">
            <div class="col col-lg-5 form-bacground">

                <div class="container">
                    <form class="row row-cols-1 justify-content-md-center" @submit.prevent="register">

                        <div class="mb-3 gy-2">
                            <h2 class="row justify-content-md-center">Регистрация</h2>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputLogin" class="form-label">Логин</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="login" required>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" v-model="email" required>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputEmailLastName" class="form-label">Имя</label>
                            <input type="text" class="form-control" v-model="last_name" required>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputEmailFirstName" class="form-label">Фамилия</label>
                            <input type="text" class="form-control" v-model="first_name" required>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputPasssword" class="form-label">Пароль</label>
                            <input type="password" class="form-control" v-model="password" required>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputPasswordConfirmation" class="form-label">Повторить пароль</label>
                            <input type="password" class="form-control" v-model="password_confirmation" required>
                        </div>
                 
                        <div class="row justify-content-md-center gy-2 mb-1"> 
                            <button type="submit" class="col col-lg-6 btn btn-primary">Зарегистрироваться</button>
                        </div>

                    </form>
                </div>

                <div class="container">
                    <a href="/login" @click="$router.push('/login')" class="row justify-content-md-center">Есть аккаунт?</a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import api from "../api/index.js"

export default {
    name: "register",
    
    data() {
        return {
            login: "",
            last_name: "",
            first_name: "",
            email: "",
            password: "",
            password_confirmation: "",
        };
    },

    methods: {

        async register() {        

            try {
                const data = (await api.auth.register({
                    login: this.login,
                    last_name: this.last_name,
                    first_name: this.first_name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                })).data

                localStorage.setItem('user', JSON.stringify(data))
                this.$store.dispatch('user/setUser', data)
                this.$router.push({ name: 'main'})

            } catch(err) {
                console.log(err.response.data)
            }
        },
    },
};
</script>

<style scoped>
    .form-bacground {
        background: #FFFFFF;

        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
        border-radius: 4px;

        padding: 16px;
    }
</style>