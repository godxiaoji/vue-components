/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Form from '@/Form'
import FormItem from '@/FormItem'

describe('Form', () => {
  test('Form should render default correctly', () => {
    const wrapper = mount(Form, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('FormItem should render default correctly', () => {
    const wrapper = mount(FormItem, {
      props: {
        name: 'test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
