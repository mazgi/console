import React from 'react'
import Template from '.'
import { shallow } from 'enzyme'

describe('Template default', () => {
  const template = shallow(
    <Template>
      <p>foo</p>
    </Template>
  )

  it('render the template', () => {
    expect(template.contains(<p>foo</p>)).toBeTruthy()
  })
})
