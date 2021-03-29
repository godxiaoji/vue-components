<template>
  <div
    class="fx-image-uploader"
    :class="['column-' + columnNumber]"
    v-bind="$attrs"
  >
    <order
      :columnNumber="columnNumber"
      :deletable="deletable"
      :items="orderItems"
      @delete="onDelete"
      @update:orderItems="onUpdateOptions"
    >
      <template #default="{ item }">
        <div
          class="fx-image-uploader_upload-button"
          :class="{ disabled: !!disabled }"
          v-if="item.isAdd"
          @contextmenu.prevent="noop"
        >
          <icon icon="PlusOutlined"></icon>
          <input
            type="file"
            name=""
            :accept="accept2"
            :disabled="disabled"
            :multiple="multiple"
            @change="onAddFiles"
          />
        </div>
        <div
          class="fx-image-uploader_item"
          v-else
          @contextmenu.prevent="noop"
          @click="onItemClick(item)"
        >
          <fx-image :src="item.url" :draggable="false" :mode="imageMode" />
          <div
            class="fx-image-uploader_item-status"
            v-if="item.status !== 'uploaded' && item.status !== 'reading'"
          >
            <icon
              icon="LoadingOutlined"
              spin
              v-if="item.status === 'uploading'"
            ></icon>
            <icon
              icon="DeleteOutlined"
              v-else-if="item.status === 'failed'"
            ></icon>
            <span>{{ item.message }}</span>
          </div>
        </div>
      </template>
    </order>
    <input
      type="hidden"
      :name="formName"
      :value="formValue.join(',')"
      ref="input"
    />
  </div>
  <image-preview
    class="fx-image-uploader_preview"
    :urls="formValue"
    v-model:visible="previewVisible"
    v-model:current="previewCurrent"
    showClose
  >
    <template #close="{ activeIndex }">
      <fx-button
        @click.stop="onPreviewDelete(activeIndex)"
        icon="DeleteOutlined"
        size="large"
        pattern="borderless"
        shape="square"
        :ghost="true"
      ></fx-button>
    </template>
  </image-preview>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  computed,
  watch,
  ref,
  onMounted
} from 'vue'
import FxImage from '@/Image'
import FxButton from '@/Button'
import Icon from '@/Icon'
import Order from '@/Order'
import ImagePreview from '@/ImagePreview'
import Dialog from '@/Dialog'
import {
  isPromiseLike,
  isString,
  isStringArray,
  isBoolean,
  isSameArray,
  cloneData
} from '@/helpers/util'
import { formatFileSize } from '@/helpers/file'
import { DataObject } from '../helpers/types'
import { useFormItem, formItemEmits, formItemProps } from '@/hooks/form'
import { ImageModes } from '../Image/types'

type Accept = 'all' | 'png' | 'jpeg' | 'jpg' | 'webp'
type UploadStatus = 'reading' | 'uploading' | 'uploaded' | 'failed'

interface FileItem {
  id: number
  url?: string
  status: UploadStatus
  message: string
}

interface AddButton {
  id: number
  isAdd: boolean
  draggable: boolean
}

type Options = (FileItem | AddButton)[]

interface BeforeUploadHandlers {
  formatSize(size: number): string
}

interface UploadHandlers {
  getUploadId(): number
  formatSize(size: number): string
  setUploading(message: string): void
  fail(e?: string | Error): void
  success(url: string): void
}

const ACCEPT_TYPES = new Map([
  ['all', 'image/*'],
  ['png', 'image/png'],
  ['jpeg', 'image/jpeg'],
  ['jpg', 'image/jpeg'],
  ['webp', 'image/webp']
])

function getAccepts(val: string | string[]) {
  const arr = isStringArray(val)
    ? (val as string[])
    : isString(val)
    ? [val as string]
    : []
  let ret: string[] = []

  for (let i = 0; i < arr.length; i++) {
    const accept = ACCEPT_TYPES.get(arr[i])

    if (arr[i] === 'all') {
      ret = [accept as string]
      break
    } else if (accept) {
      ret.push(accept)
    }
  }

  return ret
}

