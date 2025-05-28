export interface Package {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface CursorType {
    id: number;
    name: string;
    description: string;
}

export interface Cursor {
    id: number;
    packageId: number;
    cursorTypeId: number;
    cursorName: string;
    pathToIcon: string;
    package?: Package;
    type?: CursorType;
} 