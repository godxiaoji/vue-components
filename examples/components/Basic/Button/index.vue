<template>
  <div>
    <fx-group title="标准按钮">
      <ul class="button-group">
        <li>
          <fx-button type="default">默认</fx-button>
        </li>
        <li>
          <fx-button type="primary">主要</fx-button>
          <fx-button type="success">成功</fx-button>
          <fx-button type="warning">警告</fx-button>
          <fx-button type="danger">危险</fx-button>
        </li>
      </ul>
    </fx-group>
    <fx-group title="渐变 & 实线 & 虚线 & 无边框">
      <ul class="button-group">
        <li>
          <fx-button type="primary" pattern="gradient">主要</fx-button>
          <fx-button type="success" pattern="gradient">成功</fx-button>
          <fx-button type="warning" pattern="gradient">警告</fx-button>
          <fx-button type="danger" pattern="gradient">危险</fx-button>
        </li>
        <li>
          <fx-button type="primary" pattern="solid">主要</fx-button>
          <fx-button type="success" pattern="solid">成功</fx-button>
          <fx-button type="warning" pattern="solid">警告</fx-button>
          <fx-button type="danger" pattern="solid">危险</fx-button>
        </li>
        <li>
          <fx-button type="primary" pattern="dashed">主要</fx-button>
          <fx-button type="success" pattern="dashed">成功</fx-button>
          <fx-button type="warning" pattern="dashed">警告</fx-button>
          <fx-button type="danger" pattern="dashed">危险</fx-button>
        </li>
        <li>
          <fx-button type="primary" pattern="borderless">主要</fx-button>
          <fx-button type="success" pattern="borderless">成功</fx-button>
          <fx-button type="warning" pattern="borderless">警告</fx-button>
          <fx-button type="danger" pattern="borderless">危险</fx-button>
        </li>
      </ul>
    </fx-group>
    <fx-group title="幽灵按钮">
      <ul class="button-group" style="background: #262626">
        <li>
          <fx-button type="default" ghost>默认</fx-button>
        </li>
        <li>
          <fx-button type="primary" ghost>主要</fx-button>
          <fx-button type="success" ghost>成功</fx-button>
          <fx-button type="warning" ghost>警告</fx-button>
          <fx-button type="danger" ghost>危险</fx-button>
        </li>
      </ul>
    </fx-group>
    <fx-group title="禁用">
      <ul class="button-group">
        <li>
          <fx-button type="default" disabled>默认</fx-button>
          <fx-button type="primary" pattern="solid" disabled>实线</fx-button>
          <fx-button type="primary" pattern="dashed" disabled>虚线</fx-button>
        </li>
        <li>
          <fx-button type="primary" disabled>主要</fx-button>
          <fx-button type="success" disabled>成功</fx-button>
          <fx-button type="warning" disabled>警告</fx-button>
          <fx-button type="danger" disabled>危险</fx-button>
        </li>
      </ul>
    </fx-group>
    <fx-group title="附带图标">
      <ul class="button-group">
        <li>
          <fx-button type="danger" shape="square" icon="HeartOutlined">
          </fx-button>
          <fx-button
            type="primary"
            pattern="solid"
            shape="square"
            icon="EditOutlined"
          >
          </fx-button>
          <fx-button
            type="success"
            pattern="dashed"
            shape="square"
            icon="CheckOutlined"
          >
          </fx-button>
          <fx-button type="danger" icon="SearchOutlined"> </fx-button>
        </li>
        <li>
          <fx-button type="primary" shape="circle" icon="SearchOutlined">
          </fx-button>
          <fx-button
            type="success"
            pattern="solid"
            shape="circle"
            icon="EditOutlined"
          >
          </fx-button>
          <fx-button
            type="danger"
            pattern="dashed"
            shape="circle"
            icon="CheckOutlined"
          >
          </fx-button>
          <fx-button type="default" loading shape="round">加载中</fx-button>
        </li>
      </ul>
    </fx-group>
    <fx-group title="middle 尺寸">
      <ul class="button-group">
        <li>
          <fx-button
            type="danger"
            size="middle"
            shape="circle"
            icon="HeartOutlined"
          >
          </fx-button>
          <fx-button type="danger" size="middle" disabled>危险</fx-button>
          <fx-button type="default" size="middle" loading shape="round"
            >加载中</fx-button
          >
        </li>
        <li>
          <fx-button
            type="warning"
            size="middle"
            shape="square"
            icon="BorderOutlined"
          >
          </fx-button>
          <fx-button
            type="primary"
            size="middle"
            pattern="solid"
            icon="PlusOutlined"
            >主要</fx-button
          >
          <fx-button type="success" size="middle" pattern="dashed"
            >成功</fx-button
          >
          <fx-button type="danger" size="middle" pattern="borderless"
            >危险</fx-button
          >
        </li>
      </ul>
    </fx-group>
    <fx-group title="small 尺寸">
      <ul class="button-group">
        <li>
          <fx-button
            type="danger"
            size="small"
            shape="circle"
            icon="HeartOutlined"
          >
          </fx-button>
          <fx-button type="danger" size="small" disabled>危险</fx-button>
          <fx-button type="default" size="small" loading shape="round"
            >加载中</fx-button
          >
        </li>
        <li>
          <fx-button
            type="warning"
            size="small"
            shape="square"
            icon="SearchOutlined"
          >
          </fx-button>
          <fx-button
            type="primary"
            size="small"
            pattern="solid"
            icon="PlusOutlined"
            >主要</fx-button
          >
          <fx-button type="success" size="small" pattern="dashed"
            >成功</fx-button
          >
          <fx-button type="danger" size="small" pattern="borderless"
            >危险</fx-button
          >
        </li>
      </ul>
    </fx-group>
    <fx-group title="group 组合">
      <ul class="button-group">
        <li>
          <fx-button-group shape="square" size="small">
            <fx-button type="default" icon="LeftOutlined"></fx-button>
            <fx-button type="default" icon="HomeOutlined"></fx-button>
          </fx-button-group>
          <fx-button-group size="small">
            <fx-button type="default" icon="LeftOutlined">返回</fx-button>
            <fx-button type="default" icon="HomeOutlined">首页</fx-button>
          </fx-button-group>
        </li>
        <li>
          <fx-button-group shape="square" size="large">
            <fx-button type="default" icon="LeftOutlined"></fx-button>
            <fx-button type="default" icon="HomeOutlined"></fx-button>
          </fx-button-group>
          <fx-button-group size="large">
            <fx-button type="default" icon="LeftOutlined">返回</fx-button>
            <fx-button type="default" icon="HomeOutlined">首页</fx-button>
          </fx-button-group>
        </li>
        <li>
          <fx-button-group shape="circle" size="small">
            <fx-button type="default" icon="LeftOutlined"></fx-button>
            <fx-button type="default" icon="HomeOutlined"></fx-button>
          </fx-button-group>
          <fx-button-group shape="round" size="small">
            <fx-button type="default" icon="LeftOutlined">返回</fx-button>
            <fx-button type="default" icon="HomeOutlined">首页</fx-button>
          </fx-button-group>
        </li>
        <li>
          <fx-button-group shape="circle" size="large">
            <fx-button type="default" icon="LeftOutlined"></fx-button>
            <fx-button type="default" icon="HomeOutlined"></fx-button>
          </fx-button-group>
          <fx-button-group shape="round" size="large">
            <fx-button type="default" icon="LeftOutlined">返回</fx-button>
            <fx-button type="default" icon="HomeOutlined">首页</fx-button>
          </fx-button-group>
        </li>
        <li>
          <fx-button-group shape="circle" pattern="solid">
            <fx-button type="primary" icon="LeftOutlined"></fx-button>
            <fx-button type="primary" icon="HomeOutlined"></fx-button>
          </fx-button-group>
          <fx-button-group shape="round" pattern="gradient">
            <fx-button type="warning">加购物车</fx-button>
            <fx-button type="danger">立即购买</fx-button>
          </fx-button-group>
        </li>
      </ul>
    </fx-group>
  </div>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.button-group {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  background-color: #fff;

  li {
    display: flex;
    margin: 16px 0;
    padding: 0 16px;
  }
}
</style>
