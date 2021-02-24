<template>
    <div class="coupon-container">
        <div v-for="(coupon, i) in coupons" :key="i" class="coupon">
            <div class="img">
                <img src="../assets/coupon.gif" alt="coupon">
            </div>
            <div>
                <p>Здравей <b>{{name}}</b></p>
                <p>Ти получи купон за <b>5%</b> отстъпка: <b style="color: #10ca93">{{coupon.coupon}}</b></p>
            </div>
        </div>
    </div>
</template>

<script>
import { fb } from '../firebase'
import axios from 'axios'

export default {
    name: 'Coupon',
    data() {
        return {
            userUid: '',
            coupons: [],
            name: ''
        }
    },
    mounted() {
        fb.auth().onAuthStateChanged( user => {
            if (user) {
                this.userUid = user.uid;
                this.getInfo()
            }
        })
    },
    methods: {
        async getInfo() {
            let res = await axios.get(`https://pizza-5f900.firebaseio.com/users/user_${this.userUid}/.json`)
            this.coupons = res.data.coupon
            this.name = res.data.name
        }
    }
}   
</script>

<style lang="scss" scoped>
.coupon-container {
    position: fixed;
    bottom: 0;
    left: 30px;
    z-index: 9999999999;
}

.img {
    text-align: center;
    flex-basis: 20%;
    img {
        width: 60%;
    }
}

.coupon {
    display: flex;
    padding: 10px;
    padding-left: 0;
    margin-bottom: 20px;
    text-align: left;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.11);
    overflow: hidden;
    width: 80%;
    min-height: 90px;
    align-items: center;

    p {
        margin: 0;
        font-size: 15px;
    }
}

</style>