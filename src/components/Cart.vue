<template>
    <div>
        <!-- CART -->
        <div class="cart" :class="{'show': show}">
            <div v-if="cart.length != 0" class="container">
                <p class="swipe-txt text-left">Swipe left on any product you want for removing it from the cart.</p>
            </div>
             <div v-if="cart.length != 0" class="custom-shadow">
                <div class="container inner pt-3 pb-4" :style="{'max-height': height + 'px'}">
                    <div class="row">
                        <div v-for="(item, i) in cart" :key="i" class="col-12 col-md-4">
                            <div class="box d-flex flex-row flex-md-row py-0 item" v-touch:swipe.left="swipeLeft(item, item.id)">
                                <div class="img d-flex align-items-center justify-content-center">
                                    <img :src="item.product.image" alt="">
                                </div>
                                <div class="position-relative ml-2 py-2 d-flex flex-column flex-grow-1">
                                    <div class="px-2 pt-1">
                                        <h4>{{item.product.name}}</h4>
                                        <p>{{item.product.description}}</p>
                                    </div>
                                    <div class="px-2 pt-1 text-left mt-auto">
                                        <h6>{{item.quantity}} бр. x {{item.product.price}} лв.</h6>
                                        <button @click="addMore(item.id, item.quantity, item.product, item.product.price)" class="addMore-btn d-flex align-items-center justify-content-center">+</button>
                                        <button @click="lessBtn(item.id, item.quantity, item.product, item.product.price)" class="addMore-btn less d-flex align-items-center justify-content-center">-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="cart-actions mt-5">
                    <div v-if="cart.length != 0"  class="col-12">
                        <p>Сума: <span class="colored">{{setPrice}} лв</span></p>
                        <p>Отстъпка: <span class="colored">{{discount}}%</span></p>
                        <p>Обща сума за плащане: <span class="colored">{{cartTotalPrice}} лв</span></p>
                    </div>
                    <div class="col-11 col-md-8 mx-auto text-center mt-5">
                        <div v-if="cart.length != 0" class="d-flex mb-4">
                            <input type="text" class="coupon-input" v-model="coupon" placeholder="Въведете вашият купон">
                            <button class="mb-0" style="background-color: #ff9f00" @click="applyButton">Приложи</button>
                        </div>
                        <button v-if="cart.length != 0"  @click="order">Поръчай</button>
                        <img class="empty-pizza mb-5" v-if="cart.length == 0" src="../assets/pizza-cart.png" alt="">
                        <button class="back" @click="show = false" >Продължи с пазаруването</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- NAVBAR -->
        <div class="custom-navbar d-flex align-items-center justify-content-between flex-row flex-md-column px-2">
            <router-link to="/" class="nav-btn">
                <svg class="pizza" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m233.107 344.762c0 12.623 10.27 22.892 22.893 22.892s22.893-10.27 22.893-22.892-10.27-22.892-22.893-22.892-22.893 10.27-22.893 22.892zm30.786 0c0 4.352-3.541 7.892-7.893 7.892s-7.893-3.54-7.893-7.892 3.541-7.892 7.893-7.892 7.893 3.54 7.893 7.892z"/>
                            <path d="m437.02 74.981c-48.352-48.352-112.64-74.981-181.02-74.981s-132.668 26.629-181.02 74.981c-48.351 48.352-74.98 112.639-74.98 181.019s26.629 132.667 74.98 181.02c48.352 48.351 112.64 74.98 181.02 74.98s132.668-26.628 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.019zm-10.607 351.432c-45.518 45.518-106.039 70.587-170.413 70.587s-124.895-25.068-170.413-70.587c-45.519-45.519-70.587-106.04-70.587-170.413s25.068-124.894 70.587-170.413c45.518-45.518 106.039-70.587 170.413-70.587s124.895 25.068 170.413 70.587c45.519 45.519 70.587 106.039 70.587 170.413s-25.068 124.894-70.587 170.413z"/>
                            <path d="m448.327 144.959c-19.463-33.713-47.572-61.822-81.287-81.287-33.713-19.464-72.11-29.753-111.04-29.753s-77.327 10.289-111.04 29.753c-33.715 19.465-61.824 47.574-81.287 81.287-19.465 33.715-29.754 72.112-29.754 111.041s10.289 77.326 29.754 111.041c19.463 33.713 47.571 61.822 81.287 81.287 33.713 19.465 72.11 29.753 111.04 29.753s77.327-10.289 111.04-29.753c33.716-19.465 61.824-47.574 81.287-81.287 19.465-33.714 29.754-72.111 29.754-111.041 0-38.929-10.289-77.326-29.754-111.041zm-192.327-96.04c33.797 0 67.165 8.317 96.977 24.112l-96.977 167.969-96.977-167.969c29.812-15.795 63.18-24.112 96.977-24.112zm-179.337 310.621c-16.899-29.269-26.37-62.325-27.597-96.04h92.002c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-92.012c1.228-33.715 10.709-66.771 27.607-96.04 16.897-29.268 40.784-54.007 69.37-71.928l96.977 167.968h-71.942c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h71.942l-96.972 167.96c-28.587-17.921-52.478-42.651-69.375-71.92zm179.337 103.541c-33.797 0-67.165-8.317-96.977-24.112l96.977-167.969 96.977 167.969c-29.812 15.795-63.18 24.112-96.977 24.112zm179.337-103.541c-16.897 29.269-40.788 53.998-69.375 71.92l-96.972-167.96h94.505c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-94.505l96.977-167.969c28.586 17.922 52.473 42.661 69.37 71.928 16.898 29.27 26.38 62.326 27.607 96.04h-69.449c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h69.439c-1.227 33.717-10.698 66.772-27.597 96.041z"/>
                            <path d="m107.339 170.059c-18.46 0-33.478 15.018-33.478 33.478s15.018 33.478 33.478 33.478 33.479-15.018 33.479-33.478-15.019-33.478-33.479-33.478zm0 51.957c-10.188 0-18.478-8.289-18.478-18.478s8.289-18.478 18.478-18.478 18.479 8.289 18.479 18.478c-.001 10.189-8.29 18.478-18.479 18.478z"/>
                            <path d="m379.444 326.676c-18.46 0-33.478 15.018-33.478 33.478s15.018 33.478 33.478 33.478 33.479-15.018 33.479-33.478-15.019-33.478-33.479-33.478zm0 51.956c-10.188 0-18.478-8.289-18.478-18.478s8.289-18.478 18.478-18.478 18.479 8.289 18.479 18.478-8.289 18.478-18.479 18.478z"/>
                            <path d="m412.923 151.931c0-18.46-15.019-33.478-33.479-33.478s-33.478 15.018-33.478 33.478 15.018 33.478 33.478 33.478 33.479-15.018 33.479-33.478zm-51.956 0c0-10.189 8.289-18.478 18.478-18.478s18.479 8.289 18.479 18.478-8.289 18.478-18.479 18.478c-10.189 0-18.478-8.289-18.478-18.478z"/>
                            <path d="m156.653 212.4c0 12.623 10.27 22.892 22.892 22.892 12.623 0 22.893-10.27 22.893-22.892 0-12.623-10.27-22.892-22.893-22.892-12.622 0-22.892 10.269-22.892 22.892zm22.892-7.892c4.352 0 7.893 3.54 7.893 7.892s-3.541 7.892-7.893 7.892-7.892-3.54-7.892-7.892 3.54-7.892 7.892-7.892z"/>
                            <path d="m119.646 307.203c0-12.622-10.27-22.892-22.893-22.892-12.622 0-22.892 10.27-22.892 22.892 0 12.623 10.27 22.892 22.892 22.892 12.623.001 22.893-10.269 22.893-22.892zm-22.893 7.893c-4.352 0-7.892-3.54-7.892-7.892s3.54-7.892 7.892-7.892 7.893 3.541 7.893 7.892-3.542 7.892-7.893 7.892z"/>
                            <path d="m225.216 391.36c-12.623 0-22.893 10.27-22.893 22.892 0 12.623 10.27 22.892 22.893 22.892 12.622 0 22.892-10.27 22.892-22.892-.001-12.622-10.27-22.892-22.892-22.892zm0 30.784c-4.352 0-7.893-3.54-7.893-7.892s3.541-7.892 7.893-7.892 7.892 3.54 7.892 7.892c-.001 4.352-3.541 7.892-7.892 7.892z"/>
                            <path d="m238.186 95.056c0-12.623-10.27-22.892-22.893-22.892s-22.893 10.27-22.893 22.892 10.27 22.892 22.893 22.892 22.893-10.269 22.893-22.892zm-22.893 7.892c-4.352 0-7.893-3.54-7.893-7.892s3.541-7.892 7.893-7.892 7.893 3.541 7.893 7.892-3.541 7.892-7.893 7.892z"/>
                            <path d="m397.983 213.111c0 12.623 10.27 22.892 22.893 22.892 12.622 0 22.892-10.27 22.892-22.892 0-12.623-10.27-22.892-22.892-22.892-12.623 0-22.893 10.27-22.893 22.892zm22.893-7.892c4.352 0 7.892 3.541 7.892 7.892 0 4.352-3.54 7.892-7.892 7.892s-7.893-3.54-7.893-7.892c0-4.351 3.541-7.892 7.893-7.892z"/>
                            <path d="m419.876 278.226c-12.623 0-22.893 10.27-22.893 22.892s10.27 22.892 22.893 22.892c12.622 0 22.892-10.27 22.892-22.892s-10.27-22.892-22.892-22.892zm0 30.784c-4.352 0-7.893-3.541-7.893-7.892 0-4.352 3.541-7.892 7.893-7.892s7.892 3.54 7.892 7.892-3.54 7.892-7.892 7.892z"/>
                            <path d="m283.059 152.964c0-14.92-12.139-27.058-27.059-27.058s-27.059 12.138-27.059 27.058 12.139 27.058 27.059 27.058 27.059-12.138 27.059-27.058zm-39.118 0c0-6.649 5.409-12.058 12.059-12.058 6.649 0 12.059 5.409 12.059 12.058s-5.409 12.058-12.059 12.058c-6.649 0-12.059-5.409-12.059-12.058z"/><path d="m171.067 334.262c14.92 0 27.059-12.138 27.059-27.058s-12.139-27.058-27.059-27.058-27.058 12.138-27.058 27.058c.001 14.919 12.139 27.058 27.058 27.058zm0-39.117c6.649 0 12.059 5.409 12.059 12.058s-5.409 12.058-12.059 12.058c-6.648 0-12.058-5.409-12.058-12.058s5.41-12.058 12.058-12.058z"/><path d="m302.789 125.574c.568.094 1.137.139 1.701.139 4.022 0 7.813-2.314 9.591-6.014 3.146-6.547 9.72-23.211 2.803-36.505v-.001c-6.919-13.296-24.337-17.476-31.505-18.656-4.617-.76-9.264 1.655-11.291 5.875-3.146 6.547-9.72 23.211-2.803 36.505 6.917 13.297 24.336 17.477 31.504 18.657zm-16.542-45.581c7.124 1.653 14.653 4.979 17.33 10.124 2.677 5.144 1.079 13.219-1.655 20.002-7.124-1.653-14.653-4.979-17.33-10.124-2.677-5.144-1.079-13.22 1.655-20.002z"/><path d="m371.198 304.668c2.905-3.671 3.045-8.903.339-12.723-4.198-5.928-15.581-19.759-30.564-20.159 0 0 0 0 0-.001-15.013-.395-27.087 12.804-31.597 18.501-2.906 3.672-3.045 8.904-.339 12.722 4.198 5.928 15.58 19.76 30.564 20.16.223.006.445.009.667.009 14.673.001 26.488-12.897 30.93-18.509zm-30.93 3.51c-.089 0-.178-.001-.266-.004-5.797-.154-12.083-5.468-16.688-11.15 4.9-5.427 11.44-10.412 17.259-10.243 5.797.155 12.084 5.469 16.688 11.15-4.826 5.345-11.263 10.247-16.993 10.247z"/><path d="m268.123 388.375c-2.645 6.766-7.945 23.876-.047 36.614 7.898 12.737 25.582 15.595 32.819 16.232.307.027.612.04.917.04 4.318 0 8.305-2.674 9.9-6.749 2.645-6.766 7.945-23.876.047-36.613s-25.583-15.595-32.817-16.231c-4.672-.414-9.115 2.347-10.819 6.707zm12.846 8.639c7.228 1.112 14.986 3.862 18.043 8.79 3.057 4.929 2.071 13.103-.145 20.07-7.228-1.112-14.987-3.862-18.043-8.79s-2.072-13.1.145-20.07z"/><path d="m155.112 386.359c2.645-6.766 7.945-23.877.047-36.613-7.899-12.738-25.583-15.595-32.82-16.232-4.656-.409-9.112 2.349-10.816 6.708-2.646 6.766-7.945 23.876-.047 36.613s25.582 15.595 32.816 16.231c.309.027.615.041.921.041 4.318.001 8.304-2.673 9.899-6.748zm-12.845-8.638c-7.228-1.111-14.986-3.862-18.043-8.79s-2.071-13.1.146-20.07c7.228 1.112 14.985 3.862 18.042 8.791 3.056 4.928 2.07 13.101-.145 20.069z"/><path d="m164.645 173.739c4.665-.398 8.572-3.881 9.502-8.469 1.442-7.12 3.72-24.889-6.25-36.075-9.973-11.189-27.884-10.963-35.12-10.346-4.666.397-8.574 3.88-9.504 8.469-1.442 7.12-3.72 24.888 6.25 36.076 7.94 8.91 20.916 10.581 29.527 10.581 2.203-.001 4.121-.11 5.595-.236zm-23.923-20.326c-3.858-4.329-4.294-12.55-3.309-19.796 7.286-.143 15.426 1.227 19.284 5.557h.001c3.857 4.328 4.293 12.549 3.308 19.795-7.293.147-15.426-1.226-19.284-5.556z"/><path d="m341.958 188.014c-14.635-3.228-29.021 7.447-34.527 12.186-3.548 3.055-4.675 8.166-2.74 12.429 3 6.616 11.559 22.351 26.196 25.579 1.87.413 3.734.598 5.579.598 12.587 0 24.146-8.65 28.949-12.785 3.545-3.054 4.672-8.164 2.739-12.428-3.001-6.616-11.561-22.351-26.196-25.579zm-7.841 35.546c-5.664-1.249-10.831-7.656-14.276-14.106 5.841-4.403 13.221-8.039 18.887-6.792 5.663 1.249 10.831 7.658 14.276 14.107-5.839 4.401-13.224 8.041-18.887 6.791z"/>
                        </g>
                </svg>
            </router-link>
            <router-link to="/ordertrack" class="nav-btn">
                <svg class="tracking" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >
                    <g>
                        <path d="M61.707,34.293,49.293,21.879A2.978,2.978,0,0,0,47.171,21H30v2h5V38h2V23H47.171a1,1,0,0,1,.708.293L49.586,25H45a2,2,0,0,0-2,2v9a2,2,0,0,0,2,2H60v8a1,1,0,0,1-1,1H56.92a6.991,6.991,0,0,0-13.84,0H28.92a6.991,6.991,0,0,0-13.84,0H13a1,1,0,0,1-1-1V37H10v9a3,3,0,0,0,3,3h2.08a6.978,6.978,0,0,0,2.031,4H2v2H50a7.006,7.006,0,0,0,6.92-6H59a3,3,0,0,0,3-3V35A1,1,0,0,0,61.707,34.293ZM17,48a5,5,0,1,1,5,5A5.006,5.006,0,0,1,17,48Zm9.889,5a6.978,6.978,0,0,0,2.031-4H43.08a6.978,6.978,0,0,0,2.031,4ZM50,53a5,5,0,1,1,5-5A5.006,5.006,0,0,1,50,53ZM45,36V27h6.586L60,35.414V36Z"/>
                        <rect x="21" y="47" width="2" height="2"/>
                        <rect x="49" y="47" width="2" height="2"/>
                        <rect x="2" y="44" width="5" height="2"/>
                        <rect x="4" y="40" width="3" height="2"/>
                        <rect x="5" y="36" width="2" height="2"/>
                        <path d="M15,35A13,13,0,1,0,2,22,13.015,13.015,0,0,0,15,35Zm0-24A11,11,0,1,1,4,22,11.013,11.013,0,0,1,15,11Z"/>
                        <path d="M15,31a1,1,0,0,0,.707-.293C16.351,30.063,22,24.29,22,20A7,7,0,0,0,8,20c0,4.29,5.649,10.063,6.293,10.707A1,1,0,0,0,15,31Zm0-16a5.006,5.006,0,0,1,5,5c0,2.566-3.147,6.531-5,8.551-1.853-2.02-5-5.985-5-8.551A5.006,5.006,0,0,1,15,15Z"/>
                        <path d="M18,20a3,3,0,1,0-3,3A3,3,0,0,0,18,20Zm-4,0a1,1,0,1,1,1,1A1,1,0,0,1,14,20Z"/>
                        <rect x="40" y="40" width="4" height="2"/>
                    </g>
                </svg>
            </router-link>
            <button class="nav-btn center cartBtn" @click="showCart" :class="{'animate': animate}">
                <span class="count">{{cartItemCount}}</span>
                <svg enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m504.399 185.065c-6.761-8.482-16.904-13.348-27.83-13.348h-98.604l-53.469-122.433c-3.315-7.591-12.157-11.06-19.749-7.743-7.592 3.315-11.059 12.158-7.743 19.75l48.225 110.427h-178.458l48.225-110.427c3.315-7.592-.151-16.434-7.743-19.75-7.591-3.317-16.434.15-19.749 7.743l-53.469 122.434h-98.604c-10.926 0-21.069 4.865-27.83 13.348-6.637 8.328-9.086 19.034-6.719 29.376l52.657 230c3.677 16.06 17.884 27.276 34.549 27.276h335.824c16.665 0 30.872-11.216 34.549-27.276l52.657-230.001c2.367-10.342-.082-21.048-6.719-29.376zm-80.487 256.652h-335.824c-2.547 0-4.778-1.67-5.305-3.972l-52.657-229.998c-.413-1.805.28-3.163.936-3.984.608-.764 1.985-2.045 4.369-2.045h85.503l-3.929 8.997c-3.315 7.592.151 16.434 7.743 19.75 1.954.854 3.99 1.258 5.995 1.258 5.782 0 11.292-3.363 13.754-9l9.173-21.003h204.662l9.173 21.003c2.462 5.638 7.972 9 13.754 9 2.004 0 4.041-.404 5.995-1.258 7.592-3.315 11.059-12.158 7.743-19.75l-3.929-8.997h85.503c2.384 0 3.761 1.281 4.369 2.045.655.822 1.349 2.18.936 3.983l-52.657 230c-.528 2.301-2.76 3.971-5.307 3.971z"/><path d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z"/><path d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z"/><path d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z"/>
                </svg>
            </button>
            <router-link to="/profile" class="nav-btn">TT</router-link>
            <button class="nav-btn" @click="logOut">
                <svg class="logout" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g>
                            <path d="M505.664,243.739l-54.783-38.622c-9.926-6.997-23.645,0.128-23.645,12.26v23.622H164.196
                                c-8.284,0-15.001,6.716-15.001,15.001S155.912,271,164.196,271h263.038v23.621c0,12.212,13.792,19.204,23.644,12.26l54.783-38.622
                                C514.027,262.365,514.196,249.767,505.664,243.739z"/>
                        </g>
                        <g>
                            <path d="M430.471,352.317c-7.169-4.146-16.347-1.698-20.496,5.474c-35.236,60.916-101.103,101.811-176.372,101.811
                                c-112.266,0-203.602-91.336-203.602-203.602S121.337,52.398,233.603,52.398c75.319,0,141.156,40.933,176.371,101.809
                                c4.148,7.172,13.328,9.619,20.496,5.474c7.171-4.148,9.621-13.325,5.474-20.496C395.418,69.127,319.729,22.397,233.603,22.397
                                C104.49,22.397,0,126.876,0,256c0,129.113,104.479,233.603,233.603,233.603c86.163,0,161.833-46.763,202.342-116.79
                                C440.092,365.642,437.642,356.466,430.471,352.317z"/>
                        </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import {fb} from '../firebase'

