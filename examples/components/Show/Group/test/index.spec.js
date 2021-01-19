/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Group from '@/Group'
import Cell from '@/Cell'

describe('Group', () => {
  test('should render prop set title correctly', () => {
    const wrapper = mount(Group, {
      props: {
        title: 'title'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render default slot correctly', () => {
    const wrapper = mount(Group, {
      props: {
        title: 'title'
      },
      slots: {
        default: mount(Cell, {
          props: {
            label: 'label',
            content: 'content'
          }
        }).html()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
