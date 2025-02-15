export interface FilterConfig {
    type: 'text' | 'checkbox';
    label: string;
    property: string;
    placeholder?: string;
    defaultValue?: any;
}