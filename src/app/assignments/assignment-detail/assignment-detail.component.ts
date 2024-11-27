import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  @Output() deleteAssignmentEvent = new EventEmitter<Assignment>();


  assignmentTransmis !: Assignment;
  constructor(private assignmentService:AssignmentsService, private route:ActivatedRoute, private router:Router,
     private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.getAssignment();
  }

  getAssignment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.assignmentService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onAssignmentRendu() {
    this.assignmentService.updateAssignment(this.assignmentTransmis).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    });
  }

  deleteAssignment() {
    this.assignmentService.deleteAssignment(this.assignmentTransmis).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    });
  }

  editAssignment() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {queryParams: {nom: this.assignmentTransmis.nom}, 
      fragment: 'edition'});
  } 

  isAdmin(): boolean | undefined {
    return this.authService.isUserAdmin();
  }
}
