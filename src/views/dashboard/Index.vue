<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="font-weight-bold">Main Menu</h5>
                        <hr>
                        <ul class="list-group">
                            <router-link :to="{name: 'dashboard'}"
                                class="list-group-item text-dark text-decoration-none">Dashboard</router-link>
                            <router-link :to="{name: 'dataPost'}"
                                class="list-group-item text-dark text-decoration-none">Data Post</router-link>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none"
                                style="cursor:pointer">Log Out</li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h5 class="font-weight-bold">Dashboard</h5>
                        <hr>
                        Selamat Datang <strong>Ahmad</strong>
                        <!-- <button link type="button" class="btn btn-info float-right"> <i class="bi bi-plus-square"></i> New Post </button> -->
                        <a href="/new-post" class="float-right bg-primary text-white py-2 px-4 rounded-lg"> <i class="bi bi-plus-square"></i> New Post </a>
                    </div>
                </div>

                <div class="row">
                    <div v-for="post in dataPost" :key="post.id" class="col-6">
                        {{'https://backend-apps8.herokuapp.com'+post.picturePath}}
                        <div  class="card mt-2">
                        <img :src="'https://backend-apps8.herokuapp.com'+post.picturePath" class="img-post card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">{{ post.picturePath }} |{{ post.nama }} | {{ post.kategori }} </h5>
                                <p class="card-text">{{ post.deskripsi }} - {{ post.kondisi }} - {{ post.lokasi }} </p>
                                <a href="#" class="btn btn-secondary float-right">{{ post.harga }}</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

    export default {

        setup() {

            let dataPost = []
    
            const state = reactive({                
                dataPost: [],
                user: "",
            })

            //state token
            const token = localStorage.getItem('token')

            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            // const user = ref('')
            
            //mounted properti
            onMounted(async () =>{
                //check Token exist
                if(!token) {
                    return router.push({
                        name: 'login'
                    })
                }

                //get data user
                axios.defaults.headers.common.Authorization = `Bearer ${token}`

                loadPost()
                // loadUser()
                
                // await axios.get('http://localhost:8000/api/user')
                // .then(response => {

                //     console.log('Data name : ', response.data.name)
                //     user.value = response.data

                // })
                // .catch(error => {
                //     console.log(error.response.data)
                // })                

            })

            // const loadUser = async () => {
            //     const user = await axios.get('https://backend-apps8.herokuapp.com/api/user')
            //     .then(response => {
            //         user.value = response.data
            //         const dataLoadUser = user['data']
            //         console.log("Data users", dataLoadUser)
            //     })
            //     .catch(error => {
            //         console.log('error', error)
            //     })    

            // }

            const loadPost = async () => {
                const post = await axios.get('https://backend-apps8.herokuapp.com/api/posting')
                state.dataPost = post['data']
                console.log(dataPost);
            }

            //method logout
            function logout() {

                //logout
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                localStorage.removeItem('token')
                router.push({
                        name: 'login'
                    })

                axios.post('https://backend-apps8.herokuapp.com/api/logout')
                .then(response => {

                    if(response.data.success) {

                        //remove localStorage
                        localStorage.removeItem('token')

                        //redirect ke halaman login
                        return router.push({
                            name: 'login'
                        })

                    }

                })
                .catch(error => {
                    console.log(error.response.data)
                })

            }

            return {
                ...toRefs(state),
                token,      // <-- state token
                // user,       // <-- state user
                logout,     // <-- method logout
                // loadPost,
                // loadUser

            }

        }

    }
</script>