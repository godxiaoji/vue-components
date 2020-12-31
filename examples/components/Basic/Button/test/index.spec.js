/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Button from '@/components/Button'

describe('Button', () => {
  test('should render default slot correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render add icon correctly', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'EditOutlined'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
