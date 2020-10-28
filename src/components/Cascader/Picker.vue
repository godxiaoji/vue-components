<template>
  <div
    ref="dropdown"
    :class="[prefix + '-cascader_groups']"
    @mousedown.prevent="onDropdownTap"
    @scroll.stop="onDropdownTap"
  >
    <div
      :class="[prefix + '-cascader_group']"
      v-for="(list, listIndex) in dropdown"
      :key="listIndex"
    >
      <ul :class="[prefix + '-cascader_list']" :data-index="listIndex">
        <li
          :class="[prefix + '-cascader_item']"
          v-for="(item, index) in list"
          :key="item.value"
          :selected="item.selected"
          :disabled="item.disabled"
          :data-index="index"
          @click="onItemClick($event, item)"
        >
          <span :class="[prefix + '-cascader_item-text']">
            {{ item.label }}
          </span>
          <icon
            :class="[prefix + '-cascader_item-icon']"
            v-if="item.hasChildren"
            class-name="RightOutlined"
          ></icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
import { getDefaultSelecteds, parseDropdownList } from './util'
import { frameTo } from '../../helpers/animation'

export default {
  name: SDKKey + '-cascader-picker',
  components: { Icon },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    mode: String
  },
  data() {
    return {
      prefix: SDKKey,

      dropdown: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    onDropdownTap() {},

    parseDropdown(selecteds) {
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

      //   if (!lastGroupSelected) {
      //     let i = selecteds.length + 1

      //     let lastGroupFirstItem = optionList[0]

      //     if (lastGroupFirstItem) {
      //       menuGroup[menuGroup.length - 1][0].selected = true
      //     }

      //     while (lastGroupFirstItem) {
      //       if (lastGroupFirstItem.hasChildren) {
      //         menuValues.push(lastGroupFirstItem.value)
      //         menuLabels.push(lastGroupFirstItem.label)

      //         optionList = parseDropdownList(
      //           this.mode,
      //           i++,
      //           lastGroupFirstItem
      //         )

      //         const menuList = []

      //         if (optionList) {
      //           for (let j = 0; j < optionList.length; j++) {
      //             let optionItem = optionList[j]

      //             let menuItem = {
      //               label: optionItem.label,
      //               value: optionItem.value,
      //               selected: j === 0,
      //               hasChildren: optionItem.hasChildren,
      //               disabled: optionItem.disabled ? true : false
      //             }

      //             menuItem.values = menuValues.concat(menuItem.value)
      //             menuItem.labels = menuLabels.concat(menuItem.label)

      //             menuList.push(menuItem)
      //           }
      //           menuGroup.push(menuList)
      //         }

      //         lastGroupFirstItem = optionList[0]
      //       } else {
      //         break
      //       }
      //     }
      //   }

      this.dropdown = menuGroup

      this.$nextTick(() => {
        const $dropdown = this.$refs.dropdown
        const $lists = $dropdown.querySelectorAll(`.${SDKKey}-cascader_list`)
        const $selecteds = $dropdown.querySelectorAll('[selected]')

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

          if ($next.offsetWidth >= document.documentElement.offsetWidth) {
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
