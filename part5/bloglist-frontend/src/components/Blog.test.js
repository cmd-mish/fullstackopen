import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders a default view of a blog', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 10,
    user: '1234'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog-default')

  screen.debug(div)

  expect(div).toHaveTextContent('test blog')
  expect(div).not.toHaveTextContent('test url')
  expect(div).not.toHaveTextContent('10')
})