<template>
  <div class="j-login">
    <div class="login-panel">
      <h1 class="title">后台管理系统</h1>
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </template>
          <login-phone />
        </el-tab-pane>
      </el-tabs>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn" @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './cpns/login-account.vue'
import loginPhone from './cpns/login-phone.vue'
export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  name: 'Login',
  setup() {
    const isKeepPassword = ref(false)
    //todo 这个类型本来是可以不写的(不写就是any类型),但是写了如果你写没有的东西会报错更安全
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginAccount>>()
    const currentTab = ref('account')
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      accountRef,
      handleLoginClick,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.j-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
  .login-panel {
    margin-bottom: 150px;
    width: 320px;

    .title {
      text-align: center;
    }

    .account-control {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
