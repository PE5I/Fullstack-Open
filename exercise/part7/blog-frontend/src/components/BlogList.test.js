// import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogList from './BlogList'

describe('<BlogList />', () => {
  let newUser
  let blog
  let container
  let mockUpdateHandler

  beforeEach(() => {
    newUser = {
      name: 'admin',
    }

    blog = {
      title: 'test blog',
      author: 'test author',
      url: 'test://url',
      likes: 99,
      user: newUser,
    }

    mockUpdateHandler = jest.fn()

    container = render(
      <BlogList blog={blog} updateBlog={mockUpdateHandler} />
    ).container
  })

  test('only title and author are shown when blog is initially displayed', () => {
    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')
    const likes = screen.queryByTestId('99')

    expect(title).not.toBeNull()
    expect(author).not.toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('url and likes are displayed when visibility button is clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.visible-button')
    await user.click(button)

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(title).not.toBeNull()
    expect(author).not.toBeNull()
    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
  })

  test('when like button is clicked twice, the event handler is called twice', async () => {
    // make the blog information visible first
    const user = userEvent.setup()
    const visibleButton = container.querySelector('.visible-button')
    await user.click(visibleButton)

    const likeButton = container.querySelector('.like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})
