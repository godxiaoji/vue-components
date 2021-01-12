/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Tab from '@/Tab'

import { shortTabList, tabList } from '../data'

describe('Tab', () => {
  test('should render set options correctly', () => {
    const wrapper = mount(Tab, {
      propsData: {
        options: shortTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set mix options correctly', () => {
    const wrapper = mount(Tab, {
      propsData: {
        options: tabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
