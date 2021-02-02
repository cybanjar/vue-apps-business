<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4 class="font-weight-bold mb-3">Register</h4>
                        <hr>
                        <form @submit.prevent="register">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" v-model="user.name" class="form-control">
                                    </div>
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        {{ validation.name[0] }}
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Email address</label>
                                        <input type="email" v-model="user.email" class="form-control">
                                    </div>
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        {{ validation.email[0] }}
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Phone</label>
                                        <input type="number" v-model="user.phone" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" v-model="user.password" class="form-control">
                                    </div>
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        {{ validation.password[0] }}
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Konfirmasi Password</label>
                                        <input type="password" v-model="user.password_confirmation" class="form-control">
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-secondary float-right">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { onMounted, reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {


        setup() {

            //state token
            const token = localStorage.getItem('token')

            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            const user = reactive({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                phone: ''
            })

            //state validation
            const validation = ref([])

            //method register
            function register() {

                //define variable 
                let name = user.name
                let email = user.email
                let password = user.password
                let password_confirmation = user.password_confirmation
                let phone = user.phone

                //send server with axios
                axios.post('http://localhost:8000/api/register', {
                        name,
                        email,
                        password,
                        password_confirmation,
                        phone

                })
                .then(() => {
                    console.log("Success Register");

                    //redirect ke halaman login
                    return router.push({
                        name: 'login'
                    })

                }).catch(error => {
                    //set validation dari error response
                    validation.value = error.response.data
                })

            }

            onMounted(async () =>{
                console.log("Mounted Register!", token);
                //check Token exist
                if(token) {
                    return router.push({
                        name: 'dashboard'
                    })
                }
                
                //get data user
                axios.defaults.headers.common.Authorization = `Bearer ${token}`

            })  

            return {
                user, // <-- state user
                validation, // <-- state validation 
                register // <-- method register
            }

        }

    }
</script>