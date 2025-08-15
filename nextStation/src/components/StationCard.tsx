import { Badge, Card } from "react-bootstrap";
import type { CardMeta } from "../types";

export interface StationCardProps {
  card: CardMeta;
  showCategoryBadge?: boolean;
  onClick?: (card: CardMeta) => void;
}

export default function StationCard({
  card,
  showCategoryBadge = true,
  onClick,
}: StationCardProps) {
    const badgeVariant = card.category === "UNDERGROUND" ? "primary" : "success";

    return (
        <Card
        role={onClick ? "buton" : undefined}
        onClick={onClick ? () => onClick(card) : undefined}
        >
            <Card.Img
            variant="top"
            src={card.img}
            alt={card.category + " " + card.title}
            />
            <Card.Body>
                <Card.Text>{card.title}</Card.Text>
                {
                    showCategoryBadge && (
                        <Badge bg={badgeVariant}>{card.category}</Badge>
                    )
                }
            </Card.Body>
        </Card>
    )
}
