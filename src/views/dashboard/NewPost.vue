<template>
    <div>
        <h3 class="text-center mt-4">New Post</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <form @submit.prevent="post">
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text" class="form-control" id="nama" v-model="name">
                        </div>
                        <div class="form-group">
                            <label for="harga">Harga</label>
                            <input type="number" class="form-control" id="harga" v-model="harga">
                        </div>
                        <div class="form-group">
                            <label for="deskripsi">Deskripsi</label>
                            <input type="text" class="form-control" id="deskripsi" v-model="deskripsi">
                        </div>
                        <div class="form-group">
                            <label for="kondisi">Kondisi</label>
                            <select class="form-control" id="kondisi" v-model="kondisi">
                                <option>Baru</option>
                                <option>Bekas</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="lokasi">Lokasi</label>
                            <input type="text" class="form-control" id="lokasi" v-model="lokasi">
                        </div>
                        <div class="form-group">
                            <label for="kategori">Kategori</label>
                            <input type="text" class="form-control" id="kategori" v-model="kategory">
                        </div>
                        <div class="form-group">
                            <label for="photo">Upload</label>
                            <input type="file" class="form-control-file" id="photo" @change="onFileChange">
                        </div>
                        <button type="submit" class="btn btn-primary float-right">Submit</button>
                    </form>
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
                name: '',
                harga: '',
                deskripsi: '',
                kondisi: '',
                lokasi: '',
                kategory: '',
                image: ''
            })

            //state token
            const token = localStorage.getItem('token')

            //inisialisasi vue router on Composition API
            const router = useRouter()

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

            })

            const loadPost = async () => {
                const post = await axios.get('http://localhost:8000/api/post')
                state.dataPost = post['data']
                console.log(dataPost);
            }

            //method logout
            function logout() {
                //logout
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.post('http://localhost:8000/api/logout')
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

            function post(){
                const {name, harga, deskripsi, kondisi, lokasi, kategory, image} = state
                console.log('sukses', name, harga, deskripsi, kondisi, lokasi, kategory, image);
            }

            function onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                state.image = files[0]
            }

            return {
                ...toRefs(state),
                token,      // <-- state token
                logout,     // <-- method logout
                post,
                onFileChange

            }

        }

    }
</script>