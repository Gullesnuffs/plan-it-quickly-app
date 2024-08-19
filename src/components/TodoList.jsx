import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const fetchTodos = async () => {
  // Simulating API call
  return [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
  ];
};

const TodoList = () => {
  const queryClient = useQueryClient();
  const [nextId, setNextId] = useState(3);

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: (newTodo) => {
      // Simulating API call
      return Promise.resolve({ ...newTodo, id: nextId });
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) => [...oldTodos, newTodo]);
      setNextId(nextId + 1);
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: (todoId) => {
      // Simulating API call
      return Promise.resolve(todoId);
    },
    onSuccess: (todoId) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (todoId) => {
      // Simulating API call
      return Promise.resolve(todoId);
    },
    onSuccess: (todoId) => {
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos.filter((todo) => todo.id !== todoId)
      );
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <AddTodoForm onAdd={(text) => addTodoMutation.mutate({ text, completed: false })} />
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodoMutation.mutate(todo.id)}
            onDelete={() => deleteTodoMutation.mutate(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;