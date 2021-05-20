<template>
  <div class="flat-list">
    <fx-group title="基础用法">
      <fx-flat-list class="flat-list-box" :data="list" data-key="id">
        <template #default="{ item }">
          <div class="flat-list-item">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="水平列表">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        :item-size="130"
        data-key="id"
        initialHorizontal
      >
        <template #default="{ item }">
          <div class="flat-list-item">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="展示底部加载更多提示">
      <fx-flat-list
        class="flat-list-box"
        :data="loadList"
        :item-size="50"
        data-key="id"
        :lower-loading="lowerLoading"
        @end-reached="onLoadMore"
      >
        <template #default="{ item }">
          <div class="flat-list-item">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="设置间隔（itemGutter=[16, 6]）">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        data-key="id"
        :itemGutter="[16, 6]"
      >
        <template #default="{ item, index }">
          <div class="flat-list-item" :class="['color-' + (index % 10)]">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="瀑布流">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        :getItemSize="getItemSize"
        data-key="id"
        initialWaterfall
        :waterfallColCount="3"
        ref="demo"
      >
        <template #default="{ item, index }">
          <div class="flat-list-item" :class="['color-' + (index % 10)]">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="事件监听（end-reached/recycle-change）">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        :item-size="50"
        data-key="id"
        @end-reached="onEndReached"
        @recycle-change="onRecycleChange"
      >
        <template #default="{ item }">
          <div class="flat-list-item">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="开启下拉刷新">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        :item-size="50"
        data-key="id"
        :enable-pull-refresh="true"
        @refreshing="onRefreshing"
      >
        <template #default="{ item }">
          <div class="flat-list-item">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="Slot empty">
      <fx-flat-list
        class="flat-list-box"
        :data="[]"
        :item-size="50"
        data-key="id"
      >
        <template #empty>
          <fx-empty description="暂无列表"></fx-empty>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="Method">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        data-key="id"
        ref="flatList"
      >
        <template #default="{ item, index }">
          <div class="flat-list-item" :class="['color-' + (index % 10)]">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
      <fx-cell
        label="scrollToIndex({ index: 49 })"
        isLink
        @click="scrollToIndex(49)"
      ></fx-cell>
      <fx-cell
        label="同上加 viewPosition=0.5"
        isLink
        @click="scrollToIndex(49, 0.5)"
      ></fx-cell>
      <fx-cell
        label="同上加 viewPosition=1"
        isLink
        @click="scrollToIndex(49, 1)"
      ></fx-cell>
      <fx-cell
        label="scrollToOffset({ offset: 200 })"
        isLink
        @click="scrollToOffset(200)"
      ></fx-cell>
    </fx-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '@/Toast'

export default defineComponent({
  name: 'FlatList',
  data() {
    return {
      list: [],
      lowerLoading: false,
      loadList: [],
      getItemSize(item: any, index: number) {
        return 50 + (index % 10) * 2
      }
    }
  },
  created() {
    const list = []

    for (let i = 0; i < 100; i++) {
      list.push({
        id: i + 1,
        text: `第 ${i + 1} 个列表`
      })
    }

    this.list = list

    this.getLoadList()
  },
  methods: {
    scrollToIndex(index: number, viewPosition = 0) {
      this.$refs.flatList.scrollToIndex({ index, viewPosition })
    },
    scrollToOffset(offset: number) {
      this.$refs.flatList.scrollToOffset({ offset })
    },

    onRefreshing(res: any, done: () => void) {
      setTimeout(() => {
        Toast.showToast({
          title: `刷新成功`,
          type: 'success'
        })
        done()
      }, 2000)
    },
    onEndReached() {
      Toast.showToast(`到底了`)
    },
    onLoadMore() {
      if (this.loadList.length >= 100) {
        return
      }

      this.lowerLoading = true

      setTimeout(() => {
        this.getLoadList()
        Toast.showToast({
          title: `加载成功`,
          type: 'success'
        })
        this.lowerLoading = false
      }, 500)
    },
    onRecycleChange({
      item,
      index,
      recycled
    }: {
      item: any
      index: number
      recycled: boolean
    }) {
      index === 49 &&
        Toast.showToast(`${item.text} ${recycled ? '回收了' : '加入了'}`)
    },
    getLoadList() {
      for (
        let i = this.loadList.length, len = this.loadList.length + 10;
        i < len;
        i++
      ) {
        this.loadList.push({
          id: i + 1,
          text: `第 ${i + 1} 个列表`
        })
      }
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.flat-list {
  &-box {
    height: 275px;
  }

  &-item {
    min-height: 50px;
    height: 100%;
    padding: 0 16px;
    font-size: 17px;
    color: $title-color;
    display: flex;
    align-items: center;

    @for $i from 0 through 9 {
      &.color-#{$i} {
        background-color: rgb($i * 25, $i * 25, $i * 25);
      }
    }
  }
}
</style>
