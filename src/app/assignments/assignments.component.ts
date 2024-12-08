import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Assignment } from './assignment.model';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [MatInputModule, CommonModule, RenduDirective, FormsModule, MatButtonModule,
    MatListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    RouterLink, MatPaginatorModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {
  titre = "Mon application sur les assignments !";
  assignments !: Assignment[];
  isLogged = false;
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  constructor(private assignmentService: AssignmentsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignments();
    this.isLogged = this.authService.isLoggedIn();
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }


  ajoutActive = false;
  nomDevoir: string = "";
  dateDeRendu: Date = new Date();
  assignmentSelectionne !: Assignment;
  formVisible = false;

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onSubmit(event: any) {
    //create a new assignment using assignment model
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = new Date();
    newAssignment.rendu = false;
    this.assignments.push(newAssignment);
  }

  peuplerBD() {
    this.assignmentService.peupleDBavecForkJoin().subscribe(() => {
      console.log("Peuplement de la BD réussi !");
      this.getAssignments();
      window.location.reload();
    });
  }
}
