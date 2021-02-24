<template>
    <div class="container">
        <h1>Profile</h1>
        <div class="row mt-5">
            <div class="col-md-7 mx-auto">
                <div class="card">
                    <input type="text" v-model="name">
                    <input type="text" v-model="address">
                    <input type="text" v-model="phone">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '../firebase'
import axios from 'axios'

export default {
    data() {
        return {
            userUid: '',
            user: ''
        }
    },
    watch: {
        userUid() {
            this.info()
        }
    },
    methods: {
        async info() {
            let res = await axios.get(`https://pizza-5f900.firebaseio.com/users/user_${this.userUid}.json`)
            this.user = res.data
        }
    },
    mounted() {
        fb.auth().onAuthStateChanged( user => {
            if (user) {
                this.userUid = user.uid;
            }
        })
    }
}
</script>

<style scoped>
.card {
    height: 200px;
    background-color: #fff;
    border-radius: 16px;
}

input {
    width: 70%;
    border-radius: 6px;
    border: 0;
}
</style>