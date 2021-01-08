<template>
  <div>
    <fx-group title="基础用法">
      <fx-tab-view class="tab-view">
        <fx-tab-view-item name="Tab 1">
          <fx-scroll-view
            class="tab-view-scroll-view"
            :enable-pull-directions="['down']"
            scroll-y
            scroll-x
            @refreshing="onRefreshing"
          >
            <fx-empty
              class="tab-view-empty"
              description="Tab 1 下拉刷新"
            ></fx-empty>
          </fx-scroll-view>
        </fx-tab-view-item>
        <fx-tab-view-item name="Tab 2">
          <fx-empty class="tab-view-empty" description="Tab 2"></fx-empty
        ></fx-tab-view-item>
      </fx-tab-view>
    </fx-group>
    <fx-group title="垂直">
      <fx-tab-view
        class="tab-view"
        :initialVertical="true"
        :scrollThreshold="1"
        :backUpperWhenChange="true"
      >
        <fx-tab-view-item name="Tab 1">
          <fx-scroll-view
            class="tab-view-scroll-view"
            :enable-pull-directions="['down']"
            scroll-y
            @refreshing="onRefreshing"
          >
            <fx-empty
              class="tab-view-empty"
              description="Tab 1 下拉刷新"
            ></fx-empty>
          </fx-scroll-view>
        </fx-tab-view-item>
        <fx-tab-view-item name="Tab 2">
          <fx-empty class="tab-view-empty" description="Tab 2"></fx-empty>
        </fx-tab-view-item>
      </fx-tab-view>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'TabView',
  props: {},
  data() {
    return {
      activeName: 1
    }
  },
  methods: {
    onRefreshing(res, done) {
      setTimeout(() => {
        done()
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/style/var.scss';

.tab-view {
  height: 500px;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  &-scroll-view {
    height: 100%;
  }

  &-empty {
    height: 400px;
  }

  &-box {
    height: 1000px;
  }

  &-box-2 {
    width: 1000px;
  }
}
</style>