export default defineComponent({
  name: 'fx-image-uploader',
  components: { Order, Icon, ImagePreview, FxButton, FxImage },
  props: {
    ...formItemProps,
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [] as string[]
    },
    // 允许上传的图片类型
    accept: {
      type: [String, Array],
      validator: (val: Accept | Accept[]) => {
        return getAccepts(val).length > 0
      },
      default: 'all'
    },
    // 多少列展示
    columnNumber: {
      type: Number,
      default: 3
    },
    maxCount: {
      type: Number,
      default: 9
    },
    // 点击图片预览全图
    preview: {
      type: Boolean,
      default: true
    },
    // 支持多图片上传
    multiple: {
      type: Boolean,
      default: false
    },
    // 允许删除
    deletable: {
      type: Boolean,
      default: true
    },
    // 图片填充模式
    imageMode: {
      type: String as PropType<ImageModes>,
      default: 'aspectFill'
    },
    // 上传前处理函数，主要是判断大小，压缩等
    beforeUpload: {
      type: Function as PropType<
        (
          file: File,
          handlers: BeforeUploadHandlers
        ) => boolean | Promise<boolean>
      >,
      default: () => true
    },
    // 上传函数，在该函数内处理上传过程
    uploadReady: {
      type: Function as PropType<
        (file: File, handlers: UploadHandlers) => void
      >,
      default: () => true
      // required: true
    }
  },
  emits: [...formItemEmits, 'delete'],
  setup(props, ctx) {
    const { emit } = ctx
    let uid = 1

    const orderItems = reactive<Options>([])
    const formValue = reactive<string[]>([])
    const previewVisible = ref(false)
    const previewCurrent = ref('')

    const {
      formName,
      validateAfterEventTrigger,
      getInputEl,
      hookFormValue,
      eventEmit
    } = useFormItem<string>(props, ctx, {
      formValue,
      hookResetValue: input => (input.value ? input.value.split(',') : [])
    })

    function onAddFiles(e: Event) {
      const files = (e.target as HTMLInputElement).files || []

      for (let i = 0; i < files.length; i++) {
        addFile(files[i])
      }
    }

    function addFile(file: File) {
      beforePromise(
        props.beforeUpload(file, {
          formatSize: formatFileSize
        })
      ).then(res => {
        if (res instanceof File) {
          file = res
          res = true
        }

        res && uploadFile(file)
      })
    }

    function uploadFile(file: File) {
      if (orderItems.length - (hasUploadButton() ? 1 : 0) >= props.maxCount) {
        return
      }

      const fileItem: FileItem = {
        id: ++uid,
        status: 'reading',
        message: 'Reading'
      }

      orderItems.splice(
        orderItems.length - (hasUploadButton() ? 1 : 0),
        0,
        fileItem
      )

      updateUploadButton()

      props.uploadReady(file, createUploadHandlers(fileItem.id))
    }

    function beforePromise(res: boolean | Promise<boolean>) {
      if (isBoolean(res)) {
        return Promise.resolve(res)
      } else if (isPromiseLike(res)) {
        return (res as Promise<any>)
          .then(res => {
            if (res instanceof File) {
              return res
            }

            return !!res
          })
          .catch(() => {
            return false
          })
      }

      return Promise.resolve(res instanceof File ? res : true)
    }

    function getFileItemById(id: number) {
      for (let i = 0; i < orderItems.length; i++) {
        if (orderItems[i].id === id) {
          return orderItems[i]
        }
      }
      return null
    }

    /**
     * 是否完成上传
     */
    function isDone(fileItem: FileItem) {
      return fileItem.status === 'failed' || fileItem.status === 'uploaded'
    }

    function createUploadHandlers(id: number): UploadHandlers {
      return {
        getUploadId: () => id,
        formatSize: formatFileSize,
        setUploading(message) {
          const fileItem = getFileItemById(id) as FileItem

          if (fileItem && !isDone(fileItem)) {
            fileItem.status = 'uploading'
            fileItem.message = message || 'Uploading'
          }
        },
        fail(e) {
          const fileItem = getFileItemById(id) as FileItem

          if (fileItem && !isDone(fileItem)) {
            if (e instanceof Error) {
              fileItem.message = e.message
            } else if (e) {
              fileItem.message = e.toString()
            } else {
              fileItem.message = 'Failed'
            }
            fileItem.status = 'failed'
          }
        },
        success(url) {
          const fileItem = getFileItemById(id) as FileItem

          if (fileItem && !isDone(fileItem)) {
            fileItem.url = url
            fileItem.status = 'uploaded'
            fileItem.message = 'Uploaded'
            urlId(url, id)

            updateValue()
          }
        }
      }
    }

    function updateValue() {
      const value: string[] = []

      orderItems.forEach(fileItem => {
        fileItem = fileItem as FileItem

        if (fileItem.status === 'uploaded' && fileItem.url) {
          value.push(fileItem.url)
        }
      })

      if (!isSameArray(value, formValue)) {
        formValue.splice(0, Infinity, ...value)

        emit('update:modelValue', hookFormValue())
        eventEmit('change')
      }
    }

    /**
     * 是否存在添加按钮
     */
    function hasUploadButton() {
      if (orderItems.length === 0) {
        return false
      }

      return (orderItems[orderItems.length - 1] as AddButton).isAdd || false
    }

    function updateUploadButton() {
      if (hasUploadButton()) {
        if (orderItems.length > props.maxCount) {
          // 超过要删掉按钮
          orderItems.splice(orderItems.length - 1, 1)
        }
      } else {
        if (orderItems.length < props.maxCount) {
          orderItems.push({
            id: 1,
            isAdd: true,
            draggable: false
          })
        }
      }
    }

    function isSameUploadedList() {
      const value = cloneData(props.modelValue)

      for (let i = 0; i < orderItems.length; i++) {
        const fileItem = orderItems[i] as FileItem

        if (fileItem.status === 'uploaded') {
          if (value.length === 0) {
            // orderItems 还有 value 没了
            return false
          }

          if (fileItem.url === value[0]) {
            value.shift()
          } else {
            return false
          }
        }
      }

      return value.length === 0
    }

    function updateUploadedList() {
      if (isSameUploadedList()) {
        return
      }

      const cache: FileItem[] = []

      orderItems.forEach(v => {
        if ((v as FileItem).status === 'uploading') {
          cache.push(v as FileItem)
        }
      })

      orderItems.splice(0, Infinity)
      formValue.splice(0, Infinity)

      props.modelValue.forEach(url => {
        orderItems.push({
          id: urlId(url),
          status: 'uploaded',
          url: url,
          message: '上传成功'
        })

        formValue.push(url)
      })

      cache.length > 0 && orderItems.push(...cache)

      updateUploadButton()
    }

    function onUpdateOptions(_options: Options) {
      orderItems.splice(0, Infinity, ..._options)
      updateUploadButton()

      updateValue()
    }

    const urlIdCache: DataObject<number> = {}

    function urlId(url: string, id?: number) {
      url = url.substr(-100)

      if (id) {
        urlIdCache[url] = id
        return id
      }

      return urlIdCache[url] || (urlIdCache[url] = ++uid)
    }

    function onItemClick(item: FileItem) {
      if (item.status === 'uploaded') {
        if (props.preview) {
          previewCurrent.value = item.url as string
          previewVisible.value = true
        }
      } else if (item.status === 'failed') {
        for (let i = 0; i < orderItems.length; i++) {
          if (orderItems[i].id === item.id) {
            orderItems.splice(i, 1)
            updateUploadButton()
          }
        }
      }
    }

    function onDelete({ index, item }: { index: number; item: FileItem }) {
      emit('delete', {
        index,
        item: {
          id: item.id,
          status: item.status,
          url: item.url || null
        }
      })
    }

    function onPreviewDelete(activeIndex: number) {
      const current = formValue[activeIndex]

      for (let i = 0, j = 0; i < orderItems.length; i++) {
        const optionItem = orderItems[i] as FileItem

        if (optionItem.status === 'uploaded') {
          if (j === activeIndex && optionItem.url === current) {
            Dialog.showDialog({
              content: '要删除这张图片吗？',
              confirmText: '删除'
            }).then((res: { confirm: boolean }) => {
              if (res.confirm) {
                orderItems.splice(i, 1)
                updateUploadButton()
                updateValue()

                if (formValue.length === 0) {
                  previewVisible.value = false
                }
              }
            })

            break
          }

          j++
        }
      }
    }

    function noop() {}

    const accept2 = computed(() => {
      return getAccepts(props.accept as string).join(', ')
    })

    watch(() => props.modelValue, updateUploadedList, {
      immediate: true,
      deep: true
    })

    watch(() => props.maxCount, updateUploadButton)

    updateUploadButton()

    onMounted(() => {
      const $input = getInputEl() as HTMLInputElement

      $input.defaultValue = $input.value
    })

    return {
      formName,
      formValue,
      validateAfterEventTrigger,
      orderItems,
      accept2,
      onAddFiles,
      onUpdateOptions,
      onItemClick,
      onDelete,
      previewVisible,
      previewCurrent,
      onPreviewDelete,
      noop
    }
  }
})
</script>
