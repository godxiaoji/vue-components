/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Cell from '@/Cell'

const label = 'label'
const content = 'content'

describe('Cell', () => {
  test('should render set label and content correctly', () => {
    const wrapper = shallowMount(Cell, {
      propsData: {
        label,
        content
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set description more correctly', () => {
    const wrapper = shallowMount(Cell, {
      propsData: {
        label,
        content,
        description: 'description'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop icon="EditOutlined" correctly', () => {
    const wrapper = shallowMount(Cell, {
      propsData: {
        label,
        content,
        icon: 'EditOutlined'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop clickable=true correctly', () => {
    const wrapper = shallowMount(Cell, {
      propsData: {
        label,
        content,
        clickable: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
