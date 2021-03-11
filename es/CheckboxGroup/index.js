import { ref, inject, isRef, computed, onMounted, getCurrentInstance, reactive, provide, watch, defineComponent, openBlock, createBlock, renderSlot } from 'vue';

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
 * 是否数组
 * @param object 值
 */
function isArray(object) {
    return Array.isArray(object);
}
/**
 * 是否只存在数值或者字符串的数组
 * @param object 值
 */
const isStringNumberMixArray = (object) => {
    let is = false;
    if (isArray(object)) {
        is = true;
        for (let i = 0; i < object.length; i++) {
            if (!(isString(object[i]) || isNumber(object[i]))) {
                is = false;
                break;
            }
        }
    }
    return is;
};
/**
 * 是否相同的数组
 * @param {Array} a 数组a
 * @param {Array} b 数组b
 */
function isSameArray(a, b) {
    if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}
/**
 * 深度拷贝对象
 * @param object 对象
 */
function cloneData(object) {
    return JSON.parse(JSON.stringify(object));
}
/**
 * 判断值是否在数组中
 * @param value 值
 * @param array 数组
 */
function inArray(value, array) {
    return array.indexOf(value) !== -1;
}
/**
 * 首字母大写
 * @param value 值
 */
function capitalize(value) {
    if (!value)
        return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
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

function getKey(name) {
    return `fx${capitalize(name)}Group`;
}
function useGroup(name) {
    const children = reactive([]);
    provide(getKey(name), {
        addChild(obj) {
            children.push(obj);
        },
        removeChild(obj) {
            children.splice(children.indexOf(obj), 1);
        }
    });
    return {
        children
    };
}

function useCheckboxOrRadioGroup(props, ctx, { name, updateValue, watchValue, formValue }) {
    const { children } = useGroup(name);
    const { formName, validateAfterEventTrigger, hookFormValue, eventEmit, root } = useFormItem(props, ctx, { formValue });
    function _updateValue(isChange, uid) {
        updateValue({ isChange, children, uid, hookFormValue });
    }
    function onChange(uid) {
        _updateValue(true, uid);
        eventEmit('change');
    }
    function reset() {
        _updateValue(true);
    }
    watch(() => props.modelValue, value => {
        watchValue({ children, value });
    }, {
        deep: true
    });
    onMounted(() => _updateValue(false));
    provide(`fx${capitalize(name)}Options`, {
        props,
        onChange
    });
    return {
        root,
        formName,
        formValue,
        validateAfterEventTrigger,
        hookFormValue,
        reset,
        onChange
    };
}

var script = defineComponent({
    name: 'fx-checkbox-group',
    props: {
        ...formItemProps,
        modelValue: {
            type: Array,
            validator: isStringNumberMixArray,
            default: () => []
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    emits: formItemEmits,
    setup(props, ctx) {
        const formValue = reactive([]);
        const group = useCheckboxOrRadioGroup(props, ctx, {
            name: 'checkbox',
            updateValue({ isChange, children, hookFormValue }) {
                const value = [];
                children.forEach(child => {
                    if (child.getInputChecked()) {
                        value.push(cloneData(child.getValue()));
                    }
                });
                formValue.splice(0, Infinity, ...value);
                if (isChange && !isSameArray(value, props.modelValue)) {
                    ctx.emit('update:modelValue', hookFormValue());
                }
            },
            watchValue({ children, value }) {
                value = value;
                if (isStringNumberMixArray(value) && !isSameArray(value, formValue)) {
                    formValue.length = 0;
                    children.forEach(child => {
                        const checked = inArray(child.getValue(), value);
                        child.setChecked(checked);
                        checked && formValue.push(child.getValue());
                    });
                }
            },
            formValue
        });
        return {
            ...group,
            formValue
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["fx-checkbox-group", { vertical: !_ctx.inline, disabled: !!_ctx.disabled }],
    ref: "root"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/Checkbox/CheckboxGroup.vue";

const _CheckboxGroup = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _CheckboxGroup;
