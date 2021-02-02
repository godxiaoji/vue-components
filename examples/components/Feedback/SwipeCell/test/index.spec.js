/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import SwipeCell from '@/SwipeCell'

describe('Cell', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(SwipeCell, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set buttons correctly', () => {
    const wrapper = shallowMount(SwipeCell, {
      propsData: {
        buttons: [
          {
            text: '加入收藏',
            type: 'warning'
          },
          {
            text: '删除',
            type: 'danger'
          }
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
