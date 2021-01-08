/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Stepper from '@/Stepper'

describe('Stepper', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Stepper, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
