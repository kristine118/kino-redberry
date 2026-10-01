import { Format } from "./format";
export interface Venue {
    id: number;
    slug: string;
    name: string;
    city: string;
    formats: Format[];
}
