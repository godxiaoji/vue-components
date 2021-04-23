/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Result from '@/Result'

describe('Result', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Result, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
