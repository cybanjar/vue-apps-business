<template>
    <div>
        <h5 class="text-center font-weight-bold mt-4">New Post</h5>
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <form @submit.prevent="newposting">
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input type="text" v-model="nama"  class="form-control" id="nama">
                        </div>
                        <div class="form-group">
                            <label for="harga">Harga</label>
                            <input type="number" v-model="harga" class="form-control" id="harga">
                        </div>
                        <div class="form-group">
                            <label for="deskripsi">Deskripsi</label>
                            <input type="text" v-model="deskripsi" class="form-control" id="deskripsi">
                        </div>
                        <div class="form-group">
                            <label for="kondisi">Kondisi</label>
                            <select class="form-control" v-model="kondisi" id="kondisi">
                                <option value="baru">Baru</option>
                                <option  value="bekas">Bekas</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="lokasi">Lokasi</label>
                            <input type="text" v-model="lokasi" class="form-control" id="lokasi">
                        </div>
                        <div class="form-group">
                            <label for="kategori">Kategori</label>
                            <input type="text" v-model="kategori" class="form-control" id="kategori">
                        </div>
                        <div class="form-group">
                            <label for="photo">Upload</label>
                            <input type="file" @change="onFileChange" class="form-control-file" id="photo">
                        </div>
                        <button type="submit" class="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

    export default {

        setup() {

            const state = reactive({                
                nama: "",
                harga: "",
                deskripsi: "",
                kondisi: "",
                lokasi: "",
                kategori: "",
                picturePath: "",
            })

            //state token
            const token = localStorage.getItem('token')

            //inisialisasi vue router on Composition API
            const router = useRouter()

            // state validation
            const validation = ref([])

            // method newposting
            function newposting() {
                // axios.defaults.headers.common.Authorization = `Bearer ${token}`

                console.log("TOken ada? ", `Bearer ${token}`);
                console.log("State", state);

                // let nama = state.nama
                // let harga = state.harga
                // let deskripsi = state.deskripsi
                // let kondisi = state.kondisi
                // let lokasi = state.lokasi
                // let kategori = state.kategori
                // let picturePath = state.picturePath

                //send server with axios
                const body = {
                      "nama": "nama",
                      "harga": 12000,
                      "deskripsi": "deskripsi",
                      "kondisi": "kondisi",
                      "lokasi":"lokasi",
                      "kategori":  "kuliner",
                      "picturePath":  state.picturePath

                }
                console.log(body);

                axios.post('https://backend-apps8.herokuapp.com/api/posting', body,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                )
                .then(() => {
                    console.log("Success New Posting");

                    //redirect ke halaman login
                    return router.push({
                        name: 'dashboard'
                    })

                }).catch(error => {
                    //set validation dari error response
                    validation.value = error.response.data
                })
            }

            const onFileChange = (e) => {
                const files = e.target.files || e.dataTransfer.files
                if (!files.length) 
                    return;
                    state.picturePath = files[0]
   
            }

            //mounted properti
            onMounted(async () =>{
                console.log('token ada: ', token);
                //check Token exist
                if(!token) {
                    return router.push({
                        name: 'login'
                    })
                }

                //get data user
                axios.defaults.headers.common.Authorization = `Bearer ${token}`


            })


            //method logout
            function logout() {
                //logout
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.post('https://backend-apps8.herokuapp.com/api/logout')
                .then(response => {

                    if(response.data) {

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
                // axios.get('https://jsonplaceholder.typicode.com/todos/1',)
                // .then(res => {
                //     console.log('sukses', res);
                // })
                // .catch(err => {
                //     console.log('sukses', err);
                // })
                const token = '08982b81c578689e9398d5452acc0b4265ecfa8ec9eb4f7af62eebf0a3f4ad7ff7221bc6af440a9c'
                axios.defaults.headers.common.Authorization = `token ${token}`
                axios.get('https://service-appsbussiness.herokuapp.com/posting')
                .then(res => {
                    console.log('sukses123', res);
                })
                .catch(err => {
                    console.log('sukses123', err);

                })
                // axios.post('https://service-appsbussiness.herokuapp.com/posting', {
                //     "nama": "Pisang Goreng",
                //     "harga": 10000,
                //     "deskripsi": "Lembut di mulut",
                //     "lokasi": "Desa Kebanggan",
                //     "kategori": "kuliner",
                //     "photo":  state.image
                // },
                // {
                //     headers: {
                //       token: '08982b81c578689e9398d5452acc0b4265ecfa8ec9eb4f7af62eebf0a3f4ad7ff7221bc6af440a9c'
                //     }
                // }
                // ).then(res => {
                //     console.log('sukses123', res);
                // }).catch(err => {
                //     console.log('sukses123', err);

                // })
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
                newposting,
                onFileChange

            }

        }

    }
</script>