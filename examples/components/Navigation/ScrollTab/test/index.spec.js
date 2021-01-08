/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import ScrollTab from '@/ScrollTab'
import ScrollTabItem from '@/ScrollTabItem'

describe('ScrollTab', () => {
  test('ScrollTab should render default correctly', () => {
    const wrapper = mount(ScrollTab, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('ScrollTabItem should render default correctly', () => {
    const wrapper = mount(ScrollTabItem, {
      propsData: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
