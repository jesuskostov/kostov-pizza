import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Axios)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    product: null,
    order: [],
    currentOrder: '',
    allOrders: '',
    discount: 0,
    // accepted: []
  },
  getters: {
    // Cart item count
    cartItemCount: (state) => {
      return state.cart.length
    },

    // Cart total price
    cartTotalPrice: (state) => {

      let total = 0;

      state.cart.forEach(item => {
        total += item.product.price * item.quantity
      })

      return (total - (total * state.discount/100)).toFixed(2);
    }
  },
  mutations: {

    GET_PRODUCT: (state, product) => {
      state.product = product
    },

    QUANTITY_PLUS: (state, {id}) => {
      if (state.cart) {
        Object.values(state.cart).find( item => {
          if (item.id == id) {
            item.quantity++
          }
        })
      }
    },

    QUANTITY_MINUS: (state, {id}) => {
      if (state.cart) {
        Object.values(state.cart).find( item => {
          if (item.id == id && item.quantity > 1) {
            item.quantity--
          }
        })
      }
    },

    GET_CART_PRODUCT: (state, response) => {
      state.cart = response
    },

    ADD_TO_CART: (state, {product, id, quantity}) => {
      if (state.cart) {
        let producInCart = state.cart.find( item => {
          return item.id == id || item.product.id == id
        })
        if (producInCart) {
          producInCart.quantity += quantity
          return
        }
      }
      state.cart.push({
        id, product, quantity
      })
    },

    DELETE_FROM_CART: (state, item) => {
      if (state.cart) {
        let index = state.cart.indexOf(item)
        state.cart.splice(index, 1)
      }
    },

    SET_ORDER: (state, items) => {
      state.order = items
    },

    TRACK_ORDER: (state, order) => {
      state.currentOrder = order
    },

    ALL_ORDERS: (state, orders) => {
      state.allOrders = orders
    },

    GET_ORDER: (state, userInfo) => {
      state.currentOrder = userInfo
      state.cart = []
    },

    TO_ACCEPTED: (state, {order, userID, orderID}) => {
      Object.keys(state.allOrders).map( item => {
        if ( item == userID) {
          state.allOrders[userID][orderID] = {
            name: order.name, 
            address: order.address, 
            phone: order.phone, 
            time: order.time, 
            order: order.order, 
            allsum: order.allsum,
            progress: 'Изпратена'      
          }
        }
      })
    },

    DISCOUNT: (state,) => {
      state.discount += 5
    }
  },
  actions: {
    coupon: async ({commit}, {coupon, userID}) => {
      let res = await Axios.get(`https://pizza-5f900.firebaseio.com/users/user_${userID}/coupon.json`)
      let key = []
      Object.values(res.data).map( data => {
        if (data.coupon == coupon) {
          key.push(coupon)
        }
      })
      Object.keys(res.data).map( i => {
        if (res.data[i].coupon == key[0]) {
          Axios.delete(`https://pizza-5f900.firebaseio.com/users/user_${userID}/coupon/${i}.json`)
          commit('DISCOUNT')
        }
      })
    },
    addToCart: ({commit}, {product, id, quantity, price, userID}) => {
      // Combine ID and Product
      commit('ADD_TO_CART', {product, id, quantity, price})

      Axios.get(`https://pizza-5f900.firebaseio.com/cart_${userID}.json`).then( res => {
        if (res.data) { 
            let matchID = Object.keys(res.data)
              matchID.map( i => {
                if (i == id) {
                  Axios.get(`https://pizza-5f900.firebaseio.com/cart_${userID}/${i}.json`).then( inc => {
                    let increase = inc.data.quantity + 1
                    price = inc.data.product.price * increase
                    Axios.put(`https://pizza-5f900.firebaseio.com/cart_${userID}/${i}.json`, {product, quantity: increase, price})
                  })
                } else {
                  Axios.put(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`, {product, quantity, price})
                }
              })
          } else {
            Axios.put(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`, {product, quantity, price})
          }
      })
    },
    getCartProduct: ({commit}, userID) => {
      Axios.get(`https://pizza-5f900.firebaseio.com/cart_${userID}.json`).then( res => {
        if (res.data) {
          let test = Object.entries(res.data)
          test.map( t => {
            let id = t[0]
            Object.assign(t[1], {id})
          })
          commit('GET_CART_PRODUCT', Object.values(res.data))
        }
      })
    },
    addMore: ({commit}, {id, quantity, product, price, userID}) => {
      console.log(quantity);
      commit('QUANTITY_PLUS', {id})
      Axios.get(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`).then( res => {
        let plus = res.data.quantity + 1
        Axios.put(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`, {quantity: plus, product, price})
      })
    },
    lessItem: ({commit}, {id, quantity, product, price, userID}) => {
      console.log(quantity);
      commit('QUANTITY_MINUS', {id})
      Axios.get(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`).then( res => {
        if (res.data.quantity > 1) {
          let minus = res.data.quantity - 1
          Axios.put(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`, {quantity: minus, product, price})
        }
      })
    },
    deleteFromCart: ({commit}, {item, id, userID}) => {
      commit('DELETE_FROM_CART', item)
      Axios.delete(`https://pizza-5f900.firebaseio.com/cart_${userID}/${id}.json`)
    },

    getProduct: ({commit}, id) => {
      Axios.get(`https://pizza-5f900.firebaseio.com/pizza/${id}.json`).then( res => {
        commit('GET_PRODUCT', res.data)
      })
    },

    order: ({commit}, items) => {
      commit('SET_ORDER', items)
    },

    placeOrder: async ({commit}, {userInfo, userID}) => {
      await Axios.post(`https://pizza-5f900.firebaseio.com/dashboard/user_${userID}.json`, userInfo)
      await Axios.delete(`https://pizza-5f900.firebaseio.com/cart_${userID}.json`)
      commit('GET_ORDER', userInfo)
      if (userInfo.allsum > 8) {
        let coupon = Math.random().toString(36).slice(2);
        await Axios.post(`https://pizza-5f900.firebaseio.com/users/user_${userID}/coupon/.json`, {coupon})
      } 
    },

    getOrder: ({commit}, userID) => {
      Axios.get(`https://pizza-5f900.firebaseio.com/dashboard/user_${userID}.json`).then( res => {
        commit('TRACK_ORDER', res.data)
      })
    },

    allOrders: ({commit}) => {
      Axios.get(`https://pizza-5f900.firebaseio.com/dashboard/.json`).then( res => {
        commit('ALL_ORDERS', res.data)
      })
    },

    accept: ({commit}, {order, userID, orderID}) => {
      commit('TO_ACCEPTED', {order, userID, orderID})
      Axios.get(`https://pizza-5f900.firebaseio.com/dashboard/${userID}.json`).then( res => {
        if (res.data) {
          //  
          Axios.put(`https://pizza-5f900.firebaseio.com/dashboard/${userID}/${orderID}.json`, {
            name: order.name, 
            address: order.address, 
            phone: order.phone, 
            time: order.time, 
            order: order.order, 
            allsum: order.allsum,
            progress: 'Изпратена'
          })
        } else {
          //
          console.log(22);
        }
      })
    }
  },
  modules: {
  }
})
