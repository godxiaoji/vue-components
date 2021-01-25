/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Slider from '@/Slider'

describe('Slider', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Slider, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showValue=true correctly', () => {
    const wrapper = shallowMount(Slider, {
      propsData: {
        showValue: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Slider, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
