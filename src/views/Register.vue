<template>
    <div class="register h-100">
        <div class="image-intro">
            <img src="../assets/pizza.jpg" alt="pizza">
        </div>
        <div class="login-side custom-padding">
            <div class="text mb-5">
                <h1>Добре дошъл</h1>
            </div>
            <div class="login-box">
                <input type="text" v-model="name" placeholder="Име и фамилия"> <br>
                <input type="text" v-model="address" placeholder="Град, адрес, номер и улица"> <br>
                <input type="phone" v-model="phone" placeholder="Телефонен номер"> <br>
                <input type="email" v-model="email" placeholder="Email"> <br>
                <input type="password" v-model="password" placeholder="Password"> <br>
                <button @click="register">Регистрирай се</button>
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
            email: '',
            password: '',
            name: '',
            address: '',
            phone: '',
        }
    },
    methods: {
        async register() {
            try {
                const user = await fb
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password);
                let uid = user.user.uid
                if (uid) {
                    await axios.put(`https://pizza-5f900.firebaseio.com/users/user_${uid}/user_info.json`, {name: this.name, address: this.address, phone: this.phone})
                    this.$router.push("/");
                }
            } catch (err) {
                console.log(err);
            }
        },
       
    }
}
</script>

<style lang="scss" scoped>
h1 {
    margin-top: 15%;
    font-size: 72px;
    color: #000;
    font-weight: bold;
    font-style: italic;
}

.register {
    display: flex;
    background-color: #fff;
}

.image-intro {
    flex-grow: 1;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.login-side {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-basis: 40%;
    box-shadow: -28px 0px 35px 5px rgba(0,0,0,0.68);
}

.login-animation {
    width: 50%;
}

.login-box {
    width: 70%;
    margin: 0 auto;
    z-index: 1;
}

.custom-padding {
    padding: 40px 0;
}

input {
    width: 80%;
    height: 46px;
    padding: 0 10px;
    font-size: 14px;
    border: 0;
    border-radius: 3px;
    margin-bottom: 10px;
    border: 1px solid #F3C008;
    background-color: transparent;
    color: #000;
    // box-shadow: 0 6px 8px rgba(0,0,0,0.11); 
}

button {
    margin-top: 20px;
    width: 80%;
    height: 50px;
    border: 0;
    border-radius: 8px;
    background: #10ca93;
    color: #fff;
    box-shadow: 0 6px 8px rgba(0,0,0,0.11); 
}
</style>