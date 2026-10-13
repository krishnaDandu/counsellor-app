import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class commonApiService {

  private baseUrl = 'http://localhost:8080/api/';


  constructor(private http: HttpClient) { }

  /**
   * Generic POST method
   * @param endpoint - The API endpoint (e.g., '/users' or '/login')
   * @param data - The payload body to send
   */
  // postData<T>(endpoint: string, data: any, responseType: 'json' | 'text' = 'json'): Observable<T> {
  //   const url = `${this.baseUrl}${endpoint}`;

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //       // You can add Authorization headers here if needed
  //     }),
  //     responseType: responseType
  //   };

  //   // Returns an Observable of type T
  //   return this.http.post<T>(url, data, httpOptions as any) as Observable<T>;
  // }

  postAPI<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    return this.http.post<T>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   responseType: 'text' as const
    // };

    // return this.http.post(
    //   url,
    //   data,
    //   httpOptions
    // );
  }

  postTextAPI(endpoint: string, data: any): Observable<string> {
    const url = `${this.baseUrl}${endpoint}`;

    return this.http.post(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }

  getApi<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const httpOptions: { headers: HttpHeaders; params?: HttpParams } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // You can add Authorization headers here if needed
      })
    };

    if (params) {
      httpOptions.params = new HttpParams({ fromObject: params });
    }

    // Returns an Observable of type T
    return this.http.get<T>(url, httpOptions);
  }

} 