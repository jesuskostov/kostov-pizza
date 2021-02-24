<template>
    <div class="product">
        <div v-if="!getIt" class="d-none">{{getIt}}</div>
            <div class="img">
                <img v-if="product" id="image" :src="product.image" class="mb-3" :class="{'size-s': s, 'size-m': m, 'size-l': l}" alt="">
            </div>
            <div class="col-md-6 d-flex justify-content-between info">
                <div class="mt-2">
                    <h3 v-if="product">{{product.name}}</h3>
                    <p v-if="product" class="description">{{product.description}}</p>
                </div>
                <div>
                    <p v-if="product" class="price mt-2">{{product.price}} лв.</p>
                </div>
            </div>
            <div class="col-12 col-md-6 optimization">
                <div class="sizes text-left">
                    <button @click="s = true; m = false; l = false" :class="{'active': s}">S</button>
                    <button @click="m = true; s = false; l = false" :class="{'active': m}">M</button>
                    <button @click="l = true; s = false; m = false" :class="{'active': l}">L</button>
                </div>
                <div class="d-flex align-items-center w-100 mt-5">
                    <button @click="willEmit" class="addToCart remove mr-4">Close</button>
                    <button @click="addToCart(product, id, product.price)" class="addToCart text-uppercase">Add to cart</button>
                </div>
            </div>
        <Cart />
    </div>
</template>

<script>
import Cart from '../components/Cart'
import {fb} from '../firebase'

export default {
    props: ['id'],
    components: {
        Cart
    },
    data() {
        return {
            test: false,
            height: null,
            s: false,
            m: false,
            l: true,
            userUid: ''
        }
    },
    computed: {
        product() {
            return this.$store.state.product
        },
        getIt() {
            return this.$store.dispatch('getProduct', this.id)
        }
    },
    created() {
        let deviceHeight = window.innerHeight
        let takeOf = 65
        this.height = (takeOf / 100) * deviceHeight
    },
    mounted() {

        fb.auth().onAuthStateChanged( user => {
        if (user) {
            // User is signed in.
            this.userUid = user.uid;
        //     let adminUid = user.uid
        //     let uid = 'DmoyCUeyF9ec04COlKQdcCnYsd23'
        //     if (adminUid == uid){
        //     this.isAdmin = true
        //     }
        // } else {
        //     // No user is signed in.
        //     console.log('User not logged');
        // }
            }
        })
    },
    methods: {
        touch() {
            console.log(123);
        },
        back() {
            this.$router.push('/')
        },
        addToCart(product, id, price) {
            let userID = this.userUid
            let item = {product, id, quantity: 1, price, userID}
            this.$store.dispatch('addToCart', item)
            this.$emit('willClose')
        },
        willEmit() {
            this.$emit('willClose')
        }
    }
}
</script>

<style lang="scss" scoped>
.bg {
    position: fixed;
    border: 1px solid red;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    z-index: 1;
}

.goBack {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: #ff9f00;
    border: 0;
    margin-right: 8px;
    font-size: 12px;
    color: #fff;
}

.product {
    width: 100%;
    position: absolute;
    bottom: 0;
    top: unset;
    height: 70%;
    background: #fff;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    z-index: 5;

    .img {
        // pointer-events: none;
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -35%;
        left: 50%;
        transform: translate(-50%, 0);

        img {
            width: 80%;
            animation: rotate 50s linear infinite;
            transition: 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            &.size-s {
                width: 75%;
            }

            &.size-m {
                width: 80%;
            }

            &.size-l {
                width: 90%;
            }
        }
    }
    
}


button:focus {
  outline: none;
  box-shadow: none;
}

.sizes {
    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 8px;
        border: 1px solid #ff9f00;
        margin-right: 8px;
        font-size: 12px;
        color: #000;
        background-color: transparent;

        &.active {
            background-color: #ff9f00;
            color: #fff;
        }

    }
}

.addToCart {
    width: 60%;
    height: 50px;
    border: 0;
    border-radius: 30px;
    background: #10ca93;
    color: #fff;
    box-shadow: 0 6px 8px rgba(0,0,0,0.11);
    
    &.remove {
        background-color: #ff9f00;
    }
}

.info {
    padding: 0 15px;
    width: 100%;
    text-align: left;
    margin-top: 30%;

    h3 {
        text-align: left;
    }

    .description{
        font-size: 16px;
        color: #a2a2a2;
    }

    .price {
        font-size: 22px;
    }
}


@media (min-width: 768px) {
  .product {
    position: fixed;
    background-color: rgba(0,0,0,0.11);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 0;
    .img {
        position: relative;
        top: 0;
        left: 0;
        flex-shrink: 0;
        transform: none;
        img {
            &.size-s {
                width: 100%;
            }

            &.size-m {
                width: 120%;
            }

            &.size-l {
                width: 130%;
            }
        }
        
    }
  }
  .info {
      margin: 0;
      flex: 0 0 10%;
        h3 {
            color: rgb(255, 255, 255);
            text-align: left;
        }

        .description{
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
        }

        .price {
            font-size: 22px;
            color: rgb(255, 255, 255);
        }
  }
  .optimization {
      flex: 0 0 30%;
  }
}

</style>