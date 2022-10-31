<template>
  <div class="tag-list" :style="{left: $store.state.asideWidth }">
    <div class="tab">
      <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-remove="removeTab" @tab-change="changeTab">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.path != '/'"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="dropdown">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div style="height:44px"></div>
  <!-- 占位 -->
</template>

<script setup>
import { useTabList } from '../../componsable/useTabList.js'
const {
  activeTab,
  tabList,
  changeTab,
  removeTab,
  handleClose
} = useTabList()
</script>

<style scoped>
.tag-list{
  @apply flex items-center bg-gray-100 px-2 fixed;
  top: 64px;
  right: 0;
  z-index: 100;
  height: 44px;
}

.tag-list .tab{
  flex:1;
  min-width: 200px;
}


.tag-list .dropdown {
  @apply bg-light-50 rounded flex justify-center items-center;
  width: 32px;
  height: 32px;
}

:deep(.el-tabs__header){
  @apply mb-0;
}

/*  图标居中 */
:deep(.el-dropdown){
  vertical-align: middle;
}
:deep(.el-icon--right){
  @apply m-0;
}

:deep(.el-tabs__nav){
  border: 0 !important;
}

:deep(.el-tabs__item){
  border: 0 !important;
  @apply bg-light-50 mx-1 mt-1.2 rounded-lg ;
  height: 32px;
  line-height: 32px;
}

/* 去掉边框 */
:deep(.el-tabs--card>.el-tabs__header){
  border:0;
}

:deep(.is-disabled){
  cursor:not-allowed;
  @apply text-blue-400;
}
</style>