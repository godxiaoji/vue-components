/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Swiper from '@/Swiper'
import SwiperItem from '@/SwiperItem'

describe('Swiper', () => {
  test('Swiper should render default correctly', () => {
    const wrapper = mount(Swiper, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('SwiperItem should render default correctly', () => {
    const wrapper = mount(SwiperItem, {
      propsData: {},
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
