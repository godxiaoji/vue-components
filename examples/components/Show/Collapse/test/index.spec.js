/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Collapse from '@/Collapse'
import CollapseItem from '@/CollapseItem'

describe('Collapse', () => {
  test('Collapse should render default correctly', () => {
    const wrapper = shallowMount(Collapse, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('CollapseItem should render default correctly', () => {
    const wrapper = shallowMount(CollapseItem, {
      propsData: { name: 'item-1', title: 'title-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
