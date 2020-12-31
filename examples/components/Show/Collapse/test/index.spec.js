/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Collapse from '@/components/Collapse'
import CollapseItem from '@/components/CollapseItem'

describe('Collapse', () => {
  test('Collapse should render default correctly', () => {
    const wrapper = mount(Collapse, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('CollapseItem should render default correctly', () => {
    const wrapper = mount(CollapseItem, {
      propsData: { name: 'item-1', title: 'title-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
