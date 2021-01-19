/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Dropdown from '@/Dropdown'

describe('Dropdown', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Dropdown, {
      props: {
        selector: '#test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
