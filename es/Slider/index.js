import { ref, inject, isRef, computed, onMounted, getCurrentInstance, defineComponent, watch, nextTick, openBlock, createBlock, createVNode, toDisplayString } from 'vue';

/**
 * 将字段名转为驼峰式格式
 * @param {string} name 字段名
 */
/**
 * 是否字符串
 * @param object 值
 */
const isString = (object) => {
    return typeof object === 'string';
};
/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param object 值
 */
function isNumber(object) {
    return typeof object === 'number' && isFinite(object);
}
/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param object 值
 */
const isNumeric = (object) => {
    return (isNumber(object) ||
        (isString(object) &&
            !isNaN(parseFloat(object)) &&
            isFinite(parseFloat(object))));
};
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
    name: 'fx-slider',
    props: {
        ...formItemProps,
        modelValue: {
            type: [Number, String],
            validator: isNumeric,
            default: null
        },
        min: {
            type: [Number, String],
            validator: isNumeric,
            default: 0
        },
        max: {
            type: [Number, String],
            validator: isNumeric,
            default: 100
        },
        step: {
            type: [Number, String],
            validator: isNumeric,
            default: 1
        },
        showValue: {
            type: Boolean,
            default: false
        }
    },
    emits: [...formItemEmits, 'input'],
    setup(props, ctx) {
        const formValue = ref('');
        const { emit } = ctx;
        const { formName, validateAfterEventTrigger, formReset, getInputEl, hookFormValue, eventEmit } = useFormItem(props, ctx, {
            formValue,
            hookFormValue() {
                return parseFloat(formValue.value);
            }
        });
        function updateValue() {
            formValue.value = getInputEl().value;
        }
        function inputModel() {
            if (props.modelValue == null ||
                formValue.value !== props.modelValue.toString()) {
                emit('update:modelValue', hookFormValue());
            }
        }
        function onInput(e) {
            formValue.value = e.target.value;
            inputModel();
            eventEmit(e.type);
        }
        function onChange(e) {
            eventEmit(e.type);
        }
        function reset() {
            return formReset(getInputEl().value);
        }
        const progress = computed(() => {
            return (((parseFloat(formValue.value) - parseFloat(props.min)) /
                (parseFloat(props.max) - parseFloat(props.min))) *
                100 +
                '%');
        });
        watch(() => props.modelValue, val => {
            formValue.value = val.toString();
            nextTick(() => {
                updateValue();
            });
        });
        watch([() => props.min, () => props.max], () => {
            nextTick(() => {
                updateValue();
                inputModel();
            });
        });
        onMounted(() => {
            formValue.value = getInputEl().value;
            inputModel();
        });
        return {
            progress,
            onChange,
            onInput,
            reset,
            formName,
            formValue,
            validateAfterEventTrigger
        };
    }
});

const _hoisted_1 = { class: "fx-slider_inner" };
const _hoisted_2 = { class: "fx-slider_box" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["fx-slider", { disabled: !!_ctx.disabled }]
  }, [
    createVNode("div", _hoisted_1, [
      createVNode("div", _hoisted_2, [
        createVNode("div", {
          class: "fx-slider_track",
          style: [{ width: _ctx.progress }]
        }, null, 4 /* STYLE */),
        createVNode("div", {
          class: "fx-slider_thumb",
          style: [{ left: _ctx.progress }]
        }, toDisplayString(_ctx.showValue ? _ctx.formValue : ''), 5 /* TEXT, STYLE */)
      ]),
      createVNode("input", {
        class: "fx-slider_range",
        type: "range",
        disabled: _ctx.disabled,
        value: _ctx.formValue,
        min: _ctx.min,
        max: _ctx.max,
        step: _ctx.step,
        name: _ctx.formName,
        onInput: _cache[1] || (_cache[1] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
        onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
        ref: "input"
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["disabled", "value", "min", "max", "step", "name"])
    ])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/Slider/Slider.vue";

const _Slider = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _Slider;
