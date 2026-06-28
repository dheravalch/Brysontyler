export interface Creator {
  id: number;
  name: string;
  tier: "VIP" | "Dedicated";
  subscribers: string;
  rating: string;
  online: boolean;
  cover: string;
  avatar: string;
  bio: string;
  videos: number;
  photos: number;
  earnings: number;
  height: string;
}

export const creators: Creator[] = [
  {
    id: 1,
    name: "Bryson Tyler",
    tier: "VIP",
    subscribers: "124k",
    rating: "4.98",
    online: true,
    cover:
      "https://images.unsplash.com/photo-1624635440108-3509b974cf61?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://picsum.photos/id/64/300/300",
    bio: "The original boyfriend experience.",
    videos: 87,
    photos: 1240,
    earnings: 48920,
    height: "h-96",
  },
  {
    id: 2,
    name: "Marcus King",
    tier: "Dedicated",
    subscribers: "89k",
    rating: "4.95",
    online: true,
    cover:
      "https://images.unsplash.com/photo-1630567136459-7a8fa832c80e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://picsum.photos/id/201/300/300",
    bio: "Smooth and athletic.",
    videos: 64,
    photos: 890,
    earnings: 31200,
    height: "h-96",
  },
  {
    id: 3,
    name: "Tyrone Black",
    tier: "VIP",
    subscribers: "156k",
    rating: "4.99",
    online: false,
    cover:
      "https://images.unsplash.com/photo-1568663312422-34dbfdae72a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://picsum.photos/id/29/300/300",
    bio: "The ultimate alpha.",
    videos: 112,
    photos: 1560,
    earnings: 67200,
    height: "h-96",
  },
  {
    id: 4,
    name: "Angelina Jolie",
    tier: "VIP",
    subscribers: "34k",
    rating: "4.67",
    online: true,
    cover:
      "https://images.unsplash.com/photo-1631157899275-ae088292e34f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    avatar: "https://picsum.photos/id/201/300/300",
    bio: "Smooth and beautiful.",
    videos: 64,
    photos: 890,
    earnings: 51200,
    height: "h-96",
  },
];
