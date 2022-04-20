<template> 
    <div class="container">

        <div class="row justify-content-md-center">
            <div class="col col-lg-5 form-bacground">

                <div class="container">
                    <form class="row row-cols-1 justify-content-md-center" @submit.prevent="login">

                        <div class="mb-3 gy-2">
                            <h2 class="row justify-content-md-center">Вход</h2>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputLogin" class="form-label">Логин</label>
                            <input type="text" class="form-control" v-model="login_text" required>
                        </div>

                        <div class="mb-1">
                            <label for="exampleInputPasssword" class="form-label">Пароль</label>
                            <input type="password" class="form-control" v-model="password" required>
                        </div>

                        <div class="row justify-content-md-center gy-2 mb-1"> 
                            <button type="submit" class="col col-lg-6 btn btn-primary">Войти</button>
                        </div>

                    </form>
                </div>

                <div class="container">
                    <a href="/" @click="$router.push('/')" class="row justify-content-md-center">Забыли пароль?</a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import api from "../api/index.js"

export default {
    name: "login",
    
    data() {
        return {
            login_text: "",
            password: "",
        };
    },

    methods: {

        async login() {   
            
            try {
                
                const data = (await api.auth.login({
                    login: this.login_text,
                    password: this.password
                })).data

                localStorage.setItem('user', JSON.stringify(data))
                this.$store.dispatch('user/setUser', data)
                this.$router.push({ name: 'main'})

            } catch(err) {

                console.log(err.response.data)

            }

            // try {

            //     const res = await fetch('http://127.0.0.1:8000/api/login', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         credentials: 'include',
            //         body: JSON.stringify({
            //             login: this.login_text,
            //             password: this.password
            //         })
            //     })

            //     const data = await res.json()

            //     if(res.status === 200  || res.status === 201) {
            // localStorage.setItem('user', JSON.stringify(data))
            // this.$store.dispatch('user/setUser', data)
            // this.$router.push({ name: 'main'})
            // this.$emit('close')
            //     } else {
            //         this.err = data
            //     }

            // } catch(err) {
            //     console.log(err)
            // }
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