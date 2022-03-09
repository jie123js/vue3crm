<template>
  <div class="nav-header">
    <el-icon
      class="fold-menu"
      :class="isFold ? 'fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
      ><fold v-if="!isFold" /><expand v-else
    /></el-icon>
    <div class="content">
      <j-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import userInfo from './user-info.vue'
import JBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    Fold,
    Expand,
    userInfo,
    JBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const breadcrumbs = computed(() => {
      console.log(1)
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    //const breadcrumbs = pathMapBreadcrumbs(userMenus, currentPath)
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
