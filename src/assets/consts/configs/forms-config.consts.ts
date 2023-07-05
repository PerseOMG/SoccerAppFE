export const FORMS_CONFIG = {
  team: [
    {
      key: 'logo',
      title: 'Logo [URL]',
      type: 'text',
      span: "If you can't see the logo above, please select other url",
      errorMessage: 'This field is required',
      validators: ['required'],
    },
    {
      key: 'name',
      title: 'Name',
      type: 'text',
      validators: ['required', 'maxLength:20', 'minLength:4'],
      errorMessage:
        'This field is required and must contain between 20 and 4 characters',
    },
    {
      key: 'tournaments',
      title: 'Select Tournaments',
      type: 'select',
      validators: [''],
      errorMessage: '*You can select max 5 tournaments, or it will be tired :c',
      maxSelected: 5,
    },
  ],
  tournament: [
    {
      key: 'logo',
      title: 'Logo [URL]',
      type: 'text',
      span: 'If you do not have one, it will be assigned automatically',
      validators: [''],
    },
    {
      key: 'name',
      title: 'Name',
      type: 'text',
      validators: ['required', 'maxLength:20', 'minLength:4'],
      errorMessage:
        'This field is required and must contain between 20 and 4 characters',
    },
    {
      key: 'teams',
      title: 'Select Teams',
      type: 'dragAndDrop',
      validators: [''],
      errorMessage:
        '*The teams must be multiply of 2 and Tournament only could have up to 20 teams',
      maxSelected: 20,
    },
    {
      key: 'winnerDefinition',
      title: 'Select how the winner should be defined',
      type: 'select',
      validators: ['required'],
      errorMessage: 'This field is required, please select only 1 option.',
      maxSelected: 1,
      options: [
        'playoffs',
        // 'points'
      ],
      changes: 'playoffsQuantity',
    },
    {
      key: 'playoffsQuantity',
      title: 'Select how many players pass to playoffs',
      type: 'select',
      validators: ['required'],
      errorMessage: 'This field is required.',
      maxSelected: 1,
      options: [2, 4, 8],
      isDependable: true,
      dependsOn: 'winnerDefinition',
      dependsOnValue: 'playoffs',
    },
  ],
};
