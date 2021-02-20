import { inject, computed, onMounted, getCurrentInstance, defineComponent, ref, watch, toRef, openBlock, createBlock, createVNode } from 'vue';

var formMixin = {
    props: {
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change', 'reset']
};

/**
 * 将字段名转为驼峰式格式
 * @param {string} name 字段名
 */

/**
 * 深度拷贝对象
 * @param {Object} data 对象
 */
function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

function userFormItem(props, { emit }, { hookFormValue, formValue }) {
    const appFormItem = inject('appFormItem', null);
    let $input;
    const newHookFormValue = hookFormValue
        ? hookFormValue
        : function () {
            return cloneData(formValue.value);
        };
    const formName = computed(() => {
        if (appFormItem) {
            return appFormItem.name || '';
        }
        return props.name || '';
    });
    function validateAfterEventTrigger(type, value) {
        appFormItem && appFormItem.validateAfterEventTrigger(type, value);
    }
    function formReset(value) {
        formValue.value = value;
        if (value != props.value) {
            emit('update:modelValue', newHookFormValue());
        }
    }
    function getInputEl() {
        return $input;
    }
    onMounted(() => {
        const vm = getCurrentInstance();
        $input = vm.refs.input;
        // $input._app_component = {
        //   $: {
        //     uid: vm.uid
        //   },
        //   formName,
        //   formValue
        // }
    });
    return {
        formName,
        validateAfterEventTrigger,
        formReset,
        getInputEl,
        hookFormValue: newHookFormValue
    };
}

var script = defineComponent({
    name: 'fx-switch',
    mixins: [formMixin],
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx) {
        const { emit } = ctx;
        const formValue = ref(!!props.modelValue);
        const { formName, validateAfterEventTrigger, formReset, getInputEl, hookFormValue } = userFormItem(props, ctx, { formValue });
        watch(toRef(props, 'modelValue'), val => {
            val = !!val;
            if (val !== formValue.value) {
                getInputEl().checked = formValue.value = val;
            }
        });
        function onChange(e) {
            const value = !!e.target.checked;
            formValue.value = value;
            if (props.modelValue !== value) {
                emit('update:modelValue', value);
            }
            emit('change', { value });
            validateAfterEventTrigger('change', value);
        }
        function reset() {
            return formReset(getInputEl().checked);
        }
        onMounted(() => {
            const $input = getInputEl();
            $input.defaultChecked = $input.checked = formValue.value;
        });
        return {
            formName,
            formValue,
            onChange,
            reset,
            hookFormValue
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: ["fx-switch", { disabled: _ctx.disabled }]
  }, [
    createVNode("input", {
      class: "fx-switch_checkbox",
      type: "checkbox",
      disabled: _ctx.disabled,
      name: _ctx.formName,
      value: _ctx.formValue,
      onChange: _cache[1] || (_cache[1] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
      ref: "input"
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "name", "value"])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/Switch/Switch.vue";

const _Switch = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _Switch;
