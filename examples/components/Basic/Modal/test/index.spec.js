/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Modal from '@/Modal'

describe('Modal', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Modal, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
