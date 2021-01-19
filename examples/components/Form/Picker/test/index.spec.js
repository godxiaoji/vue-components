/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Picker from '@/Picker'
import { cascadeOptions } from '../../Picker/picker-util'

describe('Picker', () => {
  test('should render prop set options correctly', () => {
    const wrapper = mount(Picker, {
      props: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
