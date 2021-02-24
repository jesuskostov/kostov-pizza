<template>
  <div class="h-100 pt-3 pt-md-5">
      <h1>Информация за доставка</h1>
      <div class="container h-100">
          <img src="../assets/delivery.png" alt="">
          <div class="col-12 col-md-8 mx-auto mt-4">
            <input type="text" placeholder="Your name" v-model="name">
            <input type="text" placeholder="Your address" v-model="address">
            <input type="text" placeholder="Your phone number" v-model="phone">
            <button class="addToCart-btn mt-3" @click="makeOrder"><span v-if="!loading">Поръчай</span> <img v-if="loading" src="../assets/rolling.gif" alt="rolling"></button>
          </div>
      </div>
      <Cart ref="c"/>
      <div v-if="modal" class="modal-wrapper">
        <div class="custom-modal">
            <img src="../assets/pizza.gif" alt="pizza">
            <h2 class="mb-0">Благодарим ти</h2>
            <br>
            <h6>Можеш да видиш прогреса на поръчката си</h6>
            <router-link to="/ordertrack" class="addToCart-btn d-flex align-items-center justify-content-center mx-auto btn-modal">Проследи</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import Cart from '../components/Cart'
import { fb } from '../firebase'
import axios from 'axios'

export default {
    data() {
        return {
            userUid: '',
            name: '',
            address: '',
            phone: '',
            timestamp: '',
            items: '',
            modal: false,
            loading: false,
        }
    },
    components: {
        Cart
    },
    created() {
        this.items = this.$store.state.order
    },
    computed: {
        cartTotal() {
            return this.$store.getters.cartTotalPrice;
        }
    },
    watch: {
        userUid() {
            this.info();
        }
    },
    methods: {
        async makeOrder() {
            // Get the time
            this.loading = true
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;

            let userID = this.userUid
            
            let userInfo = {name: this.name, address: this.address, phone: this.phone, order: this.items, time: this.timestamp, allsum: this.cartTotal}
            await this.$store.dispatch('placeOrder', {userInfo, userID})
            this.modal = true
            this.loading = false
        },
        async info() {
            let res = await axios.get(`https://pizza-5f900.firebaseio.com/users/user_${this.userUid}.json`)
            let user = res.data
            this.name = user.name
            this.address = user.address
            this.phone = user.phone
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

<style lang="scss" scoped>
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
}
.custom-modal {
    width: 40%;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 68px;
}
img {
    width: 70%;
    margin-top: 20px;
}
@media (min-width: 768px) {
    img {
        width: 40%;
    }
}
h1 {
    font-size: 20px;
}

input {
    width: 100%;
    margin-bottom: 15px;
    border: 0;
    height: 46px;
    border-radius: 30px;
    padding: 0 15px;
    font-size: 14px;
    box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
}

.addToCart-btn {
    margin-bottom: 15px;
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 30px;
    background: #10ca93;
    color: #fff;
    box-shadow: 0 6px 8px rgba(0,0,0,0.11); 
    &.btn-modal {
        margin-top: 20px;
        margin-bottom: 30px;
        width: 30%;
    }
    img {
        position: relative;
        top: -17px;
        width: 6%;
    }
    &:focus {
        outline: none;
    }
}

</style>