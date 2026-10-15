interface BaseColumn {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'status';
  sortable?: boolean;
  getValue?: (row: any) => any;
}

export interface TextColumn extends BaseColumn {
  type: 'text';
  uppercase?: boolean;
  // Optional muted line shown under the main value.
  getSecondary?: (row: any) => string;
}

export interface DateColumn extends BaseColumn {
  type: 'date';
  dateFormat?: string;
}

export interface NumberColumn extends BaseColumn {
  type: 'number';
  precision?: number;
}

// Renders `getValue` as a coloured tag; the raw `row[key]` selects the colour.
export interface StatusColumn extends BaseColumn {
  type: 'status';
}

export interface ActionColumn {
  key: string;
  label: string;
  type: 'action';
  icon: string;
  tooltip?: string;
  sortable?: false;
  action: (row: any, reload: () => void) => void;
}

export type ColumnConfig = TextColumn | DateColumn | NumberColumn | StatusColumn | ActionColumn;
