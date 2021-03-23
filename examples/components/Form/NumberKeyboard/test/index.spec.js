/* global describe,test,expect */

import { shallowMount } from '@vue/test-utils'
import NumberKeyboard from '@/NumberKeyboard'

describe('NumberKeyboard', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props customKey="." correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      propsData: {
        customKey: '.'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props type="rightColumn" correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      propsData: {
        type: 'rightColumn'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props type="rightColumn" and customKey=["00", "."] correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      propsData: {
        type: 'rightColumn',
        customKey: ['00', '.']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
