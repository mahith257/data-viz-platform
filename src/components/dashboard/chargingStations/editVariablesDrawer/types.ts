export interface IVariable {
  label: string;
  value: string;
  selected?: boolean;
}

export interface IVariableCategory {
  label: string;
  value: string;
  variables: IVariable[];
}
