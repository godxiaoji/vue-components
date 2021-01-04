/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Rate from '@/components/Rate'

describe('Rate', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Rate, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
