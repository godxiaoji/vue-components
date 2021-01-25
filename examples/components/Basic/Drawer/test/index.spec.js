/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Drawer from '@/Drawer'

describe('Drawer', () => {
  test('should render prop title="Drawer" correctly', () => {
    const wrapper = shallowMount(Drawer, {
      propsData: {
        title: 'Drawer'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showClose=true correctly', () => {
    const wrapper = shallowMount(Drawer, {
      propsData: {
        showClose: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop placement="left" correctly', () => {
    const wrapper = shallowMount(Drawer, {
      propsData: {
        placement: 'left'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
