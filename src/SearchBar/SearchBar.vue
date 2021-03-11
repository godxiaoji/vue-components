<template>
  <div class="fx-search">
    <form
      class="fx-search_inner"
      :class="{ 'has--cancel': showCancel }"
      @submit.prevent="onSearch(searchText)"
      ref="inner"
      :style="{ background }"
    >
      <fx-input
        class="fx-search_field"
        :class="{ ghost: !!ghost }"
        :placeholder="placeholder"
        type="search"
        :disabled="readonly"
        v-model="searchText"
        :focus="focus"
        :maxlength="maxlength"
        showClear
        @input="onInput"
        @focus="proxyEvent"
        @blur="proxyEvent"
        @click="onClick"
      >
        <template #prepend>
          <icon icon="SearchOutlined"></icon>
        </template>
      </fx-input>
      <button class="fx-search_button">Search</button>
      <fx-button
        class="fx-search_cancel-button"
        size="large"
        type="default"
        pattern="borderless"
        :ghost="ghost"
        v-if="showCancel"
        @click="onCancel"
      >
        取消
      </fx-button>
    </form>
    <dropdown
      :selector="$refs.inner"
      v-if="enableDropdown"
      v-model:visible="suggestVisible"
    >
      <template #default="{ height }">
        <div
          class="fx-search_suggest fx-horizontal-hairline"
          :style="{ height: height + 'px' }"
        >
          <div class="fx-search_suggest-list">
            <cell
              v-for="item in suggestList"
              :key="item.text"
              :label="item.text"
              class="fx-search_suggest-item"
              clickable
              @click="onSuggestItemClick(item.text)"
            >
              <tag v-for="tag in item.tags" :key="tag">{{ tag }}</tag>
            </cell>
          </div>
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive, ref, watch } from 'vue'
import Icon from '../Icon'
import FxInput from '../Input'
import FxButton from '../Button'
import Dropdown from '../Dropdown'
import Cell from '../Cell'
import Tag from '../Tag'
import {
  isArray,
  isObject,
  isString,
  isStringArray,
  isStringNumberMix
} from '../helpers/util'

type Placeholders = string | string[]

interface SuggestItem {
  text: string | number
  tags?: string[]
}
type SuggestList = (string | number | SuggestItem)[]

export default defineComponent({
  name: 'fx-search-bar',
  components: { Icon, FxInput, FxButton, Dropdown, Cell, Tag },
  props: {
    ghost: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 100
    },
    // 背景颜色
    background: {
      type: String,
      default: null
    },
    placeholders: {
      validator: (val: Placeholders) => {
        return isString(val) || isStringArray(val)
      },
      default: () => []
    },
    placeholderInterval: {
      type: Number,
      default: 5000
    }
  },
  emits: ['input', 'click', 'search', 'cancel', 'focus', 'blur'],
  setup(props, { emit }) {
    const placeholder = ref('')
    const searchText = ref('')
    const enableDropdown = ref(false)
    const suggestVisible = ref(false)
    const suggestList = reactive<SuggestItem[]>([])

    function proxyEvent(e: Event) {
      const text = searchText.value

      emit(
        e.type as 'focus',
        {
          type: e.type,
          text
        },
        (res: SuggestList) => {
          setSuggestList(res, text !== searchText.value)
        }
      )
    }

    function onInput(e: { value: string; type: string }) {
      const text = e.value

      emit(
        e.type as 'input',
        {
          type: e.type,
          text
        },
        (res: SuggestList) => {
          setSuggestList(res, text !== searchText.value)
        }
      )
    }

    function setSuggestList(res: SuggestList, expired: boolean) {
      if (expired) {
        return
      }

      suggestList.length = 0

      if (isArray(res)) {
        res.forEach(v => {
          if (isStringNumberMix(v)) {
            suggestList.push({
              text: (v as string | number).toString(),
              tags: []
            })
          } else if (isObject(v)) {
            v = v as SuggestItem

            if (isStringNumberMix(v.text)) {
              v.text = v.text.toString()
              v.tags = isStringArray(v.tags) ? v.tags : []
              suggestList.push(v)
            }
          }
        })
      }

      if (suggestList.length > 0) {
        enableDropdown.value = true
        suggestVisible.value = true
      } else {
        suggestVisible.value = false
      }
    }

    function onSearch(text: string, source = 'search') {
      suggestVisible.value = false

      if (text === '' && placeholder.value) {
        searchText.value = text = placeholder.value
      }

      emit('search', {
        text,
        source
      })
    }

    function onSuggestItemClick(text: string) {
      searchText.value = text

      onSearch(text, 'suggest')
    }

    function onCancel() {
      emit('cancel', { type: 'cancel' })
    }

    function onClick(e: Event) {
      emit(e.type as 'click', {
        type: e.type,
        searchText: searchText.value || placeholder.value
      })
    }

    let placeholderTimer: number
    let placeholderIndex = 0

    onBeforeUnmount(() => clearInterval(placeholderTimer))

    watch(
      () => props.placeholders,
      (val: Placeholders) => {
        clearInterval(placeholderTimer)

        if (isString(val)) {
          placeholder.value = val as string
        } else if (isStringArray(val)) {
          placeholderIndex = 0
          placeholder.value = val[placeholderIndex]

          placeholderTimer = window.setInterval(() => {
            placeholderIndex = (placeholderIndex + 1) % val.length
            placeholder.value = val[placeholderIndex]
          }, props.placeholderInterval)
        } else {
          placeholder.value = ''
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    return {
      placeholder,
      enableDropdown,
      suggestVisible,
      suggestList,
      searchText,
      proxyEvent,
      onInput,
      onSearch,
      onSuggestItemClick,
      onCancel,
      onClick
    }
  }
})
</script>
