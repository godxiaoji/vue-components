/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Tag from '@/Tag'

const defaultSlot = 'tag'

describe('Tag', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(Tag, {
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop closable=true correctly', () => {
    const wrapper = shallowMount(Tag, {
      propsData: {
        closable: true
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
