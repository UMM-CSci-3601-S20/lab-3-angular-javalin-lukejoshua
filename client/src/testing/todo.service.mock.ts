import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Todo} from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `UserService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'bill_id',
      owner: 'Microsoft',
      status: false,
      body: 'UMM',
      category: 'video games',
    },
    {
      _id: 'cookie_id',
      owner: 'Cookie',
      status: true,
      body: 'UMM',
      category: 'homework',
    },
    {
      _id: 'jamie_id',
      owner: 'Van Halen Fan',
      status: true,
      body: 'UMM',
      category: 'music',
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { status?: boolean, owner?: string, body?: string, category?: string }): Observable<Todo[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
    // If the specified ID is for the first test user,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else {
      return of(null);
    }
  }

}
