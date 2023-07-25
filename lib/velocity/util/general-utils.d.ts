export declare const generalUtils: {
    errors: any[];
    quiet: () => string;
    qr: () => string;
    escapeJavaScript(value: any): any;
    urlEncode(value: any): string;
    urlDecode(value: any): string;
    base64Encode(value: any): string;
    base64Decode(value: any): string;
    parseJson(value: any): any;
    toJson(value: any): string;
    autoId(): string;
    autoUlid: () => string;
    unauthorized(): never;
    error(message: any, type?: any, data?: any, errorInfo?: any): never;
    appendError(message: any, type?: any, data?: any, errorInfo?: any): string;
    getErrors(): any;
    validate(allGood: any, message: any, errorType: any, data: any): string;
    isNull(value: any): boolean;
    isNullOrEmpty(value: any): any;
    isNullOrBlank(value: any): any;
    defaultIfNull(value: any, defaultValue?: string): any;
    defaultIfNullOrEmpty(value: any, defaultValue: any): any;
    defaultIfNullOrBlank(value: any, defaultValue: any): any;
    isString(value: any): boolean;
    isNumber(value: any): boolean;
    isBoolean(value: any): boolean;
    isList(value: any): boolean;
    isMap(value: any): boolean | Map<any, any>;
    typeOf(value: any): "Null" | "List" | "Map" | "Number" | "String" | "Boolean" | "Object";
    matches(pattern: any, value: any): boolean;
};
