/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Row from '@/Row'
import Col from '@/Col'

describe('Grid', () => {
  test('Row should render default correctly', () => {
    const wrapper = mount(Row, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Col should render default slot correctly', () => {
    const wrapper = mount(Col, {
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Row & Col should render default correctly', () => {
    const wrapper = mount(Row, {
      slots: {
        default: mount(Col, {
          slots: {
            default: 'content'
          }
        }).html()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
