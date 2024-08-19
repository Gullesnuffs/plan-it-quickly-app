import React from 'react';
import TodoList from '../components/TodoList';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default Index;