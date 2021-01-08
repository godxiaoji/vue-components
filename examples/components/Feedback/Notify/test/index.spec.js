/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Notify from '@/Notify'

describe('Notify', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Notify, {
      propsData: {
        title: '通知文本'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="success" correctly', () => {
    const wrapper = mount(Notify, {
      propsData: { title: '成功文本', type: 'success' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="warning" correctly', () => {
    const wrapper = mount(Notify, {
      propsData: { title: '警告文本', type: 'warning' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="danger" correctly', () => {
    const wrapper = mount(Notify, {
      propsData: { title: '危险文本', type: 'danger' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
