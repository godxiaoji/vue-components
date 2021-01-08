<template>
  <div class="flat-list">
    <fx-group title="基础用法">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        :item-size="50"
        data-key="id"
      >
        <template #item="{ item }">
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
        horizontal
      >
        <template #item="{ item }">
          <div class="flat-list-item">
            {{ item.text }}
          </div>
        </template>
      </fx-flat-list>
    </fx-group>
    <fx-group title="展示底部加载更多提示">
      <fx-flat-list
        class="flat-list-box"
        :data="list"
        :item-size="50"
        data-key="id"
        :lower-loading="lowerLoading"
        @end-reached="onLoadMore"
      >
        <template #item="{ item }">
          <div class="flat-list-item">
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
        <template #item="{ item }">
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
        <template #item="{ item }">
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
  </div>
</template>

<script>
export default {
  name: 'FlatList',
  props: {},
  data() {
    return {
      list: [],
      lowerLoading: false
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
  },
  methods: {
    onRefreshing(res, done) {
      setTimeout(() => {
        this.$showToast({
          title: `刷新成功`,
          type: 'success'
        })
        done()
      }, 2000)
    },
    onEndReached() {
      this.$showToast(`到底了`)
    },
    onLoadMore() {
      this.lowerLoading = true

      setTimeout(() => {
        this.$showToast({
          title: `加载成功`,
          type: 'success'
        })
        this.lowerLoading = false
      }, 2000)
    },
    onRecycleChange({ item, index, recycled }) {
      index === 49 &&
        this.$showToast(`${item.text} ${recycled ? '回收了' : '加入了'}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/style/var.scss';

.flat-list {
  &-box {
    height: 240px;
  }

  &-item {
    height: 100%;
    padding: 0 16px;
    font-size: 17px;
    color: $title-color;
    display: flex;
    align-items: center;
  }
}
</style>
