import { defineComponent, provide, openBlock, createBlock, withModifiers, renderSlot } from 'vue';
import { inArray, isUndefined } from '../helpers/util';
import { useGroup } from '../utils/group';

var script = defineComponent({
    name: 'fx-form',
    provide() {
        return {
            appForm: this
        };
    },
    props: {
        rules: Object
    },
    emits: ['validate-submit', 'submit', 'reset'],
    setup(props, { emit }) {
        const { children } = useGroup('form');
        function onSubmit(e) {
            const inputEls = e.target.elements;
            const value = {};
            const uids = [];
            for (let i = 0, len = inputEls.length; i < len; i++) {
                const el = inputEls[i];
                const out = el._fxFormItemOut;
                if (out) {
                    const uid = out.uid;
                    const formName = out.getFormName();
                    if (!inArray(uid, uids)) {
                        // 获取配套表单组件
                        uids.push(uid);
                        if (formName) {
                            value[formName] = out.hookFormValue();
                        }
                    }
                }
                else {
                    if (el.name) {
                        const { type, name, checked } = el;
                        if (type === 'checkbox') {
                            // 数组类型
                            if (!value[name]) {
                                value[name] = [];
                            }
                            if (checked) {
                                value[name].push(el.value);
                            }
                        }
                        else if (type === 'radio') {
                            if (value[name] == null) {
                                value[name] = '';
                            }
                            // 需要判断checked
                            if (checked) {
                                value[name] = el.value;
                            }
                        }
                        else if (type === 'select-multiple') {
                            // 多项选择，不能直接获取值
                            const selectOptions = el.options;
                            const selectedValues = [];
                            for (let i = 0; i < selectOptions.length; i++) {
                                // 如果该option被选中，则将它的value存入数组
                                if (selectOptions[i].selected) {
                                    selectedValues.push(selectOptions[i].value);
                                }
                            }
                            value[name] = selectedValues;
                        }
                        else if (type === 'text' ||
                            type === 'range' ||
                            type === 'select-one' ||
                            type === 'hidden') {
                            // input
                            value[name] = el.value;
                        }
                    }
                }
            }
            emit('submit', {
                type: 'submit',
                value
            });
            const validateEmit = (valid) => {
                emit('validate-submit', {
                    type: 'validate-submit',
                    valid,
                    value
                });
            };
            validate(value)
                .then(() => {
                validateEmit(true);
            })
                .catch(() => {
                validateEmit(false);
            });
            return false;
        }
        function validate(value) {
            const retList = [];
            children.forEach(child => {
                const formName = child.getFormName();
                if (formName && !isUndefined(value[formName])) {
                    retList.push(child.validate(value[formName]));
                }
            });
            return Promise.all(retList);
        }
        function onReset(e) {
            // const inputEls = (e.target as HTMLFormElement).elements
            // setTimeout(() => {
            //   const value = {}
            //   const uids = []
            //   inputEls.forEach(el => {
            //     const _ac = el._app_component
            //     if (
            //       _ac &&
            //       !inArray(_ac.$.uid, uids) // 主要用于排重checbox等多选的情况
            //     ) {
            //       // 获取配套表单组件
            //       uids.push(_ac.$.uid)
            //       if (_ac.reset) {
            //         _ac.reset()
            //       }
            //       if (_ac.formName || _ac.name) {
            //         value[_ac.formName || _ac.name] = _ac.hookFormValue
            //           ? _ac.hookFormValue()
            //           : _ac.formValue
            //       }
            //     } else {
            //       // 原生组件
            //     }
            //   })
            //   emit(e.type, {
            //     value
            //   })
            // }, 17)
        }
        provide('fxFormRules', props.rules);
        return {
            onSubmit,
            onReset
        };
    },
    methods: {}
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("form", {
    class: "fx-form",
    onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.onSubmit && _ctx.onSubmit(...args)), ["prevent"])),
    onReset: _cache[2] || (_cache[2] = (...args) => (_ctx.onReset && _ctx.onReset(...args)))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 32 /* HYDRATE_EVENTS */))
}

script.render = render;
script.__file = "src/Form/Form.vue";

const _Form = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _Form;