export default {
    data() {
        return {
            show: false,
            animate: false,
            userUid: '',
            height: null,
            coupon: '',
            setPrice: '',
            discount: 0
        }
    },
    created() {
        let deviceHeight = window.innerHeight
        let takeOf = 50
        this.height = (takeOf / 100) * deviceHeight 
    },
    computed: {
        cart() {
            return this.$store.state.cart
        },
        cartItemCount() {
            return this.$store.getters.cartItemCount;
        },
        cartTotalPrice() {
            return this.$store.getters.cartTotalPrice;
        },
    },
    watch: {
        cartItemCount() {
            this.animate = true
            setTimeout(() => {
               this.animate = false
            }, 2000)
        },
    },
    mounted() {
        fb.auth().onAuthStateChanged( user => {
            if (user) {
                this.userUid = user.uid;
            }
        })
        setTimeout(() => {
            let userID = this.userUid
            this.$store.dispatch('getCartProduct', userID)
        }, 100)
    },
    methods: {
        async applyButton() {
            let coupon = this.coupon
            let userID = this.userUid
            await this.$store.dispatch('coupon', {coupon, userID})
            this.discount = this.$store.state.discount
        },
        order() {
            let items = this.cart
            this.$store.dispatch('order', items)

            if (this.$router.history.current.fullPath != '/order') {
                this.$router.push('/order')
            } else {
                this.show = false
            }
            
        },
        showCart() {
            this.setPrice = this.cartTotalPrice
            this.show = true
        },
        swipeLeft(item, id) {
            return () => {
                this.$swal({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                 }).then((result) => {
                    if (result.isConfirmed) {
                        this.$swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                        let userID = this.userUid
                        this.$store.dispatch('deleteFromCart', {item, id, userID})
                    }
                })
            }
        },
        addMore(id, quantity, product, price) {
            let userID = this.userUid
            this.$store.dispatch('addMore', {id, quantity, product, price, userID})
        },
        async logOut() {
            try {
                const data = await fb.auth().signOut()
                console.log(data);
                this.$router.push('/register')
            } catch(err) {
                console.log(err);
            }
        },
        lessBtn(id, quantity, product, price) {
            let userID = this.userUid
            this.$store.dispatch('lessItem', {id, quantity, product, price, userID})
        }
    }
}
</script>

