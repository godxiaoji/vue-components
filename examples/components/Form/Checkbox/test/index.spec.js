/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Checkbox from '@/Checkbox'
import CheckboxGroup from '@/CheckboxGroup'

describe('Checkbox', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Checkbox, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('CheckboxGroup', () => {
  test('should render 2 Checkbox slot correctly', () => {
    const wrapper = shallowMount(CheckboxGroup, {
      slots: {
        default: [Checkbox, Checkbox]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(CheckboxGroup, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
