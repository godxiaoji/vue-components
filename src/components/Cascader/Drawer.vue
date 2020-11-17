<template>
  <drawer ref="drawer" :title="title" align="right" :visible="true">
    <div ref="dropdown" :class="[prefix + '-cascader_groups']">
      <div
        :class="[prefix + '-cascader_group', prefix + '-vertical-hairline']"
        v-for="(list, listIndex) in dropdown"
        :key="listIndex"
      >
        <ul :class="[prefix + '-cascader_list']" :data-index="listIndex">
          <li
            :class="[
              prefix + '-cascader_item',
              prefix + '-horizontal-hairline',
              {
                selected: item.selected,
                disabled: item.disabled
              }
            ]"
            v-for="(item, index) in list"
            :key="item.value"
            :data-index="index"
            @click="onItemClick($event, item)"
          >
            <span :class="[prefix + '-cascader_item-text']">
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </drawer>
</template>

<script>
import Drawer from '../Drawer'
import { SDKKey } from '../../config'
import { array2String, getDefaultSelecteds, parseDropdownList } from './util'
import { frameTo } from '../../helpers/animation'

export default {
  name: SDKKey + '-cascader-picker',
  components: { Drawer },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    mode: String,
    separator: String,
    placeholder: String
  },
  data() {
    return {
      prefix: SDKKey,

      dropdown: [],

      labels: []
    }
  },
  computed: {
    title() {
      if (this.labels[0]) {
        return array2String(this.labels, this.mode, this.separator)
      }

      return this.placeholder || ' '
    }
  },
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    show() {
      this.$refs.drawer && this.$refs.drawer.show()
    },

    hide() {
      this.$refs.drawer && this.$refs.drawer.hide()
    },

    destroy() {
      this.$refs.drawer && this.$refs.drawer.destroy()
    },

    parseDropdown(selecteds) {
      this.labels = []
      let optionList = parseDropdownList(this.mode, 0, this.options)

      if (selecteds.length === 0) {
        // 如果没有默认值，尝试获取默认值
        selecteds = getDefaultSelecteds(this.mode)
      }

      const menuGroup = []
      const menuLabels = []
      const menuValues = []
      //   let lastGroupSelected = false

      for (let i = 0; i <= selecteds.length; i++) {
        let selected = selecteds[i]
        const menuList = []
        let nextParent = null
        // lastGroupSelected = false

        if (optionList) {
          for (let j = 0; j < optionList.length; j++) {
            let optionItem = optionList[j]

            let menuItem = {
              label: optionItem.label,
              value: optionItem.value,
              selected: false,
              hasChildren: optionItem.hasChildren,
              disabled: optionItem.disabled ? true : false
            }

            menuItem.values = menuValues.concat(menuItem.value)
            menuItem.labels = menuLabels.concat(menuItem.label)

            if (selected != null && menuItem.value === selected) {
              // 找到
              menuItem.selected = true
              //   lastGroupSelected = true

              this.labels.push(menuItem.label)

              if (menuItem.hasChildren) {
                nextParent = optionItem
              }
            }

            menuList.push(menuItem)
          }
          menuGroup.push(menuList)
        }

        if (!nextParent) {
          break
        } else {
          optionList = parseDropdownList(this.mode, i + 1, nextParent)
          menuValues.push(nextParent.value)
          menuLabels.push(nextParent.label)
        }
      }

      this.dropdown = menuGroup

      this.$nextTick(() => {
        this.afterUpdate()
      })
    },

    afterUpdate() {
      const $dropdown = this.$refs.dropdown
      const $lists = $dropdown.querySelectorAll(`.${SDKKey}-cascader_list`)
      const $selecteds = $dropdown.querySelectorAll('.selected')

      if ($lists[1]) {
        let $next
        if ($lists.length > $selecteds.length) {
          // 还有未选择
          $next = $lists[$selecteds.length]
        } else {
          // 选择完毕
          $next = $lists[$lists.length - 1]
        }

        $next = $next.parentNode
        const $groups = $next.parentNode

        let to

        if ($next.offsetWidth >= document.documentElement.offsetWidth * 0.9) {
          to = $next.offsetLeft
        } else {
          to = $next.offsetLeft - ($groups.offsetWidth - $next.offsetWidth)
        }

        if (to >= 0) {
          frameTo({
            from: $groups.scrollLeft,
            to,
            duration: 100,
            progress(res) {
              $groups.scrollLeft = res.current
            }
          })
        }

        // $next.scrollIntoView(
        //   $next.offsetWidth < document.documentElement.offsetWidth
        // )
      } else {
        $dropdown.scrollLeft = 0
      }

      $lists.forEach(($list, index) => {
        if ($selecteds[index]) {
          frameTo({
            from: $list.scrollTop,
            to: $selecteds[index].offsetTop,
            duration: 100,
            progress(res) {
              $list.scrollTop = res.current
            }
          })
        } else {
          $list.scrollTop = 0
        }
      })
    },

    /**
     * 选项点击
     */
    onItemClick(e, item) {
      if (item.disabled) {
        return
      }

      if (item.hasChildren) {
        this.parseDropdown(item.values)
      } else {
        this.$parent.onSelect(item)
      }
    }
  }
}
</script>
