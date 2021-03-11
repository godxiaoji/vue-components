import { defineComponent, ref, computed, watch, onBeforeUnmount, openBlock, createBlock, renderSlot, toDisplayString, createCommentVNode } from 'vue';

/**
 * 将字段名转为驼峰式格式
 * @param {string} name 字段名
 */
/**
 * 是否函数
 * @param object 值
 */
function isFunction(object) {
    return typeof object === 'function';
}
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
 * 获取限定范围的数值
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 */
function rangeNumber(number, min, max) {
    return Math.min(max, Math.max(min, number));
}
/**
 * 获取限定范围内的整数
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 */
function rangeInteger(number, min, max) {
    if (isString(number)) {
        if (isNumeric(number)) {
            number = parseFloat(number);
        }
        else {
            number = min;
        }
    }
    return rangeNumber(Math.round(number), Math.ceil(min), Math.floor(max));
}

const Easing = {
    linear(p) {
        return p;
    },
    swing(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
    }
};
class AnimationFrameTask {
    constructor(ref) {
        this.stop = function () {
            if (ref.idle) {
                cancelAnimationFrame(ref.idle);
                ref.idle = null;
            }
        };
    }
}
/**
 * 变化解帧
 * @param options 设置项
 */
function frameTo(options) {
    const { from, to, duration, progress, complete } = options;
    const start = Date.now();
    const end = start + duration;
    const ref = { idle: null };
    let frameIndex = 0;
    function step() {
        ref.idle = requestAnimationFrame(function () {
            const t = Date.now();
            let current;
            if (t >= end) {
                current = to;
                progress({
                    current,
                    frameIndex: frameIndex++
                });
                isFunction(complete) && complete({ current });
            }
            else {
                const p = Easing['swing']((t - start) / duration);
                current = from + (to - from) * p;
                if (isFunction(progress)) {
                    progress({
                        current,
                        frameIndex: frameIndex++
                    });
                }
                step();
            }
        });
    }
    if (from !== to) {
        step();
    }
    else {
        isFunction(complete) && complete({ current: to });
    }
    return new AnimationFrameTask(ref);
}

var script = defineComponent({
    name: 'fx-badge',
    props: {
        // 消息条数
        content: {
            type: [String, Number],
            default: 0
        },
        // 最大完全显示消息条数
        maxCount: {
            type: Number,
            default: 99
        },
        // 是否显示为小红点
        dot: {
            type: Boolean,
            default: false
        },
        // 消息数为0时是否显示
        showZero: {
            type: Boolean,
            default: false
        },
        // 是否开启动画
        animated: {
            type: Boolean,
            default: false
        },
        // 偏移量，格式为 [x, y]
        offset: {
            type: Array,
            default: () => {
                return [0, 0];
            }
        }
    },
    setup(props) {
        const content2 = ref(isString(props.content)
            ? props.content
            : isNumber(props.content)
                ? rangeInteger(props.content, 0, props.maxCount)
                : 0);
        let frameTask;
        const showCount = computed(() => {
            if (isString(content2.value)) {
                return content2.value;
            }
            if (props.content > props.maxCount && content2.value === props.maxCount) {
                return content2.value + '+';
            }
            return content2.value.toString();
        });
        const styles = computed(() => {
            return {
                transform: `translate3d(50%, -50%, 0px) scale(${(isString(props.content) && props.content) ||
                    props.showZero ||
                    props.content > 0
                    ? 1
                    : 0})`,
                right: `${-props.offset[0]}px`,
                top: `${props.offset[1]}px`
            };
        });
        watch(() => props.content, val => {
            frameTask && frameTask.stop();
            if (isString(val)) {
                content2.value = val;
                return;
            }
            if (!isNumber(val)) {
                return;
            }
            const currentIsShow = props.showZero || content2.value > 0;
            const isReadyToHide = !props.showZero && val === 0;
            if (!currentIsShow || isReadyToHide) {
                content2.value = val;
            }
            else {
                const to = rangeInteger(val, 0, props.maxCount);
                frameTask = frameTo({
                    from: content2.value,
                    to,
                    duration: Math.min(Math.abs(to - content2.value) * 50, 1000),
                    progress: ({ current, frameIndex }) => {
                        if (frameIndex % 3 === 0) {
                            content2.value = Math.round(current);
                        }
                    },
                    complete: ({ current }) => {
                        content2.value = current;
                    }
                });
            }
        });
        onBeforeUnmount(() => frameTask && frameTask.stop());
        return {
            showCount,
            styles
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["fx-badge", { animated: !!_ctx.animated }]
  }, [
    renderSlot(_ctx.$slots, "default"),
    (_ctx.dot && _ctx.content != null)
      ? (openBlock(), createBlock("i", {
          key: 0,
          class: "fx-badge_dot",
          style: _ctx.styles
        }, null, 4 /* STYLE */))
      : (_ctx.content != null)
        ? (openBlock(), createBlock("span", {
            key: 1,
            class: "fx-badge_num",
            style: _ctx.styles
          }, toDisplayString(_ctx.showCount), 5 /* TEXT, STYLE */))
        : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/Badge/Badge.vue";

const _Badge = Object.assign(script, {
    install: function (app) {
        app.component(script.name, script);
    }
});

export default _Badge;
