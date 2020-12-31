/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import BackTop from '@/components/BackTop'

describe('BackTop', () => {
  test('should render default correctly', () => {
    const wrapper = mount(BackTop, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
