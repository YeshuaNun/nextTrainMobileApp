import type { CardMeta } from "./types";

export function createDeckEngine(cards: CardMeta[]) {
  const deck = cards.slice();
  const remaining = deck.slice();
  const drawn: CardMeta[] = [];
  let undergroundDrawn = 0;
  const specialTarget = deck.filter(c => c.category === 'UNDERGROUND').length;

  return {
    drawOne(): CardMeta | null {
      if (this.isFinished()) return null;
      const idx = Math.floor(Math.random() * remaining.length);
      const card = remaining.splice(idx, 1)[0];
      drawn.push(card);
      if (card.category === 'UNDERGROUND') undergroundDrawn++;
      return card;
    },
    isFinished(): boolean {
      return remaining.length === 0 || undergroundDrawn >= specialTarget;
    },
    reset(): void {
      remaining.splice(0, remaining.length, ...deck);
      drawn.splice(0, drawn.length);
      undergroundDrawn = 0;
    },
    getDrawn(): CardMeta[] { return drawn.slice(); },
    getRemainingCount(): number { return remaining.length; },
    getSpecialDrawn(): number { return undergroundDrawn; },
    getSpecialTarget(): number { return specialTarget; },
    getTotal(): number { return deck.length; }
  };
}