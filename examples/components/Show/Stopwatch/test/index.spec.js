/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Stopwatch from '@/Stopwatch'

describe('Stopwatch', () => {
  test('should render prop text="hello world" correctly', () => {
    const wrapper = shallowMount(Stopwatch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
