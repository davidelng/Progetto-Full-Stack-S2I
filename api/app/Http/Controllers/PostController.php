<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::select('posts.id as post_id', 'posts.created_at', 'posts.updated_at', 'name as author_name', 'author_id', 'title', 'content')
            ->leftJoin('users', 'posts.author_id', '=', 'users.id')
            ->orderBy('post_id', 'desc')
            ->get();

        return response($posts, 200);
    }

    /**
     * Display a listing of the resource for a specific user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function indexUser($user)
    {
        $posts = Post::select('id as post_id', 'created_at', 'updated_at', 'author_id', 'title', 'content')
            ->where('author_id', '=', $user)
            ->orderBy('post_id', 'desc')
            ->get();

        return response($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_id' => ['required'],
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ]);

        $post = new Post;

        $post->author_id = $validated['author_id'];
        $post->title = $validated['title'];
        $post->content = $validated['content'];

        $post->save();

        return response(['message' => 'Post saved'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response($post, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ]);

        $post->title = $validated['title'];
        $post->content = $validated['content'];

        $post->update();

        return response(['message' => 'Post updated'], 201);
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

        return response(['message' => 'Post deleted'], 200);
    }
}
