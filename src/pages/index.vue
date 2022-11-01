<template>
  <div class="home">
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="i">
          <!-- 骨架屏 -->
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <el-skeleton-item variant="text" style="width: 30%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>

                <div class="body">
                  <el-skeleton-item variant="h3" style="width: 50%" />
                  <el-divider />
                  <div class="card-footer">
                    <el-skeleton-item variant="text" style="width: 40%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <!-- 24份分为四份 -->
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">{{ item.unit }}</el-tag>
            </div>
          </template>

          <div class="body">
            <span class="text-lg font-bold">
              <!-- 数字滚动组件 -->
              <CountTo :value="item.value"></CountTo>
            </span>
            <el-divider />
            <div class="card-footer">
              <span>{{ item.subTitle }}</span>
              <span>{{ item.subValue }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分类菜单 -->
    <IndexNav></IndexNav>

    <!-- 订单管理模块 -->
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart></IndexChart>
      </el-col>
      <el-col :span="12" :offset="0">
        <IndexCard title="店铺" tip="店铺交易" :data="goods"></IndexCard>
        <IndexCard title="交易提示" tip="需要及时处理的" :data="order"></IndexCard>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { getStatistics, getStatistics2 } from '../api/statistics'
import { ref } from 'vue'
import CountTo from '../components/CountTo.vue';
import IndexNav from '../components/IndexNav.vue';
import IndexChart from '../components/IndexChart.vue';
import IndexCard from '../components/IndexCard.vue';

const panels = ref([]);
const goods = ref([]);
const order = ref([]);
// 获取数据
getStatistics().then(res => {
  panels.value = res.panels;
})

getStatistics2().then(res => {
  goods.value = res.goods;
  order.value = res.order;
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  @apply text-sm
}

.card-footer {
  display: flex;
  justify-content: space-between;
  @apply text-sm
}
</style>