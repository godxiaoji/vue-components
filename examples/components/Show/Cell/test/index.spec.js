/* global describe,test,expect */

import { mount } from '@vue/test-utils'
import Cell from '@/Cell'

describe('Cell', () => {
  test('should render default correctly', () => {
    const wrapper = mount(Cell, {
      props: {
        label: 'label',
        content: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
