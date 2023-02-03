import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import { getTodos } from './api';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/todo-lists');
        const data = await res.json();
        setTodos(data.map((todo) => todo));
      } catch (err) {
        console.error(err);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!todo) return;
    if (todo.length > 50) {
      alert('Todo must be less than 50 characters');
      return;
    }

    const newTodo = {
      content: todo,
    };

    await fetch('http://localhost:8000/api/todo-lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos([...todos, data]);
      })
      .catch((err) => console.error(err));
  };

  const updateTodo = (index) => {
    if (!todo) return;
    if (todo.length > 50) {
      alert('Todo must be less than 50 characters');
      return;
    }

    fetch(`http://localhost:8000/api/todo-lists/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: todo }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === index) {
            todo.content = data.content;
          }
          return todo;
        });
        setTodos(updatedTodos);
        setEditing(false);
        setEditIndex(-1);
      })
      .catch((err) => console.error(err));
  };

  const startEditing = (index) => {
    setEditing(true);
    setEditIndex(index);
    setTodo(todos[index]);
  };

  const deleteTodo = (index) => {
    fetch(`http://localhost:8000/api/todo-lists/${index}`, {
      method: 'DELETE',
    });
    const updatedTodos = todos.filter((todo) => todo.id !== index);
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          onChangeText={setTodo}
          placeholder="Add a todo"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoContainer}>
            {editing && editIndex === index ? (
              <TextInput
                style={styles.input}
                onChangeText={setTodo}
                defaultValue={item.content}
              />
            ) : (
              <Text>{item.content}</Text>
            )}
            <View style={styles.buttonContainer}>
              {editing && editIndex === index ? (
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => updateTodo(item.id)}
                >
                  <Text>Update</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => startEditing(index)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTodo(item.id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '50%',
    alignSelf: 'center',
  },
  inputcontainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#008080',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#ffa500',
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
