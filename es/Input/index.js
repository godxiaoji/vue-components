import { defineComponent, ref, computed, watch, onMounted, resolveComponent, openBlock, createBlock, renderSlot, createCommentVNode, withDirectives, withModifiers, vShow } from 'vue';
import Icon from '../Icon';
import { isNumeric, isStringNumberMix } from '../helpers/util';
import { formatInputNumber, formatInputDigit } from '../helpers/input';
import { getEnumsValue } from '../utils/validator';
import { formItemProps, formItemEmits, useFormItem } from '../utils/form';

const TYPE_NAMES = [
    'text',
    'number',
    'digit',
    'tel',
    'password',
    'search',
    'textarea'
];
var script = defineComponent({
    name: 'fx-input',
    components: { Icon },
    props: {
        ...formItemProps,
        maxlength: {
            type: [String, Number],
            validator: isNumeric,
            default: 140
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        modelValue: {
            type: [String, Number],
            validator: isStringNumberMix,
            default: null
        },
        focus: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        showClear: {
            type: Boolean,
            default: false
        }
    },
    emits: [...formItemEmits, 'input', 'focus', 'blur'],
    setup(props, ctx) {
        const focus2 = ref(false);
        const formValue = ref('');
        const { emit } = ctx;
        const { formName, validateAfterEventTrigger, formReset, getInputEl, hookFormValue, eventEmit } = useFormItem(props, ctx, {
            formValue
        });
        function updateValue(value) {
            value = value.toString();
            switch (props.type) {
                case 'digit':
                    value = formatInputDigit(value);
                    break;
                case 'number':
                    value = formatInputNumber(value);
                    break;
            }
            const $input = getInputEl();
            let isChange = false;
            if ($input.value != value) {
                $input.value = value.toString();
            }
            value = $input.value;
            if (value !== formValue.value) {
                formValue.value = value.toString();
                isChange = true;
            }
            if (value != props.modelValue) {
                emit('update:modelValue', formValue.value);
            }
            return { value, isChange };
        }
        function updateInput(newVal) {
            const { value, isChange } = updateValue(newVal);
            isChange && emit('input', { value, type: 'input' });
        }
        let isComposition = false;
        function onCompositionStart() {
            isComposition = true;
        }
        function onCompositionEnd(e) {
            isComposition = false;
            updateInput(e.target.value);
        }
        function onFocus(e) {
            focus2.value = true;
            emit(e.type, e);
        }
        function onBlur(e) {
            focus2.value = false;
            emit(e.type, e);
            validateAfterEventTrigger(e.type, formValue.value);
        }
        function onInput(e) {
            if (!isComposition) {
                updateInput(e.target.value);
            }
        }
        function onChange(e) {
            eventEmit(e.type);
        }
        function onClear() {
            updateInput('');
        }
        const inputType = computed(() => {
            if (props.type === 'number') {
                return 'text';
            }
            if (props.type === 'digit') {
                return 'tel';
            }
            return getEnumsValue(TYPE_NAMES, props.type);
        });
        const inputMode = computed(() => {
            let mode = '';
            switch (props.type) {
                case 'search':
                    mode = 'search';
                    break;
                case 'digit':
                    mode = 'numeric';
                    break;
                case 'number':
                    mode = 'decimal';
                    break;
                case 'tel':
                    mode = 'tel';
                    break;
                case 'text':
                    mode = 'text';
                    break;
            }
            return mode;
        });
        watch(() => props.modelValue, val => {
            val != formValue.value && updateValue(val ?? '');
        });
        watch(() => props.focus, val => {
            const $input = getInputEl();
            $input && $input[val ? 'focus' : 'blur']();
        });
        onMounted(() => {
            updateValue(props.modelValue ?? '');
            const $input = getInputEl();
            $input.defaultValue = $input.value;
            props.focus && $input.focus();
        });
        return {
            formName,
            formValue,
            focus2,
            onCompositionStart,
            onCompositionEnd,
            onFocus,
            onBlur,
            onInput,
            onChange,
            onClear,
            hookFormValue,
            inputType,
            inputMode
        };
    }
});

const _hoisted_1 = {
  key: 0,
  class: "fx-input_prepend"
};
const _hoisted_2 = {
  key: 4,
  class: "fx-input_append"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon = resolveComponent("icon");

  return (openBlock(), createBlock("label", {
    class: ["fx-input", {
      'has--prepend': _ctx.$slots.prepend,
      'has--append': _ctx.$slots.append,
      'fx-textarea': _ctx.type === 'textarea',
      focus: _ctx.focus2,
      disabled: _ctx.disabled
    }]
  }, [
    (_ctx.$slots.prepend)
      ? (openBlock(), createBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "prepend")
        ]))
      : createCommentVNode("v-if", true),
    (_ctx.type === 'textarea')
      ? (openBlock(), createBlock("textarea", {
          key: 1,
          class: "fx-input_input",
          name: _ctx.formName,
          disabled: _ctx.disabled,
          placeholder: _ctx.placeholder,
          readonly: _ctx.readonly,
          maxlength: _ctx.maxlength,
          onInput: _cache[1] || (_cache[1] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
          onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
          onFocus: _cache[3] || (_cache[3] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args))),
          onBlur: _cache[4] || (_cache[4] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
          ref: "input"
        }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["name", "disabled", "placeholder", "readonly", "maxlength"]))
      : (openBlock(), createBlock("input", {
          key: 2,
          class: "fx-input_input",
          name: _ctx.formName,
          type: _ctx.inputType,
          inputmode: _ctx.inputMode,
          disabled: _ctx.disabled,
          placeholder: _ctx.placeholder,
          readonly: _ctx.readonly,
          maxlength: _ctx.maxlength,
          onInput: _cache[5] || (_cache[5] = (...args) => (_ctx.onInput && _ctx.onInput(...args))),
          onChange: _cache[6] || (_cache[6] = (...args) => (_ctx.onChange && _ctx.onChange(...args))),
          onFocus: _cache[7] || (_cache[7] = (...args) => (_ctx.onFocus && _ctx.onFocus(...args))),
          onBlur: _cache[8] || (_cache[8] = (...args) => (_ctx.onBlur && _ctx.onBlur(...args))),
          onCompositionstart: _cache[9] || (_cache[9] = (...args) => (_ctx.onCompositionStart && _ctx.onCompositionStart(...args))),
          onCompositionend: _cache[10] || (_cache[10] = (...args) => (_ctx.onCompositionEnd && _ctx.onCompositionEnd(...args))),
          ref: "input"
        }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["name", "type", "inputmode", "disabled", "placeholder", "readonly", "maxlength"])),
    (_ctx.showClear)
      ? withDirectives((openBlock(), createBlock(_component_icon, {
          key: 3,
          class: "fx-input_clear",
          icon: "CloseCircleFilled",
          onMousedown: withModifiers(_ctx.onClear, ["prevent"])
        }, null, 8 /* PROPS */, ["onMousedown"])), [
          [vShow, _ctx.formValue && _ctx.focus2]
        ])
      : createCommentVNode("v-if", true),
    (_ctx.$slots.append)
      ? (openBlock(), createBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "append")
        ]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/Input/Input.vue";

const _Input = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _Input;
