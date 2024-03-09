import { store } from '@/store';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export default abstract class HttpClientService {
    public processing: boolean = false;
    public data?: any;
    public errors?: any;
    public errorMessage?: string;

    public async send(method: string, endpoint: string, data?: any, headers?: any): Promise<void> {
        this.processing = true;

        try {
            const response: AxiosResponse = await axios({
                method: method,
                url: endpoint,
                data: data,
                headers: headers,
            });
            this.setErrors(undefined);
            this.setErrorMessage(undefined);
            this.data = response?.data;
            this.processing = false;
        } catch (e: any) {
            this.processing = false;

            if (e.response?.data.errors) {
                this.setErrorMessage(e.response.data.message);
                this.setErrors(e.response.data.errors)
            } else if (e.response?.data)
                store.commit('setGlobalError', 'Something went wrong.');
            else
                store.commit('setGlobalError', 'Something went wrong.');
        }
    }

    private setErrors(errors?: AxiosError): void {
        this.errors = errors;
    }

    private setErrorMessage(message?: string): void {
        this.errorMessage = message;
    }
}