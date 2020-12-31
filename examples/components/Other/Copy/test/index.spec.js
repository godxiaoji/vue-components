/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Copy from '@/components/Copy'

describe('Copy', () => {
  test('should render prop text="content" correctly', () => {
    const wrapper = mount(Copy, {
      propsData: {
        text: 'content'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
