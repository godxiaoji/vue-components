/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Icon from '@/components/Icon'

describe('Icon', () => {
  test('should render prop className="UpOutlined" correctly', () => {
    const wrapper = mount(Icon, {
      propsData: {
        className: 'UpOutlined'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
