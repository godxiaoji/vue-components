import { defineComponent, openBlock, createBlock, createVNode, renderSlot, createTextVNode } from 'vue';

var script = defineComponent({
    name: 'fx-copy',
    props: {
        // 需要复制的文本
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        /**
         * 复制
         */
        onCopy(e) {
            const $el = this.$el;
            try {
                $el.firstElementChild.select();
                document.execCommand('Copy');
                this.$emit('success', {
                    text: $el.firstElementChild.value
                });
            }
            catch (error) {
                this.$emit('error', error);
            }
            this.$emit(e.type, e);
        }
    }
});

const _hoisted_1 = { class: "fx-copy_box" };
const _hoisted_2 = /*#__PURE__*/createTextVNode("复制");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: "fx-copy",
    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onCopy && _ctx.onCopy(...args)))
  }, [
    createVNode("input", {
      type: "text",
      value: _ctx.text,
      class: "fx-copy_input"
    }, null, 8 /* PROPS */, ["value"]),
    createVNode("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        _hoisted_2
      ])
    ])
  ]))
}

script.render = render;
script.__file = "src/Copy/Copy.vue";

const _Copy = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _Copy;
