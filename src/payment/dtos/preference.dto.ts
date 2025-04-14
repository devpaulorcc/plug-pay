export enum Currency {
    BRL = 'BRL',
    USD = 'USD',
    EUR = 'EUR',
}

export interface PreferenceItem {
    title: string;
    quantity: number;
    currency_id: Currency;
    unit_price: number;
}

export interface BackUrls {
    success: string;
    failure: string;
}

export interface PreferenceDtoProps {
    items: PreferenceItem[];
    back_urls: BackUrls;
    auto_return: 'approved' | 'pending' | 'all';
}

export class PreferenceDto {
    public items: PreferenceItem[];
    public back_urls: BackUrls;
    public auto_return: 'approved' | 'pending' | 'all';

    constructor(data: PreferenceDtoProps) {
        this.items = data.items;
        this.back_urls = data.back_urls;
        this.auto_return = data.auto_return;
    }
}
