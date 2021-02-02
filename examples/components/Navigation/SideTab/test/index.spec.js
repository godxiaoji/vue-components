/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import SideTab from '@/SideTab'

import { mixTabList, tabList } from '../../Tab/data'

describe('SideTab', () => {
  test('should render set options correctly', () => {
    const wrapper = shallowMount(SideTab, {
      propsData: {
        options: tabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set mix options correctly', () => {
    const wrapper = shallowMount(SideTab, {
      propsData: {
        options: mixTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
