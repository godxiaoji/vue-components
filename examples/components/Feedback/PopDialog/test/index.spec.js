/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import PopDialog from '@/components/PopDialog'

describe('PopDialog', () => {
  test('should render default correctly', () => {
    const wrapper = mount(PopDialog, {
      propsData: {
        selector: '#test',
        title: 'title',
        content: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showCancel=false correctly', () => {
    const wrapper = mount(PopDialog, {
      propsData: {
        selector: '#test',
        title: 'title',
        content: 'content',
        showCancel: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
