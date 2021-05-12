/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import TimeAgo from '@/TimeAgo'

describe('TimeAgo', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(TimeAgo, {
      props: {
        time: new Date()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
