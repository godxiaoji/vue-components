/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import StickyView from '@/StickyView'
import StickyViewItem from '@/StickyViewItem'

describe('StickyView', () => {
  test('StickyView should render default correctly', () => {
    const wrapper = mount(StickyView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('StickyViewItem should render default correctly', () => {
    const wrapper = mount(StickyViewItem, {
      propsData: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
