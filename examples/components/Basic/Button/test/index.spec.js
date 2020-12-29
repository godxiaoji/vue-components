/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Button from '../../../../../src/components/Button'

describe('Button', () => {
  test('should render default slot correctly', () => {
    const wrapper = mount(Button, {
      slots: '主要'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render add icon correctly', () => {
    const wrapper = mount(Button, {
      slots: '编辑',
      propsData: {
        icon: 'EditOutlined'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
