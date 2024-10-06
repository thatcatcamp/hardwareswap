

export const prerender = true;

export function load({ cookies }) {
    console.log(cookies);
  const auctionId = cookies.get('auctionId') || '';
  console.log(auctionId);
  return { auctionId };
}