<style lang="scss" scoped>
.coupon-input {
    flex-grow: 1;
    margin-right: 20px;
    font-size: 14px;
    border-radius: 100px;
    border: 0;
    padding-left: 15px;
    &:focus {
        outline: none;
    }
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0.4;
}

.custom-navbar {
    z-index: 1030;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.3);
}
.swipe-txt {
    margin: 5px 0;
    font-size: 12px;
    color:#415366;
}
.cart {
    background-color: #ebeef6;
    position: fixed;
    top: 0;
    left: 110%;
    width: 100%;
    height: 100%;
    transition: 0.6s;
    z-index: 1040;
    
    .custom-shadow {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(235,238,240,1) 100%);
        }

        .inner {
            overflow-y: scroll;
        }
    }

    &.show {
        left: 0;
        transition: 0.6s;
    }

    .item {
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

    .cart-actions {
        text-align: left;

        button {
            margin-bottom: 15px;
            width: 100%;
            height: 50px;
            border: 0;
            border-radius: 30px;
            background: #10ca93;
            color: #fff;
            box-shadow: 0 6px 8px rgba(0,0,0,0.11);

            &.back {
                background-color: #fff;
                color:#ff9f00;
            }
        }

        p {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 18px;

            .colored {
                color:#ff9f00;
            }
        }

        .checkout-btn {
            flex-grow: 1;
            border: 0;
            color: #fff;
            background-color: #10ca93;
        }

        .hide-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            color: #fff;
            background-color: #ff9f00;
            
            svg {
                width: 40px;
                height: 20px;
                fill: #fff;
            }
        }
    }
}
.cartBtn {

    &.animate {

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #10ca93;
            opacity: 1;
            border-radius: 99999px;
            z-index: -10;
            display: block;
            animation: pulse 0.8s forwards;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(1.8);
                opacity: 0;
            }
        }
        // svg {
        //     animation: bounce 1.6s forwards;
        // }

        // @keyframes bounce {
        //     0%   { transform: scale(1,1)    translateY(0); }
        //     10%  { transform: scale(1.1,.9) translateY(0); }
        //     30%  { transform: scale(.9,1.1) translateY(-5px); }
        //     50%  { transform: scale(1,1)    translateY(0); }
        //     100% { transform: scale(1,1)    translateY(0); }
        // }

    }

    svg {
        width: 38px;
        height: 38px;
        fill: #fff;
        top: 3px;
        position: relative;
    }

    .count {
        z-index: 2;
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translate(-50%, 0);
        color: #fff;
        width: 20px;
        height: 20px;
        font-size: 10px;
        background: #10ca93;
        border-radius: 99999px;
        line-height: 1.6;
        border: 2px solid #fff;
    }
}

