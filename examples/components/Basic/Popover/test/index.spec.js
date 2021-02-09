/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Popover from '@/Popover'

const selector = '#test'

describe('Popover', () => {
  test('should render prop set content correctly', () => {
    const wrapper = mount(Popover, {
      props: {
        selector
      },
      content: 'content'
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop placement="left" correctly', () => {
    const wrapper = mount(Popover, {
      props: {
        selector,
        placement: 'left'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop visible=true correctly', () => {
    const wrapper = mount(Popover, {
      props: {
        selector,
        visible: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
