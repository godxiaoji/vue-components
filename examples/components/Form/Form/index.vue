<template>
  <div>
    <fx-group title="基础用法">
      <fx-form
        @validate-submit="onSubmit"
        @reset="onReset"
        :rules="rules"
      >
        <fx-form-item name="nickname" :label="'昵称'" required>
          <fx-input
            v-model="form.nickname"
            :placeholder="'请输入昵称'"
            @reset="onReset"
          />
        </fx-form-item>
        <fx-form-item name="gender" :label="'性别'" required>
          <fx-radio-group v-model="form.gender" :inline="true" @reset="onReset">
            <fx-radio value="1">男</fx-radio>
            <fx-radio value="2">女</fx-radio>
          </fx-radio-group>
        </fx-form-item>
        <fx-form-item name="season" :label="'季节'" required>
          <fx-picker
            v-model="form.season"
            :options="multiOptions"
            placeholder="选择季节"
            @reset="onReset"
          />
        </fx-form-item>
        <fx-form-item name="birthday" label="生日" required>
          <fx-calendar
            v-model="form.birthday"
            placeholder="选择生日"
            @reset="onReset"
          >
          </fx-calendar>
        </fx-form-item>
        <fx-form-item name="region" :label="'地区'" required>
          <fx-cascader
            initial-mode="region"
            v-model="form.region"
            :placeholder="'选择地区'"
            :format-string="formatString"
            @reset="onReset"
          ></fx-cascader>
        </fx-form-item>
        <fx-form-item name="weight" :label="'体重Kg'" required>
          <fx-slider
            v-model="form.weight"
            :min="35"
            :max="120"
            :show-value="true"
            @reset="onReset"
          ></fx-slider>
        </fx-form-item>
        <fx-form-item name="character" :label="'性格'" required>
          <fx-checkbox-group v-model="form.character" @reset="onReset">
            <fx-checkbox :value="char" v-for="char in characters" :key="char">{{
              char
            }}</fx-checkbox>
          </fx-checkbox-group>
        </fx-form-item>
        <fx-form-item name="happinessIndex" :label="'幸福指数'" required>
          <fx-rate
            v-model="form.happinessIndex"
            :allow-half="true"
            @reset="onReset"
          >
          </fx-rate>
        </fx-form-item>
        <fx-form-item name="stepper" :label="'步进器'" required>
          <fx-stepper
            v-model.number="form.stepper"
            :max="10"
            :step="0.2"
            :decimal-length="1"
            @reset="onReset"
          >
          </fx-stepper>
        </fx-form-item>
        <fx-form-item name="agree" :label="'认可'" required>
          <fx-switch v-model="form.agree" @reset="onReset" />
        </fx-form-item>
        <div class="form-btns">
          <fx-button form-type="reset">重置</fx-button>
          <fx-button type="primary" form-type="submit">提交</fx-button>
        </div>
      </fx-form>
    </fx-group>
  </div>
</template>

<script>
import { multiOptions } from '../Picker/picker-util'

export default {
  name: 'Form',
  props: {},
  data() {
    return {
      ageVisible: false,
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '请选择性别' }],
        age: [{ required: true, message: '请选择年龄' }],
        region: [{ required: true, message: '请选择地区' }],
        character: [{ required: true, message: '请选择性格' }],
        season: [{ required: true, message: '请选择季节' }],
        birthday: [{ required: true, message: '请选择生日' }],
        weight: [
          {
            min: 42.5,
            message: '太瘦的我们不要',
            type: 'number',
            trigger: 'change'
          },
          {
            max: 80,
            message: '太肥的我们不要',
            type: 'number',
            trigger: 'change'
          }
        ],
        happinessIndex: [
          {
            min: 0.5,
            message: '请选择幸福指数',
            type: 'number',
            trigger: 'change'
          },
          {
            min: 3,
            message: '你不幸福吗？',
            type: 'number',
            trigger: 'change'
          }
        ],
        agree: [
          {
            validator(rule, value, callback) {
              if (value === true) {
                callback()
              } else {
                callback(new Error('你必须认可该表单'))
              }
            }
          }
        ]
      },
      form: {
        nickname: '',
        gender: '',
        happinessIndex: 0,
        weight: 0,
        character: ['活泼'],
        season: [],
        region: [],
        stepper: 0,
        birthday: '',
        agree: false
      },
      multiOptions,
      characters: ['活泼', '内向', '高冷'],
      formatString: false,
      birthdayFormatter(value, formatter) {
        console.log(value, formatter('YYYY-MM-DD'))
        return value[0] ? formatter('YYYY-MM-DD')[0] : ''
      }
    }
  },
  created() {},
  methods: {
    onSubmit(res) {
      console.log(res)
      this.$showToast(res.vaild ? '校验通过' : '校验失败')
    },
    onReset(res) {
      console.log(res)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../../src/style/var.scss';

.form-btns {
  padding: 12px 16px;
  display: flex;
  background-color: #fff;
  border-top: 1px solid $divider-color;
}
</style>