.addMore-btn {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    width: 40px;
    height: 30px;
    border-bottom-left-radius: 9999px;
    background-color: #10ca93;
    color: #fff;

    &.less {
        top: unset;
        bottom: 0;
        background-color: #ff9f00;
        border-bottom-left-radius: 0;
        border-top-left-radius: 9999px;
    }
}

.nav-btn {
    display: block;
    text-align: center;
    width: 56px;
    height: 56px;
    border-radius: 9999px;
    background: transparent;
    border: 0;
    
    &.center {
        position: relative;
        top: -20px;
        width: 80px;
        height: 80px;
        background-color: #415366;

        svg {
            width: 42px;
            height: 42px;
            fill: #fff;
            top: 1px;
            right: -2px;
            position: relative;
        }
    }

     svg {
        position: relative;
        display: block;
        width: 42px;
        height: 42px;

        &.pizza {
            top: 6px;
            left: 6px;
            width: 40px;
            height: 40px;
            fill: #10ca93;
        }

        &.tracking {
            top: 5px;
            right: -6px;
            fill: #3a7afe;
        }

        &.logout {
            left: -8px;
            width: 38px;
            height: 38px;
            fill: #ff9f00;
        }

    }
}

@media (min-width: 768px) {
    .empty-pizza {
        width: 50%;
    }
    .cartBtn {
        .count {
            top: 8px;
            width: 18px;
            height: 18px;
            font-size: 9px;
        }
    }
    .custom-navbar {
        bottom: 0;
        right: 0;
        width: 10%;
        height: auto;
        left: auto;
        display: flex;
        box-shadow: none;
        background-color: transparent;
        .nav-btn {
            margin-bottom: 15px;
            svg {
                &.logout {
                    left: 0;
                }
            }
            &.center {
                width: 66px;
                height: 66px;
                top: auto;  
                svg {
                    width: 32px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -62%);
                }
            }
        }
    }
}
</style>