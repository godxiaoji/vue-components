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
      props: {
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
      props: {
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
      props: {
        spaceHold: true
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
