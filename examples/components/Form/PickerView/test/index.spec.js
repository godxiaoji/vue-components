/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import PickerView from '@/components/PickerView'
import { cascadeOptions } from '../../Picker/picker-util'

describe('PickerView', () => {
  test('should render prop set options correctly', () => {
    const wrapper = mount(PickerView, {
      propsData: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
