<template>
  <el-form label-width="60px">
    <el-form-item label="手机号" prop="num" ref="formRef">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const phone = reactive({
      num: '',
      code: ''
    })
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('真正执行登录逻辑')
        }
      })
    }
    return {
      phone
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
