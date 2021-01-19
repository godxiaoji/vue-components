/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import IndexView from '@/IndexView'
import IndexViewItem from '@/IndexViewItem'

describe('IndexView', () => {
  test('IndexView should render default correctly', () => {
    const wrapper = mount(IndexView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('IndexViewItem should render default correctly', () => {
    const wrapper = mount(IndexViewItem, {
      props: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
