/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Skeleton from '@/Skeleton'
import SkeletonImage from '@/SkeletonImage'
import SkeletonTitle from '@/SkeletonTitle'
import SkeletonParagraph from '@/SkeletonParagraph'
import SkeletonButton from '@/SkeletonButton'

describe('Skeleton', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Skeleton, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop avatar=true correctly', () => {
    const wrapper = mount(Skeleton, {
      propsData: {
        avatar: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render custom layout slot correctly', () => {
    const wrapper = mount(Skeleton, {
      slots: {
        layout: [
          SkeletonImage,
          SkeletonTitle,
          SkeletonParagraph,
          SkeletonButton
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
