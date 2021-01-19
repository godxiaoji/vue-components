/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import NoticeBar from '@/NoticeBar'

describe('NoticeBar', () => {
  test('should render default correctly', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        title: 'title'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop leftIcon="SoundOutlined" correctly', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        title: 'title',
        leftIcon: 'SoundOutlined'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop mode="closable" correctly', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        title: 'title',
        mode: 'closable'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop mode="clickable" correctly', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        title: 'title',
        mode: 'clickable'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
