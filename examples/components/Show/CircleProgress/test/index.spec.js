/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import CircleProgress from '@/CircleProgress'

describe('CircleProgress', () => {
  test('should render default slot correctly', async () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 0 }
    })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ percentage: 50 })
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ percentage: 100 })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render custom default slot correctly', () => {
    const wrapper = shallowMount(CircleProgress, {
      scopedSlots: {
        default: `<span>Sale {{ props.progress }}</span>`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should prop percentage=800 then progress="100%" correctly', async () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 800 }
    })

    expect(wrapper.vm.progress).toBe('100%')
  })
})
