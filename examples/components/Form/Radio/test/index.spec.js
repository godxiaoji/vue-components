/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Radio from '@/Radio'

describe('Radio', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Radio, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
