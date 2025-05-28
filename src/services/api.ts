import axios, { AxiosInstance } from 'axios';
import { Cursor, Package, CursorType } from '../types/cursor';
import { Api } from '../types/api';

const API_URL = 'https://localhost:7001/api';

class ApiService implements Api {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_URL
        });
    }

    // Cursors
    async getCursors(): Promise<Cursor[]> {
        const response = await this.axiosInstance.get<Cursor[]>('/cursors');
        return response.data;
    }

    async getCursor(id: number): Promise<Cursor> {
        const response = await this.axiosInstance.get<Cursor>(`/cursors/${id}`);
        return response.data;
    }

    async createCursor(formData: FormData): Promise<Cursor> {
        const response = await this.axiosInstance.post<Cursor>('/cursors/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async updateCursor(id: number, formData: FormData): Promise<void> {
        await this.axiosInstance.put(`/cursors/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    async deleteCursor(id: number): Promise<void> {
        await this.axiosInstance.delete(`/cursors/delete/${id}`);
    }

    // Packages
    async getPackages(): Promise<Package[]> {
        const response = await this.axiosInstance.get<Package[]>('/packages');
        return response.data;
    }

    async getPackage(id: number): Promise<Package> {
        const response = await this.axiosInstance.get<Package>(`/packages/${id}`);
        return response.data;
    }

    async createPackage(packageData: Package): Promise<Package> {
        const response = await this.axiosInstance.post<Package>('/packages', packageData);
        return response.data;
    }

    async updatePackage(id: number, packageData: Package): Promise<void> {
        await this.axiosInstance.put(`/packages/${id}`, packageData);
    }

    async deletePackage(id: number): Promise<void> {
        await this.axiosInstance.delete(`/packages/${id}`);
    }

    // Cursor Types
    async getCursorTypes(): Promise<CursorType[]> {
        const response = await this.axiosInstance.get<CursorType[]>('/cursortypes');
        return response.data;
    }

    async getCursorType(id: number): Promise<CursorType> {
        const response = await this.axiosInstance.get<CursorType>(`/cursortypes/${id}`);
        return response.data;
    }

    async createCursorType(cursorType: CursorType): Promise<CursorType> {
        const response = await this.axiosInstance.post<CursorType>('/cursortypes', cursorType);
        return response.data;
    }

    async updateCursorType(id: number, cursorType: CursorType): Promise<void> {
        await this.axiosInstance.put(`/cursortypes/${id}`, cursorType);
    }

    async deleteCursorType(id: number): Promise<void> {
        await this.axiosInstance.delete(`/cursortypes/${id}`);
    }
}

const api = new ApiService();
export default api; 