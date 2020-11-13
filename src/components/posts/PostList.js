import React, { useContext, useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostList = props => {
    const { posts, getAllPosts, getPostsByUser, myposts } = useContext(PostContext)

    const [view, setView] = useState('all')

    const [userPost, setUserPosts] = useState(true)

    useEffect(() => {
        if (props.match) {
            if (props.match.path === '/posts/myposts') {
                const owner = posts.find(p => p.is_owner === true)
                getPostsByUser(owner.author_id);
                setView('myposts')
                setUserPosts(false)
            }
        }
        else {
            getAllPosts()
        }
    }, [])

    // useEffect(() => {
    //     getAllPosts()
    // }, [])

    // useEffect(() => {
    //     const owner = posts.find(p => p.is_owner === true) || {}
        
    //         if (owner != undefined) {
    //             getPostsByUser(owner.author_id)
                
    //     }
        
    // }, [posts])

    

    return (
        <div>

            <article className = "post-list">
                <h1>{view === 'myposts' ? 'My ' : ''}Posts</h1>
                <button className="addPostBtn btn btn-primary"
                onClick={
                    () =>
                    props.history.push("/posts/create")}>Add New Post</button>

                {userPost ?
                    posts.map(post => {
                        // this function checks to see if the current user has any posts that they wrote
                        const ableToEdit = () => {
                            if (post.is_owner === true) {
                                return true
                            } else {
                                return false
                            }
                        }
                        return <section className = "post-preview" key={post.id}>
                            <div className = "post-preview-header">
                                By: {post.author.user.first_name} {post.author.user.last_name}
                                {ableToEdit() ? (<span className="edit-button"> {/* If user id matches the post.user_id they will be able to edit post */}
                                    <i className="fas fa-edit"
                                    style={{cursor:'pointer'}}
                                    onClick={() => {props.history.push(`/posts/edit/${post.id}`)}}>Edit</i>
                                </span>) : <span className="edit-button"> </span>}
                                
                            </div>
                            <div className="post-preview-title">
                                <Link to={`/posts/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </Link>
                            </div>
                            <div className = "post-preview-footer">
                                Category: {post.category.label}
                            </div>
                        </section>
                    })
                    : myposts.map(post => {
                        // this function checks to see if the current user has any posts that they wrote
                        const ableToEdit = () => {
                            if (post.is_owner === true) {
                                return true
                            } else {
                                return false
                            }
                        }
                        return <section className = "post-preview" key={post.id}>
                            <div className = "post-preview-header">
                                By: {post.author.user.first_name} {post.author.user.last_name}
                                {ableToEdit() ? (<span className="edit-button"> {/* If user id matches the post.user_id they will be able to edit post */}
                                    <i className="fas fa-edit"
                                    style={{cursor:'pointer'}}
                                    onClick={() => {props.history.push(`/posts/edit/${post.id}`)}}>Edit</i>
                                </span>) : <span className="edit-button"> </span>}
                                
                            </div>
                            <div className="post-preview-title">
                                <Link to={`/posts/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </Link>
                            </div>
                            <div className = "post-preview-footer">
                                Category: {post.category.label}
                            </div>
                        </section>
                    })
                }
            </article>

        </div>
    )
}