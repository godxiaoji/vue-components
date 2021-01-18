<template>
  <div
    :class="[
      prefix + '-toast',
      prefix + '-popup',
      { visible: visible2, 'forbid-click': mask }
    ]"
    :style="popupStyles"
    v-show="isShow"
  >
    <div :class="[prefix + '-toast_box', { 'has--icon': !!iconName }]">
      <icon
        v-if="iconName"
        :class="[prefix + '-toast_icon']"
        :icon="iconName"
        :spin="type === 'loading'"
      />
      <div :class="[prefix + '-toast_text']">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import popupMixin from '../util/popup-mixin'
import { isUndefined } from '../helpers/util'
import { iconValidator } from '../helpers/validator'

const TYPE_MAP = {
  default: null,
  success: 'CheckCircleOutlined',
  loading: 'LoadingOutlined',
  fail: 'CloseCircleOutlined'
}

export default {
  name: SDKKey + '-toast',
  components: { Icon },
  mixins: [popupMixin],
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      validator(val) {
        return !isUndefined(TYPE_MAP[val])
      },
      default: 'default'
    },
    icon: {
      validator: iconValidator,
      default: null
    },
    mask: {
      type: Boolean,
      default: false
    },
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { prefix: SDKKey, forbidScroll: false }
  },
  computed: {
    iconName() {
      if (this.icon) {
        return this.icon
      } else if (TYPE_MAP[this.type]) {
        return TYPE_MAP[this.type]
      }

      return null
    }
  },
  beforeDestroy() {
    this.removeAutoClose()
  },
  methods: {
    setAutoClose() {
      if (this.duration > 0) {
        this.durationTimer = setTimeout(() => {
          this.close('auto')
        }, this.duration)
      }
    },
    close(source) {
      this.customCancel(source, true)
    },
    afterCancel() {
      this.removeAutoClose()
    },
    removeAutoClose() {
      clearTimeout(this.durationTimer)
    },
    afterShow() {
      this.setAutoClose()
    }
  }
}
</script>
