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
        @click.native="onClick"
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
      :visible.sync="suggestVisible"
    >
      <template #default="{ height }">
        <div class="fx-search_suggest" :style="{ height: height + 'px' }">
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

<script>
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

export default {
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
      validator(val) {
        return isString(val) || isStringArray(val)
      },
      default() {
        return []
      }
    },
    placeholderInterval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      placeholder: '',
      placeholderIndex: 0,
      searchText: '',
      enableDropdown: false,
      suggestVisible: false,
      suggestList: []
    }
  },
  watch: {
    placeholders: {
      immediate: true,
      handler(val) {
        clearInterval(this.placeholderTimer)

        if (isString(val)) {
          this.placeholder = val
        } else if (isStringArray(val)) {
          this.placeholderIndex = 0
          this.placeholder = val[this.placeholderIndex]

          this.placeholderTimer = setInterval(() => {
            this.placeholderIndex = (this.placeholderIndex + 1) % val.length
            this.placeholder = val[this.placeholderIndex]
          }, this.placeholderInterval)
        } else {
          this.placeholder = ''
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.placeholderTimer)
  },
  methods: {
    proxyEvent(e) {
      const searchText = this.searchText

      this.$emit(
        e.type,
        {
          type: e.type,
          text: searchText
        },
        res => {
          this.setSuggestList(res, searchText !== this.searchText)
        }
      )
    },
    onInput(e) {
      const searchText = e.value

      this.$emit(
        'input',
        {
          type: e.type,
          text: searchText
        },
        res => {
          this.setSuggestList(res, searchText !== this.searchText)
        }
      )
    },
    setSuggestList(res, expired) {
      if (expired) {
        return
      }

      const suggestList = []

      if (isArray(res)) {
        res.forEach(v => {
          if (isStringNumberMix(v)) {
            suggestList.push({
              text: v.toString(),
              tags: []
            })
          } else if (isObject(v) && isStringNumberMix(v.text)) {
            v.text = v.text.toString()
            v.tags = isStringArray(v.tags) ? v.tags : []
            suggestList.push(v)
          }
        })
      }

      if (suggestList.length > 0) {
        this.enableDropdown = true
        this.suggestVisible = true
      } else {
        this.suggestVisible = false
      }

      this.suggestList = suggestList
    },
    onSearch(text, source = 'search') {
      this.suggestVisible = false

      if (text === '' && this.placeholder) {
        this.searchText = text = this.placeholder
      }

      this.$emit('search', {
        text,
        source
      })
    },
    onSuggestItemClick(text) {
      this.searchText = text

      this.onSearch(text, 'suggest')
    },
    onCancel() {
      this.$emit('cancel', { type: 'cancel' })
    },
    onClick(e) {
      this.$emit(e.type, {
        type: e.type,
        searchText: this.searchText || this.placeholder
      })
    }
  }
}
</script>
