/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import ScrollView from '@/components/ScrollView'

describe('ScrollView', () => {
  test('should render prop scrollY=true correctly', () => {
    const wrapper = mount(ScrollView, {
      propsData: {
        scrollY: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
