/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Radio from '@/Radio'
import RadioGroup from '@/RadioGroup'

describe('Radio', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Radio, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('RadioGroup', () => {
  test('should render 2 Radio slot correctly', () => {
    const wrapper = shallowMount(RadioGroup, {
      slots: {
        default: [Radio, Radio]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(RadioGroup, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
