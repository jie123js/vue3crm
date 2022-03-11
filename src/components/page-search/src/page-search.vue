<template>
  <div class="page-search">
    <j-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick()"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleResetClick(formData)"
            >搜索</el-button
          >
        </div>
      </template>
    </j-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import JForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: {
    JForm
  },
  emits: ['handeleSearch'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置
    const handleResetClick = (queryInfo = []) => {
      // formData.value = formOriginData
      if (queryInfo.length === 0) {
        emit('handeleSearch')
        for (const key in formOriginData) {
          formData.value[`${key}`] = formOriginData[key]
        }
      } else {
        emit('handeleSearch', formData.value)
      }
    }

    //  console.log(formData.value)

    return {
      formData,
      handleResetClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>

function emit(arg0: string, queryInfo: any[]) { throw new Error('Function not
implemented.') }
