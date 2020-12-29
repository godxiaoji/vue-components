/* global describe,test,expect */

import { mount } from '@vue/test-utils'

import ActionSheet from '../../../../../src/components/ActionSheet'

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
  test('should render default slot correctly', () => {
    const wrapper = mount(ActionSheet, {
      propsData: {
        options
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
