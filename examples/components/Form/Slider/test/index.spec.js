/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Slider from '@/Slider'

describe('Slider', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Slider, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
