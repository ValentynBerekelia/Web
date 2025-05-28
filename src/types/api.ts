import { Cursor, Package, CursorType } from './cursor';

export interface Api {
    // Cursors
    getCursors(): Promise<Cursor[]>;
    getCursor(id: number): Promise<Cursor>;
    createCursor(formData: FormData): Promise<Cursor>;
    updateCursor(id: number, formData: FormData): Promise<void>;
    deleteCursor(id: number): Promise<void>;

    // Packages
    getPackages(): Promise<Package[]>;
    getPackage(id: number): Promise<Package>;
    createPackage(packageData: Package): Promise<Package>;
    updatePackage(id: number, packageData: Package): Promise<void>;
    deletePackage(id: number): Promise<void>;

    // Cursor Types
    getCursorTypes(): Promise<CursorType[]>;
    getCursorType(id: number): Promise<CursorType>;
    createCursorType(cursorType: CursorType): Promise<CursorType>;
    updateCursorType(id: number, cursorType: CursorType): Promise<void>;
    deleteCursorType(id: number): Promise<void>;
} 