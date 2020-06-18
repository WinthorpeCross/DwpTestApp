export interface IUserModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    ip_address: string;
    latitude: number;
    longitude: number;
    // below three properties were added for my own sanity check on the data - i've left them in and display on UI
    normal_lat: number;
    normal_lng: number;
    distance: number;
}
