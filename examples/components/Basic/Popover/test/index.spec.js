/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Popover from '@/Popover'

describe('Popover', () => {
  test('should render prop set content correctly', () => {
    const wrapper = mount(Popover, {
      propsData: {
        selector: '#test'
      },
      content: 'content'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
