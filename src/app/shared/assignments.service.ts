import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ASSIGNMENTS } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  backendURL = 'https://angularmiagebackend.onrender.com';
  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} a échoué: ${error.message}');
      return of(result as T);
    };
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.backendURL);
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.backendURL + '/' + id)
      .pipe(map(a => {
        a.nom += " transformé avec un pipe";
        return a;
      }),
        tap(_ => {
          console.log("tap: assignment avec id=" + id + " requête GET envoyée sur MongoDB cloud !");
        }),
        catchError(this.handleError<Assignment>('### catchError: getAssignment id=${id}'))
      );
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.backendURL + '?page=' + page + '&limit=' + limit);
  }


  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.backendURL, assignment, this.HttpOptions);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backendURL, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete<Assignment>(this.backendURL + '/' + assignment.id);
  }

  peupleDBavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];


    ASSIGNMENTS.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }
}
