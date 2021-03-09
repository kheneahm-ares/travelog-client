import { ILocation } from "../interfaces/ILocation";

export class ActivityLocation implements ILocation
{
    public address: string;
    public latitude: number;
    public longitude: number;

    constructor()
    {
        this.address = "";
        this.latitude = 0;
        this.longitude = 0;
    }

}