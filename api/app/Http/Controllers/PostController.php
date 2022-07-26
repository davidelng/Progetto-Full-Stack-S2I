<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::select('posts.id as post_id', 'posts.created_at', 'posts.updated_at', 'name as author_name', 'author as author_id', 'title', 'content')
            ->leftJoin('users', 'posts.author', '=', 'users.id')
            ->orderBy('post_id', 'desc')
            ->get();

        return $posts;
    }

    /**
     * Display a listing of the resource for the specified user.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexUser($user)
    {
        // $posts = Post::where('author', '=', $user)->get();
        $posts = Post::select('id as post_id', 'created_at', 'updated_at', 'author as author_id', 'title', 'content')
            ->where('author', '=', $user)
            ->orderBy('post_id', 'desc')
            ->get();

        return $posts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();

        $post = new Post;

        $post->author = $validated['author'];
        $post->title = $validated['title'];
        $post->content = $validated['content'];

        $post->save();

        // return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $validated = $request->validated();

        $post->title = $validated['title'];
        $post->content = $validated['content'];

        $post->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }
}
