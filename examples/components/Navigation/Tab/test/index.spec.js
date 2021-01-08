/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Tab from '@/Tab'

const shortTabList = [
  {
    value: 1,
    label: '空调'
  },
  {
    value: 2,
    label: '冰箱'
  },
  {
    value: 3,
    label: '洗衣机'
  },
  {
    value: 4,
    label: '热水器'
  }
]

describe('Tab', () => {
  test('should render prop text="content" correctly', () => {
    const wrapper = mount(Tab, {
      propsData: {
        options: shortTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
