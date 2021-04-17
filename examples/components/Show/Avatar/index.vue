<template>
  <div>
    <fx-group title="基础用法">
      <fx-cell label="默认">
        <fx-avatar />
      </fx-cell>
      <fx-cell label="图片（src=xxx）">
        <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
      </fx-cell>
      <fx-cell label="文字（Slot default）">
        <fx-avatar>曹</fx-avatar>
      </fx-cell>
    </fx-group>
    <fx-group title="色彩（colorStyle）">
      <div class="avatar-custom-list">
        <fx-avatar colorStyle="DustRed">DR</fx-avatar>
        <fx-avatar colorStyle="Volcano">V</fx-avatar>
        <fx-avatar colorStyle="SunsetOrange">SO</fx-avatar>
        <fx-avatar colorStyle="CalendulaGold">CG</fx-avatar>
        <fx-avatar colorStyle="SunriseYellow">SY</fx-avatar>
        <fx-avatar colorStyle="GeekBlue">GB</fx-avatar>
        <fx-avatar colorStyle="DaybreakBlue">DB</fx-avatar>
        <fx-avatar colorStyle="Cyan">C</fx-avatar>
        <fx-avatar colorStyle="PolarGreen">PG</fx-avatar>
        <fx-avatar colorStyle="Lime">L</fx-avatar>
        <fx-avatar colorStyle="GoldenPurple">GP</fx-avatar>
        <fx-avatar colorStyle="Magenta">M</fx-avatar>
      </div>
    </fx-group>
    <fx-group title="形状（shape）">
      <fx-cell label="circle">
        <fx-avatar shape="circle" />
      </fx-cell>
      <fx-cell label="square">
        <fx-avatar shape="square" />
      </fx-cell>
    </fx-group>
    <fx-group title="尺寸（size）">
      <div class="avatar-custom-list">
        <fx-avatar :size="24">24</fx-avatar>
        <fx-avatar size="small">SM</fx-avatar>
        <fx-avatar size="middle">MD</fx-avatar>
        <fx-avatar size="large">LG</fx-avatar>
      </div>
    </fx-group>
    <fx-group title="角标">
      <fx-cell label="gender">
        <div class="avatar-list">
          <fx-avatar
            shape="square"
            gender="man"
            src="https://cdn.fox2.cn/vfox/avatar/1.png"
          />
          <fx-avatar
            shape="square"
            gender="woman"
            src="https://cdn.fox2.cn/vfox/avatar/2.png"
          />
          <fx-avatar
            shape="circle"
            gender="man"
            src="https://cdn.fox2.cn/vfox/avatar/3.png"
          />
          <fx-avatar
            shape="circle"
            gender="woman"
            src="https://cdn.fox2.cn/vfox/avatar/4.png"
          />
        </div>
      </fx-cell>
      <fx-cell label="badge">
        <div class="avatar-list">
          <fx-avatar shape="square" badge="99" />
          <fx-avatar shape="square" :badge="{ content: 1, dot: true }" />
        </div>
      </fx-cell>
    </fx-group>
    <fx-group title="头像组">
      <fx-cell label="size=small">
        <fx-avatar-group size="small">
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/5.png" />
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/6.png" />
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/7.png" />
        </fx-avatar-group>
      </fx-cell>
      <fx-cell label="totalCount=123456">
        <fx-avatar-group size="small" :totalCount="123456">
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/1.png" />
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/2.png" />
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/3.png" />
          <fx-avatar src="https://cdn.fox2.cn/vfox/avatar/4.png" />
        </fx-avatar-group>
      </fx-cell>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Avatar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/style/var.scss';

.avatar {
  &-list {
    display: flex;
    align-items: center;

    .fx-avatar {
      margin-left: 12px;
    }
  }

  &-custom-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px 0 0 16px;
    overflow: hidden;

    .fx-avatar {
      margin: 0 12px 8px 0;
    }
  }
}
</style>
