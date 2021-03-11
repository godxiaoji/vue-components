import { ref, inject, isRef, computed, onMounted, getCurrentInstance, defineComponent, watch, openBlock, createBlock, createVNode } from 'vue';

/**
 * 将字段名转为驼峰式格式
 * @param {string} name 字段名
 */
/**
 * 深度拷贝对象
 * @param object 对象
 */
function cloneData(object) {
    return JSON.parse(JSON.stringify(object));
}

const formItemEmits = ['update:modelValue', 'change', 'reset'];
const formItemProps = {
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
};
function useFormItem(props, { emit }, { hookFormValue, formValue }) {
    const root = ref();
    const formItem = inject('fxFormItem', null);
    let $input;
    const newHookFormValue = hookFormValue
        ? hookFormValue
        : function () {
            return isRef(formValue) ? formValue.value : cloneData(formValue);
        };
    const formName = computed(() => {
        if (formItem) {
            return formItem.props.name || '';
        }
        return props.name || '';
    });
    function validateAfterEventTrigger(type, value) {
        formItem && formItem.validateAfterEventTrigger(type, value);
    }
    function formReset(value) {
        if (isRef(formValue)) {
            formValue.value = value;
        }
        if (value != props.value) {
            emit('update:modelValue', newHookFormValue());
        }
    }
    function eventEmit(type) {
        const value = newHookFormValue();
        emit(type, {
            type,
            value
        });
        validateAfterEventTrigger(type, value);
    }
    function getInputEl() {
        return $input;
    }
    function setItemOut($el, uid) {
        $el._fxFormItemOut = {
            uid,
            getFormName() {
                return formItem?.props.name || '';
            },
            hookFormValue: newHookFormValue
        };
    }
    onMounted(() => {
        const vm = getCurrentInstance();
        $input = vm.refs.input;
        if (!$input) {
            const $inputs = root.value.querySelectorAll('.fx-form-input');
            for (let i = 0; i < $inputs.length; i++) {
                setItemOut($inputs[i], vm.uid);
            }
        }
        else {
            setItemOut($input, vm.uid);
        }
        // $input._app_component = {
        //   $: {
        //     uid: vm.uid
        //   },
        //   formName,
        //   formValue
        // }
    });
    return {
        root,
        formName,
        validateAfterEventTrigger,
        formReset,
        getInputEl,
        hookFormValue: newHookFormValue,
        eventEmit
    };
}

var script = defineComponent({
    name: 'fx-switch',
    props: {
        ...formItemProps,
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    emits: formItemEmits,
    setup(props, ctx) {
        const { emit } = ctx;
        const formValue = ref(!!props.modelValue);
        const { formName, validateAfterEventTrigger, formReset, getInputEl, hookFormValue, eventEmit } = useFormItem(props, ctx, { formValue });
        watch(() => props.modelValue, val => {
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
            eventEmit(e.type);
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
            hookFormValue,
            validateAfterEventTrigger
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
