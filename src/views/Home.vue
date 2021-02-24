<template>
  <div class="home">
    <div class="container pt-3 pt-md-5">
      <Products />
      <Cart />
      <Coupon />
    </div>
  </div>
</template>

<script>
// import { fb } from '../firebase'
import Products from '../components/Products'
import Cart from '../components/Cart'
import Coupon from '../components/Coupon.vue'


export default {
  components: {
    Products,
    Cart,
    Coupon
  },
}
</script>
