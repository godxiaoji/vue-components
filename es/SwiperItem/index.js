import { defineComponent, ref, inject, onMounted, onUnmounted, onUpdated, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
    name: 'fx-swiper-item',
    setup() {
        const root = ref();
        const update = inject('fxSwiperUpdate', (lazy) => { });
        onMounted(() => update());
        onUnmounted(() => update());
        onUpdated(() => {
            const $item = root.value;
            if ($item.offsetWidth === 0 || $item.offsetHeight === 0) {
                // 解决默认 hidden 的问题
                update();
            }
        });
        return {
            root
        };
    }
});

const _hoisted_1 = {
  class: "fx-swiper-item",
  ref: "root"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ], 512 /* NEED_PATCH */))
}

script.render = render;
script.__file = "src/Swiper/SwiperItem.vue";

const _SwiperItem = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _SwiperItem;
