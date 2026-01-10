export const playNotificationSound = () => {
  const audio = new Audio("/order-placed.mp3");
  audio.play().catch(() => {});
};
