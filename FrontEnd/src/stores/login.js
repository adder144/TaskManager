import {defineStore} from "pinia";
import axios from 'axios';

export const useLoginStore = defineStore('loginForm',{
  state: () => {
    return {
      formData:{
        username: '',
        password: ''
      },
      submitted: false

    }
  },
  actions: {
    async submitLoginForm (){
      try{
        const LoginParams = {
          "userName": this.formData.username,
          "password": this.formData.password,
        }
        const response = await axios.post('http://localhost:5000/auth', LoginParams);

        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userInfo));

        console.log('Token: '+localStorage.getItem('token')+ '\nUser: '+(localStorage.getItem('user')));
        return JSON.parse(localStorage.getItem('user')).userId;
        // if(JSON.parse(localStorage.getItem('user')).userRole == 'Subordinate'){
        //   retur
        // }

      }catch(err){console.log(err); alert('Wrong Username or Password')}

      // this.submitted = true;
      // if(this.submitted) alert("Logging In with Username "+this.formData.username +" and Password "+this.formData.password );
      // this.formData = {username: '', password: ''}
      // this.submitted = false;
    }
  }

})
