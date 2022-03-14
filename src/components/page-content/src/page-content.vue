<template>
  <div class="page-content">
    <j-table
      :listData="dataList"
      v-bind="contentTableConfig"
      v-model:page="pagerData"
      :total="pageCount"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </div>
      </template>
      <template
        v-for="slotName in otherSlotList"
        :key="slotName.prop"
        #[slotName.slotName]="scope"
      >
        <template v-if="slotName.slotName">
          <slot :name="slotName.slotName" :row="scope.row"> </slot>
        </template>
      </template>
    </j-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

import JTable from '@/base-ui/table'

export default defineComponent({
  components: {
    JTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const pagerData = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pagerData, () => {
      getTableList()
    })
    const getTableList = (searchInfo = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          //todo 这个offset是他这个接口的计算方式,正常接口应该都是页数 所以这里不用纠结------why老师发现了问题且修改了
          offset: (pagerData.value.currentPage - 1) * pagerData.value.pageSize,
          size: pagerData.value.pageSize,
          ...searchInfo
        }
      })
    }
    getTableList()
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const pageCount = computed(() =>
      store.getters[`system/pageTotalData`](props.pageName)
    )
    const otherSlotList = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    return {
      dataList,
      getTableList,
      pagerData,
      pageCount,
      otherSlotList
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
