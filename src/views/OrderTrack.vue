<template>
  <div>
      <!-- {{order}} -->
      <div class="container pt-3">
            <div v-if="order" class="row">
                <div v-for="(item, i) in order" :key="i" class="col-12 col-md-6">
                    <div class="box order text-left px-3">
                        <h3>Поръчка</h3>
                        <div class="mt-4">
                            <h4>Дата:<span>{{item.time}}</span></h4>
                            <h4>Име:<span>{{item.name}}</span></h4>
                            <h4>Адрес:<span>{{item.address}}</span></h4>
                            <h4>Прогрес:<span v-if="item.progress" :class="{'accepted': item.progress == 'Изпратена'}">{{item.progress}}</span><span v-else class="orange">В процес</span></h4>
                            <h4>Телефон:<span>{{item.phone}}</span></h4>
                            <h4>Обща сума:<span>{{item.allsum}} лв</span></h4>
                        </div>
                        <div v-if="item.progress == 'Изпратена'" class="d-flex justify-content-around mt-4">
                            <button class="decline">Отказах</button>
                            <button>Приех</button>
                        </div>
                    </div>
                </div>
          </div>
      </div>
      <Cart />
  </div>
</template>

<script>
import { fb } from '../firebase'
import Cart from '../components/Cart'

export default {
    data() {
        return {
            userUid: ''
        }
    },
    components: {
        Cart
    },
    computed: {
        order() {
            return this.$store.state.currentOrder
        }
    },
    async mounted() {
        fb.auth().onAuthStateChanged( async user => {
            if (user) {
                this.userUid = user.uid;
                let userID = await this.userUid
                this.$store.dispatch('getOrder', userID)
            }
        })
        
    },
}
</script>

<style lang="scss" scoped>
.order {

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