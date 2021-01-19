/* global describe,test,expect */

import { mount } from '@vue/test-utils'

import ActionSheet from '@/ActionSheet'

const options = [
  {
    name: '选项1'
  },
  {
    name: '选项2'
  },
  {
    name: '选项3'
  }
]

describe('ActionSheet', () => {
  test('should render props set options correctly', () => {
    const wrapper = mount(ActionSheet, {
      props: {
        options
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
