import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoCardComponent } from './todo-card.component';
import { TodoListComponent } from './todos-list.component';
import { TodoService } from './todo.service';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [TodoListComponent, TodoCardComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the users', () => {
    expect(todoList.serverFilteredTodos.length).toBe(5);
  });

  it('contains a todo owner \'Microsoft\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Microsoft')).toBe(true);
  });

  it('contain a todo owner \'Van Halen Fan\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Van Halen Fan')).toBe(true);
  });

  it('doesn\'t contain a todo owner \'Santa\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });

  it('has four todos that status is true', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.status === true).length).toBe(4);
  });

  it('three owners of Cookie with limit', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.owner === "Cookie"
    && todoList.todoLimit === 3).length).toBe(3);
  });

  it('three owners of Cookie without limit', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.owner === "Cookie").length).toBe(3);
  });

  it('five bodies with UMM', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.body === "UMM").length).toBe(5);
  });

});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoServiceStub: {
    getTodos: () => Observable<Todo[]>;
    getTodosFiltered: () => Observable<Todo[]>;
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoServiceStub = {
      getTodos: () => new Observable(observer => {
        observer.error('Error-prone observable');
      }),
      getTodosFiltered: () => new Observable(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [TodoListComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: TodoService, useValue: todoServiceStub }]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(todoList.serverFilteredTodos).toBeUndefined();
  });
});
