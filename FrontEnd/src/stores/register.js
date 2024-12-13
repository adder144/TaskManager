import {defineStore} from "pinia";
import axios from 'axios';

export const useRegisterStore = defineStore('registerForm',{
  state: () => {
    return {
      formData:{
        username: '',
        password: '',
        confirmPassword: "password",
        userRole: "Supervisor"

      },
      submitted: false

    }
  },
  actions: {
    async submitRegistrationForm (){
      try{
        const LoginParams = {
          "userName": this.formData.username,
          "password": this.formData.password,
          "confirmPassword": this.formData.confirmPassword,
          "userRole": this.formData.userRole,
        }
        console.log(LoginParams);
        const response = await axios.put('http://localhost:5000/auth', LoginParams);

        console.log(response.data);
        return true;

        // console.log('Token: '+localStorage.getItem('token')+ '\nUser: '+(localStorage.getItem('user')));
        // return JSON.parse(localStorage.getItem('user')).userId;

      }catch(err){console.log(err); alert('Registration Failed\n'+err.response.data.message)}

    }
  }

})
