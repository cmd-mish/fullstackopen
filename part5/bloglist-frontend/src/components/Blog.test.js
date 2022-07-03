import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog test', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'http://testurl/',
      likes: 10,
      user: '1234'
    }

    container = render(<Blog blog={blog} />).container
  })

  test('renders a default view of a blog', () => {
    const div = container.querySelector('.blog-default')

    expect(div).toHaveTextContent('test blog')
    expect(div).not.toHaveTextContent('http://testurl/')
    expect(div).not.toHaveTextContent('10')
  })

  test('blog\'s url, number of likes and author are shown when the button is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-expanded')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('http://testurl/')
    expect(div).toHaveTextContent('test blog')
    expect(div).toHaveTextContent('10')
  })
})