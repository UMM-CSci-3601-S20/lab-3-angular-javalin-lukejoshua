import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Todo service: ', () => {
  // A small collection of test users
  const testTodos: Todo[] = [
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
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the users we get from this call to getUsers()
    // should be our set of test users. Because we're subscribing
    // to the result of getUsers(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testUsers) a few lines
    // down.
    todoService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  // it('getTodos() calls api/todos with filter parameter \'true\'', () => {

  //   todoService.getTodos({ status: true }).subscribe(
  //     todos => {
  //       expect(todos).toBe(testTodos);
  //       todos.forEach(td => {
  //         expect(td.status).toBe(true);
  //       });
  //     }
  // );

  //   // Specify that (exactly) one request will be made to the specified URL with the status parameter.
  //   const req = httpTestingController.expectOne(
  //     (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
  //   );

  //   // Check that the request made to that URL was a GET request.
  //   expect(req.request.method).toEqual('GET');

  //   // Check that the status parameter was 'true'
  //   expect(req.request.params.get('status')).toBeTruthy(true);

  //   req.flush(testTodos);
  // });

  // it('getUsers() calls api/users with filter parameter \'age\'', () => {

  //   todoService.getUsers({ age: 25 }).subscribe(
  //     users => expect(users).toBe(testTodos)
  //   );

  //   // Specify that (exactly) one request will be made to the specified URL with the role parameter.
  //   const req = httpTestingController.expectOne(
  //     (request) => request.url.startsWith(todoService.userUrl) && request.params.has('age')
  //   );

  //   // Check that the request made to that URL was a GET request.
  //   expect(req.request.method).toEqual('GET');

  //   // Check that the role parameter was 'admin'
  //   expect(req.request.params.get('age')).toEqual('25');

  //   req.flush(testTodos);
  // });

  // it('getUsers() calls api/users with multiple filter parameters', () => {

  //   todoService.getUsers({ role: 'editor', company: 'IBM', age: 37 }).subscribe(
  //     users => expect(users).toBe(testTodos)
  //   );

  //   // Specify that (exactly) one request will be made to the specified URL with the role parameter.
  //   const req = httpTestingController.expectOne(
  //     (request) => request.url.startsWith(todoService.userUrl)
  //       && request.params.has('role') && request.params.has('company') && request.params.has('age')
  //   );

  //   // Check that the request made to that URL was a GET request.
  //   expect(req.request.method).toEqual('GET');

  //   // Check that the role parameters are correct
  //   expect(req.request.params.get('role')).toEqual('editor');
  //   expect(req.request.params.get('company')).toEqual('IBM');
  //   expect(req.request.params.get('age')).toEqual('37');

  //   req.flush(testTodos);
  // });

  // it('getUserById() calls api/users/id', () => {
  //   const targetUser: User = testTodos[1];
  //   const targetId: string = targetUser._id;
  //   todoService.getUserById(targetId).subscribe(
  //     user => expect(user).toBe(targetUser)
  //   );

  //   const expectedUrl: string = todoService.userUrl + '/' + targetId;
  //   const req = httpTestingController.expectOne(expectedUrl);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(targetUser);
  // });

  // it('filterUsers() filters by name', () => {
  //   expect(testTodos.length).toBe(3);
  //   const userName = 'a';
  //   expect(todoService.filterUsers(testTodos, { name: userName }).length).toBe(2);
  // });

  // it('filterUsers() filters by company', () => {
  //   expect(testTodos.length).toBe(3);
  //   const userCompany = 'UMM';
  //   expect(todoService.filterUsers(testTodos, { company: userCompany }).length).toBe(1);
  // });

  // it('filterUsers() filters by name and company', () => {
  //   expect(testTodos.length).toBe(3);
  //   const userCompany = 'UMM';
  //   const userName = 'chris';
  //   expect(todoService.filterUsers(testTodos, { name: userName, company: userCompany }).length).toBe(1);
  // });
});
