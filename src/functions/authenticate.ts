// myMethodMixin.js
export default {
    methods: {
      signin(email: string, password: string) {
        var reqemail = email;
        var reqpassword = password;
        // Your method logic here
        console.log('Hello from myMethod!');
        return String(reqemail) + String(reqpassword);
      },
      signup(email: string, password: string) {
        var reqemail = email;
        var reqpassword = password;
        // Your method logic here
        console.log('Hello from myMethod!');
        return String(reqemail) + String(reqpassword);
    }
  }
}
// call this method, by importing it where needed and then calling it by using 
// const response = this.myMethod(email, password)
  