import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo, StatusType } from './todo';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(filters?: { status?: StatusType, owner?: string, body?: string, category?: string, limit?: number}): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {

      if (filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }

      if (filters.limit) {
        httpParams = httpParams.set('limit',filters.limit.toString());
      }

    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: { owner?: string, body?: string, category?: string}): Todo[] {

    let filteredTodos = todos;

    // Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.owner.toLowerCase().indexOf(filters.owner) !== -1;
      });
    }

    // Filter by body
    if (filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.body.toLowerCase().indexOf(filters.body) !== -1;
      });
    }

    // Filter by category
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return todo.category.toLowerCase().indexOf(filters.category) !== -1;
      });
    }


    return filteredTodos;
  }
}
