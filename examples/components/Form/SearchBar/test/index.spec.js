/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import SearchBar from '@/SearchBar'
import { placeholders } from '../data'

describe('SearchBar', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(SearchBar, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showCancel=true correctly', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        showCancel: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop set placeholders correctly', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        placeholders
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop ghost=true slots correctly', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        showCancel: true,
        ghost: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
