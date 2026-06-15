export interface Creator {
  id: number;
  name: string;
  tier: 'VIP' | 'Dedicated';
  subscribers: string;
  rating: string;
  online: boolean;
  cover: string;
  avatar: string;
  bio: string;
  videos: number;
  photos: number;
  earnings: number;
}

export const creators: Creator[] = [
  { 
    id: 1, 
    name: "Bryson Tyler", 
    tier: "VIP", 
    subscribers: "124k", 
    rating: "4.98", 
    online: true, 
    cover: "https://picsum.photos/id/1015/1200/400", 
    avatar: "https://picsum.photos/id/64/300/300", 
    bio: "The original boyfriend experience.", 
    videos: 87, 
    photos: 1240, 
    earnings: 48920 
  },
  { 
    id: 2, 
    name: "Marcus King", 
    tier: "Dedicated", 
    subscribers: "89k", 
    rating: "4.95", 
    online: true, 
    cover: "https://picsum.photos/id/201/1200/400", 
    avatar: "https://picsum.photos/id/201/300/300", 
    bio: "Smooth and athletic.", 
    videos: 64, 
    photos: 890, 
    earnings: 31200 
  },
  { 
    id: 3, 
    name: "Tyrone Black", 
    tier: "VIP", 
    subscribers: "156k", 
    rating: "4.99", 
    online: false, 
    cover: "https://picsum.photos/id/29/1200/400", 
    avatar: "https://picsum.photos/id/29/300/300", 
    bio: "The ultimate alpha.", 
    videos: 112, 
    photos: 1560, 
    earnings: 67200 
  },
   { 
    id: 4, 
    name: "Angelina Jolie", 
    tier: "VIP", 
    subscribers: "34k", 
    rating: "4.67", 
    online: true, 
    cover: "https://picsum.photos/id/201/1200/400", 
    avatar: "https://picsum.photos/id/201/300/300", 
    bio: "Smooth and beautiful.", 
    videos: 64, 
    photos: 890, 
    earnings: 51200 
  },
];