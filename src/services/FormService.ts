import axios, { AxiosError, type AxiosResponse } from 'axios';

export default class FormService {
    public processing: boolean = false;
    public data?: any;
    public errors?: any;

    public async send(method: string, endpoint: string, data?: object): Promise<void> {
        this.processing = true;
        
        try {
            const response: AxiosResponse = await axios({
                method: method,
                url: endpoint,
                data: data
            });
            this.clearErrors();
            this.data = response?.data;
            this.processing = false;
        } catch (error: any) {
            this.processing = false;
            
            if (error.response?.data.errors) 
                this.setErrors(error.response.data.errors)
            else if (error.response?.status)
                throw error.response.status
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