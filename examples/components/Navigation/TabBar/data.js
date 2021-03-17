import TaobaoSvg from '../../Basic/Icon/svgs/taobao.svg'
import QqSvg from '../../Basic/Icon/svgs/qq.svg'
import WechatSvg from '../../Basic/Icon/svgs/wechat.svg'
import WeiboSvg from '../../Basic/Icon/svgs/weibo.svg'

export const customIconList = [
  {
    value: 'wechat',
    label: '微信',
    icon: WechatSvg
  },
  {
    value: 'qq',
    label: 'QQ',
    icon: QqSvg
  },
  {
    value: 'weibo',
    label: '微博',
    icon: WeiboSvg
  },
  {
    value: 'taobao',
    label: '淘宝',
    icon: TaobaoSvg
  }
]

export const baseList = [
  {
    value: 1,
    label: '首页',
    icon: 'HomeOutlined'
  },
  {
    value: 2,
    label: '搜索',
    icon: 'SearchOutlined'
  },
  {
    value: 3,
    label: '我的',
    icon: 'UserOutlined'
  },
  {
    value: 4,
    label: '设置',
    icon: 'SettingOutlined'
  }
]

export const badgeList = [
  {
    value: 1,
    label: '首页',
    icon: 'HomeOutlined',
    badge: '热'
  },
  {
    value: 2,
    label: '搜索',
    icon: 'SearchOutlined',
    badge: {
      dot: true,
      content: 1
    }
  },
  {
    value: 3,
    label: '我的',
    icon: 'UserOutlined',
    badge: 1
  },
  {
    value: 4,
    label: '设置',
    icon: 'SettingOutlined',
    badge: 100
  }
]
