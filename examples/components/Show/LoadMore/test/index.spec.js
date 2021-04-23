/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import LoadMore from '@/LoadMore'

describe('LoadMore', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(LoadMore, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
