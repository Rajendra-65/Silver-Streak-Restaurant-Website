export const playPlaceOrderNotificationSound = () => {
  const audio = new Audio("/order-placed.mp3");
  audio.play().catch(() => {});
};
