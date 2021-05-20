<template>
  <div>
    <fx-group title="基础用法">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="1"> <div class="badge-slot"></div> </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-badge :content="99"> <div class="badge-slot"></div> </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="小红点">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="1" dot>
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="图标（Slot）">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="1">
              <div class="badge-slot"></div>
              <template #badge>
                <fx-icon icon="CheckOutlined"></fx-icon>
              </template>
            </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="文本">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge content="惠"> <div class="badge-slot"></div> </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-badge content="热"> <div class="badge-slot"></div> </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="限制最大数">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="1000" :max-count="9">
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-badge :content="1000" :max-count="10">
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-badge :content="1000" :max-count="99">
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="展示 0">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="0" show-zero>
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-badge :content="0" dot show-zero>
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="偏移">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="1" :offset="[10, -10]">
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-badge :content="1" dot :offset="[-20, 20]">
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
    <fx-group title="展示动画">
      <div class="badge-flex">
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="count" show-zero animated>
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-switch @change="onSwitch"></fx-switch>
          </fx-col>
        </fx-row>
        <fx-row :gutter="[16, 16]">
          <fx-col :span="6">
            <fx-badge :content="count2" dot animated>
              <div class="badge-slot"></div>
            </fx-badge>
          </fx-col>
          <fx-col :span="6">
            <fx-switch @change="onSwitch2"></fx-switch>
          </fx-col>
        </fx-row>
      </div>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  data() {
    return {
      count: 0,
      count2: 0
    }
  },
  methods: {
    onSwitch({ value }) {
      this.count = value ? 1000 : 0
    },
    onSwitch2({ value }) {
      this.count2 = value ? 1000 : 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.badge {
  &-flex {
    padding: 16px 16px 0;
  }

  &-slot {
    width: 40px;
    height: 40px;
    background-color: $background-color;
  }
}
</style>
