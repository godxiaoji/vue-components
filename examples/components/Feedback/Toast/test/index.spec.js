/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Toast from '@/Toast'

describe('Toast', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Toast, {
      props: {
        title: '提示文本'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="success" correctly', () => {
    const wrapper = mount(Toast, {
      props: { title: '成功文本', type: 'success' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="fail" correctly', () => {
    const wrapper = mount(Toast, {
      props: { title: '失败文本', type: 'fail' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="loading" correctly', () => {
    const wrapper = mount(Toast, {
      props: { title: '加载文本', type: 'loading' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
