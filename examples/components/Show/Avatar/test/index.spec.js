/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Avatar from '@/Avatar'

describe('Avatar', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Avatar, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
