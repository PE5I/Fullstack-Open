import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test://url',
    likes: 99
  }

  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const likes = screen.queryByTestId('99')

  expect(title).not.toBeNull()
  expect(author).not.toBeNull()
  expect(url).toBeNull()
  expect(likes).toBeNull()
  // expect(author).toBeDefined()
  // expect(url).toBeDefined()
  // expect(likes).toBeDefined()

})