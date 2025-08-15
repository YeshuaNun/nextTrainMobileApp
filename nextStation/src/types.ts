export type category = "STREET" | "UNDERGROUND"

export interface CardMeta {
    id: number;
    category: category;
    title: string;
    img: string;
}