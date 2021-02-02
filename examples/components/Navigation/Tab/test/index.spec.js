/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Tab from '@/Tab'

import { mixTabList, tabList } from '../data'

describe('Tab', () => {
  test('should render set options correctly', () => {
    const wrapper = shallowMount(Tab, {
      propsData: {
        options: tabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set mix options correctly', () => {
    const wrapper = shallowMount(Tab, {
      propsData: {
        options: mixTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
