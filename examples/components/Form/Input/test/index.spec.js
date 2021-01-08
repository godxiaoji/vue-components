/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Input from '@/Input'

describe('Input', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Input, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
