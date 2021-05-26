module.exports = {
  title: 'Vfox for Vue3',
  description: '移动端 Vue 组件库',
  base: '/vfox/',
  themeConfig: {
    logo: '/assets/images/logo.png',
    nav: [
      {
        text: '指南',
        link: '/'
      },
      {
        text: '设计',
        link: '/design/'
      },
      {
        text: '组件',
        link: '/components/Button'
      },
      {
        text: 'API',
        link: '/apis/LocalStorage'
      },
      {
        text: '选择版本',
        items: [
          { text: '1.x', link: 'https://cdn.fox2.cn/1.x/docs/' },
          { text: '2.x', link: 'https://godxiaoji.github.io/vfox/' }
        ]
      }
    ],
    sidebar: {
      '/components/': getComponentsSidebar(),
      '/apis/': getApisSidebar(),
      '/': ['', ['/design/', '设计'], ['/components/Button', '组件'], ['/apis/LocalStorage', 'API']]
    },
    smoothScroll: true
  }
}

function getApisSidebar() {
  return [
    ['/', '指南'],
    ['/design/', '设计'],
    ['/components/Button', '组件'],
    {
      title: 'API',
      collapsable: false,
      sidebarDepth: 2,
      children: ['LocalStorage', 'Notify', 'Toast', 'Scroll', 'Preview', 'Modal', 'Drawer', 'Popover']
    }
  ]
}

function getComponentsSidebar() {
  return [
    ['/', '指南'],
    ['/design/', '设计'],
    {
      title: '基础',
      collapsable: false,
      sidebarDepth: 2,
      children: ['Button', 'Icon', 'Image', 'ScrollView', 'Drawer', 'Modal', 'Popover', 'Dropdown']
    },
    {
      title: '反馈',
      collapsable: false,
      sidebarDepth: 2,
      children: ['Toast', 'Dialog', 'Notify', 'ScrollView', 'ActionSheet', 'PopDialog', 'SwipeCell']
    },
    {
      title: '数据输入',
      collapsable: false,
      sidebarDepth: 2,
      children: [
        'Form',
        'Input',
        'Radio',
        'Checkbox',
        'Slider',
        'Switch',
        'Stepper',
        'Cascader',
        'Picker',
        'Calendar',
        'SearchBar',
        'NumberKeyboard',
        'ImageUploader',
        'DatePicker',
        'Range'
      ]
    },
    {
      title: '导航',
      collapsable: false,
      sidebarDepth: 2,
      children: [
        'BackTop',
        'NavBar',
        'PopMenu',
        'ScrollView',
        'Tab',
        'SideTab',
        'TabBar',
        'TabView',
        'Sticky',
        'ScrollTab',
        'IndexView',
        'Fixed',
        'Pagination'
      ]
    },
    {
      title: '展示',
      collapsable: false,
      sidebarDepth: 2,
      children: [
        'Layout',
        'Cell',
        'Group',
        'Collapse',
        'Empty',
        'Skeleton',
        'Swiper',
        'ImagePreview',
        'FlatList',
        'NoticeBar',
        'Divider',
        'Badge',
        'Progress',
        'Tag',
        'Order',
        'CountDown',
        'Steps',
        'Price',
        'Avatar',
        'QrCode',
        'Timeline',
        'Stopwatch',
        'Result',
        'LoadMore',
        'TimeAgo',
        'CountUp',
        'CircleProgress',
        'ActivityIndicator'
      ]
    },
    {
      title: '其他',
      collapsable: false,
      sidebarDepth: 2,
      children: ['Copy']
    },
    ['/apis/LocalStorage', 'API']
  ]
}
