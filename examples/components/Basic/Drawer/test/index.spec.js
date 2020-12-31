/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Drawer from '@/components/Drawer'

describe('Drawer', () => {
  test('should render prop title="Drawer" correctly', () => {
    const wrapper = mount(Drawer, {
      propsData: {
        title: 'Drawer'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
