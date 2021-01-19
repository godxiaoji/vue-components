/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Badge from '@/Badge'

describe('Badge', () => {
  test('should render prop content=1 correctly', () => {
    const wrapper = mount(Badge, {
      props: {
        content: 1
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
