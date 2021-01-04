/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox'

describe('Checkbox', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Checkbox, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
