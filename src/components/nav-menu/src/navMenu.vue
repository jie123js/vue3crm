<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- 想用@加一个~ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="nowPath"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="(item, i) in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <svg class="icon iconSty" aria-hidden="true">
                <use :xlink:href="`#${iconData[i]}`"></use>
              </svg>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="(subitem, j) in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <svg class="icon iconSty" aria-hidden="true">
                  <use
                    :xlink:href="`#${smallIcon[iconStatus[i].iconIndex + j]}`"
                  ></use>
                </svg>
                <span>{{ subitem.name }}</span>
                <!-- <template v-if="i === 0">
                  <svg class="icon iconSty" aria-hidden="true">
                    <use :xlink:href="`#${smallIcon[j]}`"></use>
                  </svg>
                  <span>{{ subitem.name }}</span>
                </template>
                <template v-if="i === 1">
                  <svg class="icon iconSty" aria-hidden="true">
                    <use :xlink:href="`#${smallIcon[j + 2]}`"></use>
                  </svg>
                  <span>{{ subitem.name }}</span>
                </template>
                <template v-if="i === 2">
                  <svg class="icon iconSty" aria-hidden="true">
                    <use :xlink:href="`#${smallIcon[j + 5]}`"></use>
                  </svg>
                  <span>{{ subitem.name }}</span>
                </template>
                <template v-if="i === 3">
                  <svg class="icon iconSty" aria-hidden="true">
                    <use :xlink:href="`#${smallIcon[j + 7]}`"></use>
                  </svg>
                  <span>{{ subitem.name }}</span>
                </template> -->
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { searchRouteid } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenus = computed(() => store.state.login.userMenus)
    const curPath = route.path
    //console.log(curPath)

    const iconData = [
      'icon-yiwux',
      'icon-quanlix',
      'icon-shenAx',
      'icon-zhishux',
      'icon-huangjinx1'
    ]
    const smallIcon = [
      'icon-huAx',
      'icon-qihuox',
      'icon-huangjinx',
      'icon-qiquanx',
      'icon-shenjix',
      'icon-huzhaix1',
      'icon-zhishux1',
      'icon-hujix1',
      'icon-shenjix1'
    ]
    const iconStatus = [
      { status: 0, iconIndex: 0 },
      { status: 1, iconIndex: 2 },
      { status: 2, iconIndex: 5 },
      { status: 3, iconIndex: 7 }
    ]
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    let nowPath = searchRouteid(userMenus.value, curPath)
    //todo 获取到数据想要响应式记得加ref
    //这里是因为函数他需要绑定字符串所以加+''
    nowPath = ref(nowPath.id + '')
    let a = () => {
      for (const i of [3, 2, 1]) {
        console.log(i)

        if (i == 3) {
          return
        }
      }
    }
    a()
    return {
      userMenus,
      iconData,
      smallIcon,
      iconStatus,
      handleMenuItemClick,
      curPath,
      nowPath
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
.iconSty {
  width: 2em;
}
</style>
