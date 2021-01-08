<template>
  <div>
    <fx-group title="基础用法">
      <!-- <div class="scroll-tab-header">占位头部</div> -->
      <fx-index-view
        class="scroll-tab-boxs"
        :stickyOffsetTop="offsetTop"
        @change="onChange"
      >
        <fx-index-view-item :name="item" v-for="item in indexList" :key="item">
          <fx-cell label="单元格"></fx-cell>
          <fx-cell label="单元格"></fx-cell>
          <fx-cell label="单元格"></fx-cell>
          <fx-cell label="单元格"></fx-cell>
          <fx-cell label="单元格"></fx-cell>
        </fx-index-view-item>
      </fx-index-view>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  props: {},
  data() {
    return {
      offsetTop: 52,
      indexList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    }
  },
  methods: {
    onChange(res) {
      console.log('change', res)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/style/var.scss';

.scroll-tab {
  &-header {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: $title-color;
  }

  &-boxs {
    // min-height: 500px;
  }

  &-box {
    height: 1000px;

    &.box-1 {
      background: #ff4d4f;
      background-image: linear-gradient(0, #ff4d4f 0%, #5c0011 100%);
    }

    &.box-2 {
      background: #ff7a45;
      background-image: linear-gradient(0, #ff7a45 0%, #610b00 100%);
    }

    &.box-3 {
      background: #ffa940;
      background-image: linear-gradient(0, #ffa940 0%, #612500 100%);
    }

    &.box-4 {
      background: #ffc53d;
      background-image: linear-gradient(0, #ffc53d 0%, #613400 100%);
    }

    &.box-5 {
      background: #ffec3d;
      background-image: linear-gradient(0, #ffec3d 0%, #614700 100%);
    }

    &.box-6 {
      background: #bae637;
      background-image: linear-gradient(0, #bae637 0%, #254000 100%);
    }

    &.box-7 {
      background: #73d13d;
      background-image: linear-gradient(0, #73d13d 0%, #092b00 100%);
    }

    &.box-8 {
      background: #36cfc9;
      background-image: linear-gradient(0, #36cfc9 0%, #002329 100%);
    }

    &.box-9 {
      background: #40a9ff;
      background-image: linear-gradient(0, #40a9ff 0%, #002766 100%);
    }

    &.box-10 {
      background: #597ef7;
      background-image: linear-gradient(0, #597ef7 0%, #030852 100%);
    }

    &.box-11 {
      background: #9254de;
      background-image: linear-gradient(0, #9254de 0%, #120338 100%);
    }

    &.box-12 {
      background: #f759ab;
      background-image: linear-gradient(0, #f759ab 0%, #520339 100%);
    }
  }
}
</style>
