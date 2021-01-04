/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Cascader from '@/components/Cascader'
import { cascadeOptions } from '../../Picker/picker-util'

describe('Cascader', () => {
  test('should render prop set options correctly', () => {
    const wrapper = mount(Cascader, {
      propsData: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})