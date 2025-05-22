import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiviteService, Activite } from '../../services/activite.service';

@Component({
  standalone: true,
  selector: 'app-activite-list',
  templateUrl: './activite-list.component.html',
  imports: [CommonModule, FormsModule],
})
export class ActiviteListComponent implements OnInit {
  activites: Activite[] = [];
  newActiviteName = '';

  constructor(private activiteService: ActiviteService) {}

  ngOnInit(): void {
    this.loadActivites();
  }

  loadActivites() {
    this.activiteService.getActivites().subscribe(data => this.activites = data);
  }

  addActivite() {
    if (!this.newActiviteName.trim()) return;
    this.activiteService.addActivite(this.newActiviteName).subscribe(() => {
      this.newActiviteName = '';
      this.loadActivites();
    });
  }
}
