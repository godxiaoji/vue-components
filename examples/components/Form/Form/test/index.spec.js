/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Form from '@/components/Form'
import FormItem from '@/components/FormItem'

describe('Form', () => {
  test('Form should render default correctly', () => {
    const wrapper = mount(Form, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('FormItem should render default correctly', () => {
    const wrapper = mount(FormItem, {
      propsData: {
        name: 'test'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
