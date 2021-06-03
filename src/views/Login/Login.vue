<template>
  <div class="login-wrap">
    <div class="container">
      <div class="form-container">
        <div class="form-body">
          <div class="header">
            <h2>Login</h2>
            <p>Don't have an account? <a href="#">Craete your Account</a></p>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input type="text" :value="loginForm.id" placeholder="账号" />
            </div>
            <div class="input-group">
              <input
                type="password"
                :value="loginForm.password"
                placeholder="密码"
              />
            </div>
            <div class="input-group flex">
              <div class="remember">
                <input type="checkbox" id="checked" /><label for="checked"
                  >记住我</label
                >
              </div>
              <div class="forgot"><a href="#">忘记密码?</a></div>
            </div>
            <div class="input-group right">
              <button @click="login">登录</button>
            </div>
          </div>
        </div>

        <div class="form-image">
          <div class="text">
            <h2>Welcome <br />Back!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "@/request/login";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginForm: {
        id: "2011111",
        password: "456123",
      },
    };
  },
  mounted() {
      
        
  },
  created(){
  },
  methods: {
    // 登录
    /*  async login() {
      let { data: res } = await this.$http.post(
        "/magiccampus/getAdministratorLogin",
        this.loginForm
      );
      // console.log(res);
      if (res.code !== 200) return this.$message.error("账号或密码错误");
      window.localStorage.setItem("userInfo", JSON.stringify(res.data));
      this.$message.success("登录成功");
      this.$router.push("/index");
    }, */
    login() {
     Login(this.loginForm).then(res=>{
       console.log(res);
       if (res.data.code !== 200) return this.$message.error("账号或密码错误");
      window.localStorage.setItem("userInfo", JSON.stringify(res.data.data));
      window.sessionStorage.setItem("activePath", "/index");
      this.$message.success("登录成功");
      this.$router.push("/index");
     })
    },
  },
};
</script>

<style lang="css" scoped>
@import "./Login.css";
</style>
