import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Assignment } from '../assignment.model';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private assignmentService: AssignmentsService, private router: Router) { }

  nomDevoir: string = "";
  dateDeRendu: Date = new Date();

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = new Date();
    newAssignment.rendu = false;
    this.assignmentService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  deleteAssignment() {
    this.nomDevoir = "";
    this.dateDeRendu = new Date();
  }
}