import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
  }

  getTasks() {
    // return this._http.get('/api/tasks');
    return this._http.get('/api/tasks', {observe: 'body', responseType: 'json'});
  }

  getTaskbyId(_id) {
    return this._http.get(`/api/tasks/${_id}`);
  }

  storeTask(task) {
    return this._http.post('/api/tasks', task);

  }

  deleteTaskbyId(_id) {
    return this._http.delete(`/api/tasks/${_id}`);
  }

  editTask(task, _id) {
    console.log('Task received to edit: ', task);
    console.log('Task ID: : ', _id);
    return this._http.put(`/api/tasks/${_id}`, task);
  }

}
