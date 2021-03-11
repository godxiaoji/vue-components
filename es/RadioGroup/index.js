import { ref, inject, isRef, computed, onMounted, getCurrentInstance, reactive, provide, watch, defineComponent, openBlock, createBlock, renderSlot } from 'vue';

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
    name: 'fx-radio-group',
    props: {
        ...formItemProps,
        modelValue: {
            type: [Number, String],
            default: null
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    emits: formItemEmits,
    setup(props, ctx) {
        const formValue = ref('');
        const group = useCheckboxOrRadioGroup(props, ctx, {
            name: 'radio',
            updateValue({ isChange, uid, children, hookFormValue }) {
                let hasChecked = false;
                children.forEach(child => {
                    const checked = uid ? uid === child.uid : child.getInputChecked();
                    if (!hasChecked && checked) {
                        hasChecked = true;
                        formValue.value = child.getValue();
                        child.setChecked(true);
                    }
                    else {
                        child.setChecked(false);
                    }
                });
                if (isChange && formValue.value !== props.modelValue) {
                    ctx.emit('update:modelValue', hookFormValue());
                }
            },
            watchValue({ children, value }) {
                let hasChecked = false;
                children.forEach(child => {
                    if (!hasChecked && child.getValue() === value) {
                        hasChecked = true;
                        formValue.value = value;
                        child.setChecked(true);
                    }
                    else {
                        child.setChecked(false);
                    }
                });
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
    class: ["fx-radio-group", { vertical: !_ctx.inline, disabled: !!_ctx.disabled }],
    ref: "root"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/Radio/RadioGroup.vue";

const _RadioGroup = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _RadioGroup;
