/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Icon from '@/Icon'

describe('Icon', () => {
  test('should render prop icon="UpOutlined" correctly', () => {
    const wrapper = mount(Icon, {
      propsData: {
        icon: 'UpOutlined'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
