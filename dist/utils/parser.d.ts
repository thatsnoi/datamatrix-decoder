export interface Rule {
    control: string;
    length: number | null;
    mandatory: boolean;
    name: string;
    callback?: (value: any) => any;
}
export declare function parse<T>(data: string, rules: Rule[]): T;
export declare function readRule(rule: Rule, data: string, position: number): {
    rule: Rule;
    value: any;
    read: number;
    position: number;
};
export declare function readKey(data: string, position?: number, controlLength?: number): {
    key: any;
    read: number;
    newPosition: number;
};
export declare function readSection(data: string, position: number, length?: number): {
    section: any;
    read: number;
    newPosition: number;
};
