/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import QrCode from '@/QrCode'

describe('QrCode', () => {
  test('should render prop text="hello world" correctly', () => {
    const wrapper = shallowMount(QrCode, {
      props: {
        text: 'hello world'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
