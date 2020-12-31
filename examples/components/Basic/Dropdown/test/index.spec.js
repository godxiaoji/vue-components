/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Dropdown from '@/components/Dropdown'

describe('Dropdown', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Dropdown, {
      propsData: {
        selector: '#test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
