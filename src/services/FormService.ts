import axios, { AxiosError, type AxiosResponse } from 'axios';

export default class FormService {
    public processing: boolean = false;
    public data?: any;
    public errors?: any;

    public async send(method: string, endpoint: string, data?: object, headers?: any): Promise<void> {
        this.processing = true;

        try {
            const response: AxiosResponse = await axios({
                method: method,
                url: endpoint,
                data: data,
                headers: headers,
            });
            this.clearErrors();
            this.data = response?.data;
            this.processing = false;
        } catch (e: any) {
            this.processing = false;
            
            if (e.response?.data.errors) {
                this.setErrors(e.response.data.errors)
                throw e.response.data
            }else if (e.response?.status)
                throw e.response.status
            else
                throw 'Something went wrong.';
        }
    }

    private clearErrors(): void {
        this.errors = undefined;
    }

    private setErrors(errors: AxiosError): void {
        this.errors = errors;
    }
}