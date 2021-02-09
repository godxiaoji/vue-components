/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import TabBar from '@/TabBar'

import { customIconList, baseList, badgeList } from '../data'

describe('Tab', () => {
  test('should render set options correctly', () => {
    const wrapper = shallowMount(TabBar, {
      props: {
        options: baseList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set badge correctly', () => {
    const wrapper = shallowMount(TabBar, {
      props: {
        options: badgeList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render use custom icons correctly', () => {
    const wrapper = shallowMount(TabBar, {
      props: {
        options: customIconList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
