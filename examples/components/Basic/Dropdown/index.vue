<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell
        label="基础"
        clickable
        id="dropdownCell"
        @click="
          selector = '#dropdownCell'
          visible = true
        "
      />
    </fx-group>
    <fx-group title="事件监听">
      <fx-cell
        label="show/shown/hide/hidden"
        id="dropdownCellEvent"
        @click="
          selector = '#dropdownCellEvent'
          showEventCallback = true
          visible = true
        "
      />
    </fx-group>
    <fx-dropdown
      :visible.sync="visible"
      :selector="selector"
      @show="onEvent('show')"
      @shown="onEvent('shown')"
      @hide="onEvent('hide')"
      @hidden="onEvent('hidden')"
    >
    </fx-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {},
  data() {
    return {
      visible: false,
      selector: ''
    }
  },
  methods: {
    onEvent(type) {
      if (this.showEventCallback) {
        this.$showToast(`${type} 事件触发`)
        console.log(`${type} 事件触发`)
      }
      if (type === 'hidden') {
        this.showEventCallback = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/components/component.module.scss';

.popover {
  &-box {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
  }

  &-box2 {
    padding: 8px 16px;

    > div {
      display: flex;
      justify-content: center;
    }

    .fx-button + .fx-button {
      margin-left: 32px;
    }
  }

  &-content {
    padding: 50px 12px;
    font-size: 17px;
    color: $title-color;
    line-height: 24px;
  }
}
</style>
