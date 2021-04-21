/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import Timeline from '@/Timeline'
import TimelineItem from '@/TimelineItem'

describe('Timeline', () => {
  test('Timeline should render default correctly', () => {
    const wrapper = shallowMount(Timeline, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('TimelineItem should render default correctly', () => {
    const wrapper = shallowMount(TimelineItem, {
      props: { title: 'title-1' },
      slots: {
        default: 'content-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
