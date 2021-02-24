<template>
  <div class="row">
    <transition name="fade">
      <Loader v-if="isLoading" />
    </transition>
      <!-- BG -->
      <div class="bg" :class="{'show': productID}"></div>
      <!-- PRODUCTS -->
      <div class="col-12 mx-auto col-3 col-md-4" v-for="(product, i) in products" :key="i">
          <div v-if="!isLoading" class="box pizza-item d-flex flex-column flex-md-row py-0">
            <div class="img d-flex align-items-center justify-content-center" @click="viewProduct(i)">
                <img v-if="product.image" :src="product.image" alt="pizza">
            </div>
            <div class="d-flex flex-column">
              <div class="px-2 pt-1" @click="viewProduct(i)">
                <h3>{{product.name}}</h3>
                <p>{{product.description}}</p>
              </div>
              <div class="px-2 mt-auto">
                <p class="price">{{product.price}} лв</p>
              </div>
            </div>
            <button @click="viewProduct(i)" class="addToCart-btn view">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                  <g>
                    <path d="M509.188,247.27c-4.57-6.39-113.521-156.272-252.182-156.272C118.334,90.998,7.383,240.88,2.813,247.27
                      c-3.75,5.22-3.75,12.25,0,17.46c4.57,6.39,115.521,156.271,254.193,156.271c138.661,0,247.612-149.881,252.182-156.272
                      C512.938,259.52,512.938,252.489,509.188,247.27z M257.006,361c-57.891,0-107.001-47.11-107.001-105.001
                      s49.11-105.001,107.001-105.001s105.001,47.11,105.001,105.001S314.897,361,257.006,361z"/>
                  </g>
                  <g>
                    <path d="M257.006,210.999c-24.82,0-47,20.19-47,45c0,24.82,22.18,45,47,45c24.81,0,45-20.18,45-45
                      C302.006,231.189,281.816,210.999,257.006,210.999z"/>
                  </g>
                </g>

              </svg>
            </button>
            <button @click="addToCart(product, i, product.price)" class="addToCart-btn">+</button>
          </div>
      </div>
      <!-- VIEW PRODUCT -->
      <transition name="slide">
        <ViewProduct v-show="productID" :id="productID"  v-on:willClose="close()" />
      </transition>
  </div>
</template>
  
<script>
import Axios from 'axios'
import {fb} from '../firebase'
import Loader from '../components/Loader'
import ViewProduct from '../components/ViewProduct'

export default {
  name: 'HelloWorld',
  data() {
    return {
      productID: null,
      isLoading: true,
      products: [],
      userUid: ''
    }
  }, 
  components: {
    Loader,
    ViewProduct
  },
  created() {
    Axios.get('https://pizza-5f900.firebaseio.com/.json').then( res => {
      this.products = res.data.pizza
    }).then(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 1500)
    })
  },
  methods: {
    close() {
      console.log(123);
      this.productID = null
    },
    viewProduct(i) {
      this.productID = i
    },
    addToCart(product, id, price) {
      let userID = this.userUid
      let item = {product, id, quantity: 1, price, userID}
      this.$store.dispatch('addToCart', item)
    }
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
  }
}
</script>

<style lang="scss" scoped>
.close-btn {
  position: relative;
  z-index: 10;
}
.bg {
    pointer-events: none;  
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    z-index: 1;
    opacity: 0;
    transition: 1s;

    &.show {
      pointer-events: unset;
      opacity: 0.6;
      transition: 1s;
    }
}

.slide-enter-active, .slide-leave-active {
transition: margin-bottom .8s ease-out;
}

/*
you set the css property before transition starts
*/
.slide-enter {
  margin-bottom: -300px;
}

.slide-leave-to {
  margin-bottom: -50vh;
}
/*
you set the css property it will be when transition ends
*/
.slide-enter-to, .slide-leave {
  margin-bottom: 0px;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.addToCart-btn {
  width: 40px;
  height: 40px;
  background-color: #3a7afe;
  border: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  border-top-left-radius: 200px;
  color: #fff;  

  &.view {
    top: 0;
    right: 0;
    bottom: unset;
    border-top-left-radius: 0;
    border-bottom-left-radius: 200px;
    background-color: #10ca93;

    svg {
      width: 18px;
      height: 18px;
      position: relative;
      top: -5px;
      left: -2px;
      fill: #fff;
    }

  }
}

.pizza-item {
  height: 125px;
  text-align: left;
  box-shadow: 0 6px 8px rgba(0,0,0,0.11);
  margin-bottom: 20px;
  
  h3 {
    padding-top: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 3px;
  }

  p {
    margin-bottom: 0;
    font-size: 12px;
    color: #9c9999;

    &.price {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 600;
      color: #ff9f00;
    }
  }
  
  .img {
    position: relative;
    width: 40%;
    overflow: hidden;

      img {
        width: 85%;
        height: 85%;
        object-fit: contain;
      }
  }
}


@media (min-width: 768px) {
  .pizza-item {
    height: 100%;
    .img {
        width: 50%;
      img {
        width: 80%;
        height: auto;
      }
    }
  }
}
</style>