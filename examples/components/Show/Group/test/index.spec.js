/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Group from '@/components/Group'
import Cell from '@/components/Cell'

describe('Group', () => {
  test('should render prop set title correctly', () => {
    const wrapper = mount(Group, {
      propsData: {
        title: 'title'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render default slot correctly', () => {
    const wrapper = mount(Group, {
      propsData: {
        title: 'title'
      },
      slots: {
        default: mount(Cell, {
          propsData: {
            label: 'label',
            content: 'content'
          }
        }).html()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
