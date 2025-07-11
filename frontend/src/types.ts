export interface List {
  task_id: string;
  task: string;
  status: string;
}

export interface Letter {
  letter_id: string;
  letter_title: string;
  letter_content: string;
  recipient: string;
  sender: string;
  date_sent: string;
}

export interface Song {
  song_id: string | number;
  song_title: string;
  song_artist: string;
  song_duration: string;
  song_url: string;
  song_cover_art_url: string;
}

export interface Image {
  image_id: string | number;
  image_title: string;
  image_url: string;
}

export interface Dream {
  dream_id: string | number;
  dream_description: string;
  dream_status: boolean;
}
