import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements  PipeTransform
{
    transform(value: string, format: string): any
    {
        if (value)
        {
            let dateFormat: string = format;
            let yearFormat: boolean = (/^yyyy$/).test(dateFormat);
            let dutchDateFormat: boolean = (/^dd-MM-yyyy$/).test(dateFormat);

            if(yearFormat) {
                let date: Date = new Date(value);
                return date.getFullYear();
            }
            else if (dutchDateFormat)
            {
                let date: Date = new Date(value);
                return ('0' + (date.getDate())).slice(-2) + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
            }
            return value;
        }
        return;
    }
}
