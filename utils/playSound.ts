export const playPlaceOrderNotificationSound = () => {
  const audio = new Audio("/notification/order-placed.mp3");
  audio.play().catch(() => {});
};
