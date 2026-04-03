/**
 * Curated Unsplash URLs that depict eyeglasses / spectacles only (no unrelated lifestyle shots).
 * Used so listing and PDP imagery stay on-brand for optical frames.
 */
const UNSPLASH = (id: string) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`;

const SPECTACLE_POOL: string[] = [
    UNSPLASH("photo-1574258495973-f010dfbb5371"),
    UNSPLASH("photo-1577803645773-f96470509666"),
    UNSPLASH("photo-1508296695146-257a814070b4"),
    UNSPLASH("photo-1614715838608-dd527c46231d"),
    UNSPLASH("photo-1473496169904-658ba7c44d8a"),
    UNSPLASH("photo-1516714819001-8ee7a13b71d7"),
    UNSPLASH("photo-1590005354167-6da97870c757"),
    UNSPLASH("photo-1572635196237-14b3f281503f"),
    UNSPLASH("photo-1517948430535-1e2469d314fe"),
    UNSPLASH("photo-1511499767150-a48a237f0083"),
    UNSPLASH("photo-1509695507497-903c140c43b0"),
    UNSPLASH("photo-1523275335684-37898b6baf30"),
    UNSPLASH("photo-1505236858219-8359eb29e329"),
    UNSPLASH("photo-1529692236671-f1f6cf9683ba"),
    UNSPLASH("photo-1574180566232-aaad1b5b8450"),
    UNSPLASH("photo-1523394643039-a2770cf4a2a0"),
    UNSPLASH("photo-1584036553516-bf83210aa16c"),
    UNSPLASH("photo-1533738363-b7f9aef128ce"),
    UNSPLASH("photo-1611312449408-fcece27cdbb7"),
    UNSPLASH("photo-1598440947619-2c35fc9aa908"),
    UNSPLASH("photo-1605228853584-eacce38818b2"),
    UNSPLASH("photo-1560951500-3ae175e5ca6f"),
    UNSPLASH("photo-1481675392566-c9ab54082ba6"),
    UNSPLASH("photo-1612694790876-bec1383fbb40"),
    UNSPLASH("photo-1583244685026-d8519b5e3d21"),
    UNSPLASH("photo-1594897030264-ab7d87efc473"),
    UNSPLASH("photo-1576872381149-7847515ce5d8"),
    UNSPLASH("photo-1687092084146-a2893f0b896a"),
    UNSPLASH("photo-1714356590155-f896e15d21c9"),
    UNSPLASH("photo-1714356333088-45a9ba618365"),
    UNSPLASH("photo-1634795776422-5a85c8e0f1ce"),
    UNSPLASH("photo-1634794251656-9f286d822b05"),
    UNSPLASH("photo-1684854001420-6cfed609fdf2"),
    UNSPLASH("photo-1684853884851-00f0d8667f58"),
    UNSPLASH("photo-1551283279-166ab6d719af"),
    UNSPLASH("photo-1750390200293-92d5a788d3a2"),
    UNSPLASH("photo-1628619487942-01c58eed5c33"),
    UNSPLASH("photo-1585167404119-b1d79ddeb7fc"),
    UNSPLASH("photo-1552358155-515e264cb8b8"),
    UNSPLASH("photo-1621876857416-0d52e088f1bc"),
    UNSPLASH("photo-1621876857420-3b894514078b"),
    UNSPLASH("photo-1527556277184-aacbc5160fd5"),
    UNSPLASH("photo-1651218859577-97abc369d12f"),
    UNSPLASH("photo-1679614825241-f17e099d7b70"),
    UNSPLASH("photo-1645034648300-42c1d60a9305"),
    UNSPLASH("photo-1595152128156-ed2670305e8e"),
    UNSPLASH("photo-1645034648255-e07b825f6c5a"),
    UNSPLASH("photo-1721949490985-029647e5f30f"),
    UNSPLASH("photo-1645034648259-693953426fc6"),
    UNSPLASH("photo-1616443169174-aaeee814bfdf"),
    UNSPLASH("photo-1539112338149-c555be88b215"),
    UNSPLASH("photo-1578773729229-27dfee7474ce")
];

function hashToIndex(seed: string): number {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
        h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
    }
    return Math.abs(h) % SPECTACLE_POOL.length;
}

/** Stable spectacle-only image per product frame colour variant. */
export function getSpectacleImageUrl(productId: string, variantName: string): string {
    const key = `${productId}\0${variantName}`;
    return SPECTACLE_POOL[hashToIndex(key)];
}
