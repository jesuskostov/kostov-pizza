<template>
    <div class="container">
        <h1>Profile</h1>
        <div class="row mt-5">
            <div class="col-md-8 mx-auto">
                <div class="d-flex align-items-center justify-content-center flex-column">
                    <input type="text" v-model="name">
                    <input type="text" v-model="address">
                    <input type="text" v-model="phone">
                    <button class="save-btn" :class="{'disable': disable}" @click="save">Запази промените</button>
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
            user: '',
            name: '',
            address: '',
            phone: '',
            currentName: '',
            currentAddress: '',
            currentPhone: '',
            disable: true,
        }
    },
    watch: {
        userUid() {
            this.info()
        },
        name() {
            this.check()
        },
        address() {
            this.check()
        },
        phone() {
            this.check()
            
        }
    },
    methods: {
        check() {
            if (this.currentName != this.name || this.currentAddress != this.address || this.currentPhone != this.phone) {
                this.disable = false
            } else {
                this.disable = true
            }
        },
        async save() {
            await axios.put(`https://pizza-5f900.firebaseio.com/users/user_${this.userUid}/user_info/.json`, {
                name: this.name,
                address: this.address,
                phone: this.phone
            })
            await this.info()
            this.disable = true
        },
        async info() {
            let res = await axios.get(`https://pizza-5f900.firebaseio.com/users/user_${this.userUid}/user_info.json`)
            let user = res.data
            this.name = user.name
            this.address = user.address
            this.phone = user.phone

            this.currentName = user.name
            this.currentAddress = user.address
            this.currentPhone = user.phone
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

.save-btn {
    background-color: #10ca93;
    border: 0;
    padding: 5px 12px;
    color: #fff;
    &.disable {
        pointer-events: none;
        opacity: 0.4;
    }
}

input {
    width: 70%;
    border-radius: 6px;
    border: 0;
    background-color: #fff;
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    &:last-child {
        margin-bottom: 0;
    }
    &:focus {
        outline: none;
    }
}
</style>