/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import ActivityIndicator from '@/ActivityIndicator'

describe('ActivityIndicator', () => {
  test('should render default correctly', async () => {
    const wrapper = shallowMount(ActivityIndicator, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop size=48 correctly', () => {
    const wrapper = shallowMount(ActivityIndicator, {
      props: { size: 48 }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
