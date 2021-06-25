module.exports = {
  title: "Vfox for Vue3",
  description: "移动端 Vue 组件库",
  base: "/vfox/",
  lang: "zh-CN",
  themeConfig: {
    docsDir: "docs",
    nav: [
      {
        text: "指南",
        link: "/",
        activeMatch: "^/$|^/guide/",
      },
      {
        text: "设计",
        link: "/design/",
        activeMatch: "^/design/",
      },
      {
        text: "组件",
        link: "/components/Button",
        activeMatch: "^/components/",
      },
      {
        text: "API",
        link: "/apis/LocalStorage",
        activeMatch: "^/apis/",
      },
      {
        text: "选择版本",
        items: [
          { text: "1.x", link: "https://cdn.fox2.cn/1.x/docs/" },
          { text: "2.x", link: "/", activeMatch: '^/' },
        ],
      },
    ],
    sidebar: {
      "/components/": getComponentsSidebar(),
      "/apis/": getApisSidebar(),
    },
    smoothScroll: true,
  },
};

function getComponentsSidebar() {
  return [
    {
      text: "基础",
      frontmatter: {
        sidebarDepth: 2,
      },
      children: [
        { text: "Button", link: "/components/Button" },
        { text: "Icon", link: "/components/Icon" },
        { text: "Image", link: "/components/Image" },
        { text: "ScrollView", link: "/components/ScrollView" },
        { text: "Drawer", link: "/components/Drawer" },
        { text: "Modal", link: "/components/Modal" },
        { text: "Popover", link: "/components/Popover" },
        { text: "Dropdown", link: "/components/Dropdown" },
      ],
    },
    {
      text: "反馈",
      children: [
        { text: "Toast", link: "/components/Toast" },
        { text: "Dialog", link: "/components/Dialog" },
        { text: "Notify", link: "/components/Notify" },
        { text: "ScrollView", link: "/components/ScrollView" },
        { text: "ActionSheet", link: "/components/ActionSheet" },
        { text: "PopDialog", link: "/components/PopDialog" },
        { text: "SwipeCell", link: "/components/SwipeCell" },
      ],
    },
    {
      text: "数据输入",
      children: [
        { text: "Form", link: "/components/Form" },
        { text: "Input", link: "/components/Input" },
        { text: "Radio", link: "/components/Radio" },
        { text: "Checkbox", link: "/components/Checkbox" },
        { text: "Slider", link: "/components/Slider" },
        { text: "Switch", link: "/components/Switch" },
        { text: "Stepper", link: "/components/Stepper" },
        { text: "Cascader", link: "/components/Cascader" },
        { text: "Picker", link: "/components/Picker" },
        { text: "Calendar", link: "/components/Calendar" },
        { text: "SearchBar", link: "/components/SearchBar" },
        { text: "NumberKeyboard", link: "/components/NumberKeyboard" },
        { text: "ImageUploader", link: "/components/ImageUploader" },
        { text: "DatePicker", link: "/components/DatePicker" },
        { text: "Range", link: "/components/Range" },
      ],
    },
    {
      text: "导航",
      children: [
        { text: "BackTop", link: "/components/BackTop" },
        { text: "NavBar", link: "/components/NavBar" },
        { text: "PopMenu", link: "/components/PopMenu" },
        { text: "ScrollView", link: "/components/ScrollView" },
        { text: "Tab", link: "/components/Tab" },
        { text: "SideTab", link: "/components/SideTab" },
        { text: "TabBar", link: "/components/TabBar" },
        { text: "TabView", link: "/components/TabView" },
        { text: "Sticky", link: "/components/Sticky" },
        { text: "ScrollTab", link: "/components/ScrollTab" },
        { text: "IndexView", link: "/components/IndexView" },
        { text: "Fixed", link: "/components/Fixed" },
        { text: "Pagination", link: "/components/Pagination" },
      ],
    },
    {
      text: "展示",
      children: [
        { text: "Layout", link: "/components/Layout" },
        { text: "Cell", link: "/components/Cell" },
        { text: "Group", link: "/components/Group" },
        { text: "Collapse", link: "/components/Collapse" },
        { text: "Empty", link: "/components/Empty" },
        { text: "Skeleton", link: "/components/Skeleton" },
        { text: "Swiper", link: "/components/Swiper" },
        { text: "ImagePreview", link: "/components/ImagePreview" },
        { text: "FlatList", link: "/components/FlatList" },
        { text: "NoticeBar", link: "/components/NoticeBar" },
        { text: "Divider", link: "/components/Divider" },
        { text: "Badge", link: "/components/Badge" },
        { text: "Progress", link: "/components/Progress" },
        { text: "Tag", link: "/components/Tag" },
        { text: "Order", link: "/components/Order" },
        { text: "CountDown", link: "/components/CountDown" },
        { text: "Steps", link: "/components/Steps" },
        { text: "Price", link: "/components/Price" },
        { text: "Avatar", link: "/components/Avatar" },
        { text: "QrCode", link: "/components/QrCode" },
        { text: "Timeline", link: "/components/Timeline" },
        { text: "Stopwatch", link: "/components/Stopwatch" },
        { text: "Result", link: "/components/Result" },
        { text: "LoadMore", link: "/components/LoadMore" },
        { text: "TimeAgo", link: "/components/TimeAgo" },
        { text: "CountUp", link: "/components/CountUp" },
        { text: "CircleProgress", link: "/components/CircleProgress" },
        { text: "ActivityIndicator", link: "/components/ActivityIndicator" },
      ],
    },
    {
      text: "其他",
      children: [{ text: "Copy", link: "/components/Copy" }],
    },
  ];
}

function getApisSidebar() {
  return [
    { text: "LocalStorage", link: "/apis/LocalStorage" },
    { text: "Notify", link: "/apis/Notify" },
    { text: "Toast", link: "/apis/Toast" },
    { text: "Scroll", link: "/apis/Scroll" },
    { text: "Preview", link: "/apis/Preview" },
    { text: "Modal", link: "/apis/Modal" },
    { text: "Drawer", link: "/apis/Drawer" },
    { text: "Popover", link: "/apis/Popover" },
  ];
}
