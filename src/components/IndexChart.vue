<template>
  <el-card shadow="hover">
    <template #header>
    <div class="flex justify-between items-center">
      <span class="text-sm">订单统计</span>
      <el-check-tag
        v-for="(item, index) in options"
        :key="index"
        :checked="current==item.value"
        style="margin-right: 8px"
        @click="handleChoose(item.value)"
      >
        {{item.text}}
      </el-check-tag>
    </div>
    </template>
    <!-- 图表 -->
    <div id="chart" style="width: 100%; height: 300px"></div>
  </el-card>

</template>

<script setup>
import { ref,onMounted } from 'vue'
import * as echarts from 'echarts';
import { getStatistics3 } from '../api/statistics.js'
const current = ref('week')
const options = [
  {
    text: '近一周',
    value:  'week'
  },{
    text: '近一个月',
    value: 'month',
  }, {
    text: '近24小时',
    value: 'hour '
}]
// 按钮点击事件
const handleChoose = (value) => {
  current.value = value;
  getData()
}

// 图表,拿到DOM 需要挂载完节点，使用生命周期函数
let myChart = null
onMounted(() => {
  let chartDom = document.getElementById('chart');
  myChart = echarts.init(chartDom);
  getData()
})

function getData() {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  getStatistics3(current.value).then(res => {
    option.xAxis.data = res.x
    option.series[0].data = res.y
    myChart.setOption(option);
  })
}

</script>

<style scoped>

</style>