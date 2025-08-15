import station_cards from "../data/nextStationLondon/cards/station_cards.json"
import type { CardMeta } from "../types";

export function getStationCardById(id: number): CardMeta | undefined {
    return (station_cards as CardMeta[]).find(c => c.id === id);
}