<template>
  <div class="login-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
      <div class="head">account login</div>

    <div class="user">

      <i class="fa fa-user">
        <img src="./working1.png" v-if="Math.floor(Math.random() * 10)<=1" alt="">
        <img src="./working5.png" v-else-if="Math.floor(Math.random() * 10)<=3" alt="">
        <img src="./working4.png" v-else-if="Math.floor(Math.random() * 10)<=7" alt="">
        <img src="./working2.png" v-else alt="">
      </i>
    </div>
    <el-card class="container">
      <div class="box login">
        <div class="form-content">
          <div class="avtar">
            <div class="pic"><img src="@/assets/logo.png" alt="" /></div>
          </div>
          <h1>Welcome back</h1>
          <div  class="form">
            <div>
              <i class="fa  el-icon-user"></i>
              <input type="text" v-model="loginForm.id" placeholder="username" />
            </div>
            <div>
              <i class="fa el-icon-key"></i>
              <input type="password" v-model="loginForm.password" placeholder="password" />
            </div>
            <div class="btn">
              <button @click="login">登 录</button>
            </div>
          </div>
          <p class="btn-something">登录即同意<span class="signupbtn">《用户隐私协议》</span></p>
        </div>
      </div>
    </el-card>
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
  mounted() {},
  created() {},
  methods: {
    // 登录
    login() {
      Login(this.loginForm).then((res) => {
        console.log(res);
        if (res.data.code !== 200) return this.$message.error("账号或密码错误");
        window.localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        window.sessionStorage.setItem("activePath", "/index");
        this.$message.success("登录成功");
        this.$router.push("/index");
      });
    },
  },
};
</script>

<style lang="css" scoped>
@import "./Login.css";
</style>
