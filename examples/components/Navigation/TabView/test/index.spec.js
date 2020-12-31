/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import TabView from '@/components/TabView'
import TabViewItem from '@/components/TabViewItem'

describe('TabView', () => {
  test('TabView should render default correctly', () => {
    const wrapper = mount(TabView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('TabViewItem should render default correctly', () => {
    const wrapper = mount(TabViewItem, {
      propsData: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
