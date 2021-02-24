<template>
    <div>
      <div class="loader"><img src="../assets/loader.gif" alt=""></div>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 60px;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20000;

    img {
      width: 30%;
    }
}
@media (min-width: 768px) {
  .loader {
    img {
      width: 5%;
    }
  }
}
</style>