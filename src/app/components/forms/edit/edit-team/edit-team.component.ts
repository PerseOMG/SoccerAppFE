import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { IFormFields } from '../../../../models/form-fields.model';
import { FORMS_CONFIG } from '../../../../../assets/consts/configs/forms-config.consts';
import { AppTitleService } from '../../../../services/appTitle/app-title.service';
import { TeamsFacade } from '../../../../state/teams/teams.facade';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  editTeamForm: FormGroup;
  id$ = this.route.params.pipe(map((params) => params['id']));
  teamValues$ = combineLatest([this.id$]).pipe(
    switchMap(([id]) => this.teamsFacade.getTeamSelected(id)),
    map((teamValue) => teamValue)
  );

  constructor(
    private route: ActivatedRoute,
    private titleService: AppTitleService,
    private teamsFacade: TeamsFacade
  ) {
    this.titleService.setDocTitle(`Edit Team`);
    this.teamValues$.subscribe((team) => {
      console.log(team);
      this.editTeamForm = new FormGroup({
        logo: new FormControl(team.logo, [Validators.required]),
        name: new FormControl(team.name, [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ]),
        tournaments: new FormControl('', Validators.required),
      });
    });
  }

  ngOnInit(): void {}
}
