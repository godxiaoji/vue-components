/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Badge from '@/components/Badge'

describe('Badge', () => {
  test('should render prop content=1 correctly', () => {
    const wrapper = mount(Badge, {
      propsData: {
        content: 1
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
