/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import NavBar from '@/NavBar'

describe('NavBar', () => {
  test('should render prop title="NavBar" correctly', () => {
    const wrapper = mount(NavBar, {
      propsData: {
        title: 'NavBar'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
