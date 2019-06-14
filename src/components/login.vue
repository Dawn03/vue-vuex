<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 500px; margin: 100px auto;"
    >
      <el-form-item label="用户" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      ruleForm: {
        username: "123",
        password: "123"
      }
    };
  },
  methods: {
    ...mapActions(["login",'setUser']),
    submitForm(form) {
      this.login(this.ruleForm)
    },
    resetForm() {}
  }
};
</script>