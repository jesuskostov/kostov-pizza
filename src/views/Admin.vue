<template>
  <div class="container">
      <div class="position-relative my-3">
        <div class="icon"></div>
        <button @click="addProduct = true" class="dashboard-btn">Създай нов продукт</button>
      </div>
      <div class="position-relative my-3">
        <div class="icon"></div>
        <router-link to="/admin-orders" class="dashboard-btn d-flex align-items-center justify-content-center">Виж всички поръчки</router-link>
      </div>
      <div v-if="addProduct" class="col-12 box">
        <h3 class="mb-4 text-left">Create new product</h3>
        <button class="photoBtn" @click="onPickFile">Upload image</button>
        <input type="file" style="display: none" ref="fileInput" @change="uploadPhoto" />
        <input
        type="text"
        class="form-control product-input mb-4"
        v-model="name"
        placeholder="Name"
        />
        <input
        type="text"
        class="form-control product-input mb-4"
        v-model="description"
        placeholder="Description"
        />
        <input
        type="number"
        class="form-control product-input mb-4"
        v-model="price"
        placeholder="Price"
        />
        <button class="addBtn" @click="submit()">Add</button>
      </div>
      <Cart />
  </div>
</template>

<script>
import { fb, productRef } from "../firebase";
import Cart from '../components/Cart'

export default {
  components: {
    Cart
  },
  data() {
    return {
      addProduct: false,  
      name: "",
      description: "",
      price: null,
      imageInput: null,
      image: "",
    };
  },
  methods: {
    submit() {
      productRef
        .push({
          name: this.name,
          description: this.description,
          price: this.price,
          image: this.image
        })
        .then(() => {
          this.name = "";
          this.description = "";
          this.price = "";
          this.$swal({
            icon: "success",
            title: `Successful created product`,
            showConfirmButton: false,
            timer: 3000
          });
        });
        this.addProduct = false
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    uploadPhoto(e) {
      let image = e.target.files[0];
      let storageRef = fb.storage().ref("products/" + image.name);
      let uploadImage = storageRef.put(image);
      uploadImage.on(
        "state_changed",
        () => {},
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          uploadImage.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  },
 
};
</script>

<style lang="scss" scoped>
.dashboard-btn {
    width: 100%;
    border:0;
    border-radius: 0;
    background-color: #3a7afe;
    color: #fff;
    height: 60px;
    padding-left: 20%;
}

.icon {
    position: absolute;
    left: 0;
    width: 20%;
    height: 100%;
    background-color: #10ca93;
}

.product-input {
    width: 100%;
    background-color:#d7dae3;
    height: 40px;
    color: #fff;

    &::placeholder {
        color: #000;
    }
}

.photoBtn {
    width: 100%;
    height: 50px;
    border-radius: 0;
    border:0;
    background-color: #3a7afe;
    color: #fff;
    margin-bottom: 30px;
}

.addBtn {
    width: 100%;
    background-color: #10ca93;
    border: 0;
    color: #fff;
    height: 50px;
}
</style>