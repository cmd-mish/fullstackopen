import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the event handler with right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#blog-form-title')
  const authorInput = container.querySelector('#blog-form-author')
  const urlInput = container.querySelector('#blog-form-url')
  const submitButton = container.querySelector('#blog-form-submit-button')

  await user.type(titleInput, 'testing the title')
  await user.type(authorInput, 'testing the author')
  await user.type(urlInput, 'testing the url')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing the title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing the author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing the url')
})