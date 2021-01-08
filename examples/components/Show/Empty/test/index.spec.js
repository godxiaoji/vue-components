/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Empty from '@/Empty'
import Image from '@/Image'

describe('Empty', () => {
  test('should render prop set description correctly', () => {
    const wrapper = mount(Empty, {
      propsData: {
        description: 'description'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set image slot correctly', () => {
    const wrapper = mount(Empty, {
      propsData: {
        description: 'description'
      },
      slots: {
        image: mount(Image, {
          propsData: {
            src: 'https://cdn.fox2.cn/vfox/swiper/different-1.jpg'
          }
        }).html()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
