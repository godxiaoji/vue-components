/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Divider from '@/components/Divider'

describe('Divider', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Divider, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop title="title" correctly', () => {
    const wrapper = mount(Divider, {
      propsData: {
        title: 'title'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop dashed=true correctly', () => {
    const wrapper = mount(Divider, {
      propsData: {
        title: 'title',
        dashed: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
