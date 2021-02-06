/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Fixed from '@/Fixed'

const defaultSlot = 'Fixed'

describe('Fixed', () => {
  test('should render default slot correctly', () => {
    const wrapper = mount(Fixed, {
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop placement="top" correctly', () => {
    const wrapper = mount(Fixed, {
      propsData: {
        placement: 'top'
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop background="#ffffff" correctly', () => {
    const wrapper = mount(Fixed, {
      propsData: {
        background: '#ffffff'
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop spaceHold=true correctly', () => {
    const wrapper = mount(Fixed, {
      propsData: {
        spaceHold: true
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
