<template>
  <div>
       <div class="container pt-3">
        <div v-for="(order, i) in orders" :key="i" class="col-12 col-md-5 mx-auto">
            <div v-for="(item, i2) in order" :key="i2" class="box order text-left px-3">
                <h3>Поръчка</h3>
                <div class="mt-4">
                    <h4>Дата: <span>{{item.time}}</span></h4>
                    <h4>Име: <span>{{item.name}}</span></h4>
                    <h4>Адрес: <span>{{item.address}}</span></h4>
                    <h4>Телефон: <span>{{item.phone}}</span></h4>
                    <h4>Прогрес: <span v-if="item.progress" :class="{'accepted': item.progress == 'Изпратена'}">{{item.progress}}</span><span v-else class="orange">Чакаща потвърждение</span></h4>
                    <h4>Прихов: <span>{{item.allsum}} лв</span></h4>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <button class="decline" @click="decline(item, i)">Откажи</button>
                    <button @click="accept(item, i, i2)">Изпрати</button>
                </div>
            </div>
        </div>
      </div>
      <Cart />
  </div>
</template>

<script>
import Cart from '../components/Cart'

export default {
    components: {
        Cart
    },
    computed: {
        orders() {
            return this.$store.state.allOrders
        },
    },
    mounted() {
        this.$store.dispatch('allOrders')

    }, 
    methods: {
        accept(order, userID, orderID) {
            this.$store.dispatch('accept', {order, userID, orderID})
        }
    },
}
</script>

<style lang="scss" scoped>
.order {
    min-height: 280px;

    h3 {
        text-align: center;
        font-size: 22px;
    }

    h4 {
        font-weight: bold;
        font-size: 14px;

        span {
            padding-left: 10px;
            font-weight: 500;
        }
    }
}

.accepted {
    color:#10ca93;
}

.orange {
    color:#ff9f00;
}

button {
    color: #fff;
    width: 120px;
    height: 40px;
    border-radius: 99999px;
    border: 0;
    background-color: #10ca93;
    box-shadow: 0 6px 8px rgba(0,0,0,0.11);

    &.decline {
        background-color: #ff9f00;
    }
}
</style>