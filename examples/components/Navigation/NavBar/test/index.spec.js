/* global describe,test,expect */

import { shallowMount, mount } from '@vue/test-utils'
import NavBar from '@/NavBar'

describe('NavBar', () => {
  test('should render prop title="NavBar" correctly', () => {
    const wrapper = shallowMount(NavBar, {
      propsData: {
        title: 'NavBar'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props showBack=true & showHome = true correctly', () => {
    const wrapper = shallowMount(NavBar, {
      propsData: {
        showBack: true,
        showHome: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop rightButtons=[{ icon: "MenuOutlined", text: "Menu" }] correctly', () => {
    const wrapper = shallowMount(NavBar, {
      propsData: {
        rightButtons: [{ icon: 'MenuOutlined', text: 'Menu' }]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set left & right slots correctly', () => {
    const wrapper = mount(NavBar, {
      slots: {
        left: 'Left Slot',
        right: 'Right Slot'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
