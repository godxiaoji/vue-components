/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Switch from '@/Switch'

describe('Switch', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Switch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = mount(Switch, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop value=true correctly', () => {
    const wrapper = mount(Switch, {
      propsData: {
        modelValue: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should formValue=true with input trigger change correctly', async () => {
    const wrapper = mount(Switch, {})
    const input = wrapper.find('input[type="checkbox"]')

    await input.setChecked()

    expect(wrapper.vm.formValue).toBeTruthy()
  })
})
