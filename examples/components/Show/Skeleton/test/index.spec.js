/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Skeleton from '@/components/Skeleton'

describe('Skeleton', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Skeleton, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop avatar=true correctly', () => {
    const wrapper = mount(Skeleton, {
      propsData: {
        avatar: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
