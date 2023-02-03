<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoListRequest;
use App\Http\Requests\UpdateTodoListRequest;
use App\Models\TodoList;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todoLists = TodoList::all();

        //return todolists as json data to api
        return response()->json($todoLists);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTodoListRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoListRequest $request)
    {
        $todoList = new TodoList();
        $todoList->fill($request->validated());
        $todoList->save();
        return response()->json($todoList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTodoListRequest  $request
     * @param  \App\Models\TodoList  $todoList
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodoListRequest $request, TodoList $todoList)
    {
        $updatedTodoList = $todoList->fill($request->validated());
        $updatedTodoList->save();
        return response()->json($updatedTodoList);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TodoList  $todoList
     * @return \Illuminate\Http\Response
     */
    public function destroy(TodoList $todoList)
    {
        $todoList->delete();
        return response()->json(null, 204);
    }
}
