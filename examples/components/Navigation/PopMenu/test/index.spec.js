/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import PopMenu from '@/components/PopMenu'

const options = [
  {
    icon: 'HeartOutlined',
    name: '爱心'
  },
  {
    icon: 'StarOutlined',
    name: '星星'
  },
  {
    icon: 'CircleOutlined',
    name: '圈圈',
    disabled: true
  }
]

describe('PopMenu', () => {
  test('should render prop set options correctly', () => {
    const wrapper = mount(PopMenu, {
      propsData: {
        options
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
