/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Cell from '@/Cell'

const label = 'label'
const content = 'content'

describe('Cell', () => {
  test('should render set label and content correctly', () => {
    const wrapper = shallowMount(Cell, {
      props: {
        label,
        content
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set description more correctly', () => {
    const wrapper = shallowMount(Cell, {
      props: {
        label,
        content,
        description: 'description'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop icon="EditOutlined" correctly', () => {
    const wrapper = shallowMount(Cell, {
      props: {
        label,
        content,
        icon: 'EditOutlined'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop isLink=true correctly', () => {
    const wrapper = shallowMount(Cell, {
      props: {
        label,
        content,
        isLink: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
