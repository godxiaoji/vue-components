/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Price from '@/Price'

const price = 1111.11

describe('Price', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop symbol="￥" correctly', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price,
        symbol: '￥'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop thousands=true correctly', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price,
        thousands: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop decimalDigits=3 correctly', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price,
        decimalDigits: 3
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
