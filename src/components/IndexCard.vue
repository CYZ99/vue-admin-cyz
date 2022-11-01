<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between flex-row">
        <span class="text-sm">{{title}}</span>
        <el-tag type="danger" effect="plain">
          {{tip}}
        </el-tag>
      </div>
    </template>
    <!-- card body -->
    <el-row :gutter="20">
        <el-col :span="6" :offset="0" class="flex" v-for="(item, index) in data" :key="index">
            <el-card shadow="hover" class="bg-gray-100" >
              <div class="flex justify-center items-center flex-col">
                <span class="text-xl mb-2">{{item.value}}</span>
                <span class="text-xs text-gray-500">{{item.label}}</span>
              </div>
            </el-card>
        </el-col>
    </el-row>

  </el-card>

</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: [],
  }
})


</script>

<style scoped>

</style>