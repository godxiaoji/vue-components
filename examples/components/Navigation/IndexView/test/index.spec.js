/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import IndexView from '@/components/IndexView'
import IndexViewItem from '@/components/IndexViewItem'

describe('IndexView', () => {
  test('IndexView should render default correctly', () => {
    const wrapper = mount(IndexView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('IndexViewItem should render default correctly', () => {
    const wrapper = mount(IndexViewItem, {
      propsData: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
