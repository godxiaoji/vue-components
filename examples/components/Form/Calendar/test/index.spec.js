/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Calendar from '@/components/Calendar'

describe('Calendar', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Calendar, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
