/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Tag from '@/Tag'

describe('Tag', () => {
  test('should render default slot correctly', () => {
    const wrapper = mount(Tag, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop closable=true correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
