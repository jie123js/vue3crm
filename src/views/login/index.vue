<template>
  <div>登录</div>
  <el-button type="primary"> As a directive </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { ElLoading } from 'element-plus'
export default defineComponent({
  setup() {
    const fullscreenLoading = ref(false)
    const openFullScreen1 = () => {
      fullscreenLoading.value = true
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 2000)
    }

    const openFullScreen2 = () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
    return {}
  }
})
</script>

<style scoped></style>
