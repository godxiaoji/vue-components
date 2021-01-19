/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import TabBar from '@/TabBar'

import { customIconList, baseList, badgeList } from '../data'

describe('Tab', () => {
  test('should render set options correctly', () => {
    const wrapper = mount(TabBar, {
      props: {
        options: baseList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set badge correctly', () => {
    const wrapper = mount(TabBar, {
      props: {
        options: badgeList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render use custom icons correctly', () => {
    const wrapper = mount(TabBar, {
      props: {
        options: customIconList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
